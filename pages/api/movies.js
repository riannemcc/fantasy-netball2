import { connectToDatabase } from "../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const players = await db
    .collection("players")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  res.json(players);
};