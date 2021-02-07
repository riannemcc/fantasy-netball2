import React from "react";
import { connectToDatabase } from "../util/mongodb";
import { LeaderboardTable } from "../src/components/LeaderboardTable";

export default function Leaderboard({ users, players }) {
  return (
    <>
      <h1 class="text-xl text-black font-bold uppercase m-2">
        Superleage Fantasy Netball Leaderboard
      </h1>
      <LeaderboardTable users={users} players={players} tenRows={false} />
    </>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const users = await db
    .collection("users")
    .find({})
    .sort({})
    .limit(200)
    .toArray();

  const players = await db
    .collection("players")
    .find({})
    .sort({})
    .limit(200)
    .toArray();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
