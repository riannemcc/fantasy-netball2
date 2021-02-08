import React from "react";
import { connectToDatabase } from "../util/mongodb";

export default function Stats({ players }) {
  const teams = [
    "Celtic Dragons",
    "Leeds Rhinos",
    "London Pulse",
    "Loughborough Lightning",
    "Manchester Thunder",
    "Saracens Mavericks",
    "Severn Stars",
    "Strathclyde Sirens",
    "Surrey Storm",
    "Wasps",
    "Team Bath",
  ];
  return (
    <div>
      <h1 class="text-xl text-black font-bold uppercase m-2">
        VNSL players stats
      </h1>

      {teams.map((team) => {
        return (
          <>
            <h2 class="text-xl text-black font-bold mt-6 mb-2 ml-2">{team}</h2>
            <table class="table-auto ml-2">
              <thead>
                <tr>
                  <th class="border px-4 py-2">Player</th>
                  <th class="border px-4 py-2">Total Points</th>
                  <th class="border px-4 py-2">Week One Points</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) =>
                  player.team === team ? (
                    <tr>
                      <td class="border px-4 py-2">{player.name}</td>
                      <td class="border px-4 py-2">{player.points}</td>
                      <td class="border px-4 py-2">{player.wk1points}</td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const players = await db
    .collection("players")
    .find({})
    .sort({})
    .limit(200)
    .toArray();

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
