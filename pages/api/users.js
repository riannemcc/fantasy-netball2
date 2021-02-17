import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import middleware from "../../middleware/database";

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  let users = await req.db.collection("users")
    .find({})
    .project({ captain: 1, viceCaptain: 1, team: 1, teamname: 1 })
    .limit(400)
    .toArray();
  res.json(users);
});

handler.post(async (req, res) => {
  const session = await getSession({ req });
  if (session.user) {
    let data = req.body;
    await req.db.collection("users").updateOne(
      { email: session.user.email },
      {
        $set: {
          teamname: data.teamName,
          team: data.team,
          points: 0,
          captain: data.captain,
          viceCaptain: data.viceCaptain,
        },
      }
    );
    res.status(204).json({
      message: "ok",
    });
  } else {
    res.status(401).end(`Not allowed`);
  }
});

export default handler;
