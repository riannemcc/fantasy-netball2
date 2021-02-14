import React from "react";
import { connectToDatabase } from "../util/mongodb";
import { LeaderboardTable } from "../src/components/LeaderboardTable";
import { EMMNASponsor } from "../src/components/EMMNASponsor";

export default function Leaderboard({ users, players }) {
  const positions = [
    "GS",
    "GA",
    "WA",
    "C",
    "WD",
    "GD",
    "GK",
  ];

  const usersWithSameTeam = users.reduce((acc, user) => {
    const matchingTeam = users.find(userMatch => {
      if (user._id !== userMatch._id && user.team && userMatch.team) {
        return positions.every(position => {
          return user.team[position] === userMatch.team[position]
        })
      }
      return false
    })
    if (matchingTeam) {
      return [...acc, user]
    }
    return acc
  }, [])

  console.log('usersWithSameTeam: ', usersWithSameTeam)

  return (
    <>
      <div className="m-2 flex flex-row">
        <h1 class="text-xl text-black font-bold">Leaderboard</h1>
        <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-1 w-6/12" />
      </div>
      <div className="m-2 mx-auto max-w-2xl flex flex-col items-center" >
        <EMMNASponsor />
      </div>
      <div className="flex flex-col items-center m-4 overflow-x-scroll">
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
    .limit(400)
    .toArray();

  const players = await db
    .collection("players")
    .find({})
    .toArray();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
