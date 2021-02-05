import React from "react";
import { connectToDatabase } from "../util/mongodb";

export default function Leaderboard({ users, players }) {
  let userPoints = 5;
  users.map((user) => {
    user.team.map((userPlayerId) => {
      players.map((player) => {
        userPlayerId === player._id ? player.points : null;
        userPoints = userPoints + player.points;
        return userPoints;
      });
    });
  });

  let userWk1Points = 6;
  users.map((user) => {
    user.team.map((userPlayer) => {
      players.map((player) => {
        userPlayer === player.name ? player.wk1points : null;
        console.log("player", player);
        userWk1Points = userWk1Points + player.wk1points;
        console.log("wk1points", player.wk1points);
        return userWk1Points;
      });
    });
  });

  console.log("first", userPoints);
  console.log("second", userWk1Points);
  return (
    <div>
      <h1 class="text-xl text-black font-bold uppercase m-2">
        Superleage Fantasy Netball Leaderboard
      </h1>
      <table class="table-auto ml-2">
        <thead>
          <tr>
            <th class="border px-4 py-2">Team</th>
            <th class="border px-4 py-2">Total Points</th>
            <th class="border px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            user.teamname ? (
              <tr>
                <td class="border px-4 py-2">{user.teamname}</td>
                <td class="border px-4 py-2">{userPoints}</td>
                <td class="border px-4 py-2">{userWk1Points}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
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
