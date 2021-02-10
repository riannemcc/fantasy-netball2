import React from "react";
import { connectToDatabase } from "../util/mongodb";
import { LeaderboardTable } from "../src/components/LeaderboardTable";

export default function Leaderboard({ users, players }) {
  return (
    <>
      <div className="m-4 flex flex-row">
        <h1 class="text-xl text-black font-bold">Leaderboard</h1>
        <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-1" />
      </div>
      <div className="items-center flex flex-col">
        <LeaderboardTable users={users} players={players} tenRows={false} />
      </div>
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
