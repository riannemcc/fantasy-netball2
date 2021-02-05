import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import middleware from "../../middleware/database";

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  let users = await req.db.collection("users").find({}).toArray();
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
    res.json({
      message: "ok",
    });
  } else {
    res.statusCode(401);
  }
});

export default handler;
