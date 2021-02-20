import nextConnect from "next-connect";
import { getSession } from "next-auth/client";
import { ObjectId } from "mongodb";
import middleware from "../../middleware/database";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const session = await getSession({ req });
  if (session.userId) {
    const data = req.body;

    await req.db.collection("users").updateOne(
      { _id: ObjectId(session.userId) },
      {
        $set: {
          teamname: data.teamName,
          captain: data.captain,
          viceCaptain: data.viceCaptain,
          teamPlayers: data.teamPlayers,
          exPlayers: data.exPlayers
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
