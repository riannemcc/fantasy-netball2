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
      <h1>VNSL players stats</h1>
      <div>
        {teams.map((team) => {
          return (
            <h2 class="text-xl text-black font-bold uppercase tracking-wide">
              {team}
            </h2>
          );
        })}
      </div>
      <div>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="border px-4 py-2">Player</th>
              <th class="border px-4 py-2">Team</th>
              <th class="border px-4 py-2">Total Points</th>
              <th class="border px-4 py-2">Week One Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => {
              {
                players.map((player) =>
                  player.team === { team } ? (
                    <>
                      <td class="border px-4 py-2">{player.name}</td>
                      <td class="border px-4 py-2">{player.team}</td>
                      <td class="border px-4 py-2">POINTS</td>
                      <td class="border px-4 py-2">20</td>
                    </>
                  ) : null
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getStaticProps() {
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
