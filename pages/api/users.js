import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  let users = await req.db.collection("users")
    .find({})
    .project({ captain: 1, viceCaptain: 1, teamPlayers: 1, teamname: 1 })
    .limit(400)
    .toArray();
  res.json(users);
});

export default handler;
