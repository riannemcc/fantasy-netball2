import React from "react";
import { connectToDatabase } from "../util/mongodb";

export default function Leaderboard({ users }) {
  const calculateUsersPoints = () => {};

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
                <td class="border px-4 py-2">{user.points}</td>
                <td class="border px-4 py-2">20</td>
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

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
