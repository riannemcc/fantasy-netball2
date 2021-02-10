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
      <div className="m-4 flex flex-row">
        <h1 className="text-xl text-black font-bold ">Player stats</h1>
        <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-1" />
      </div>

      {teams.map((team) => {
        return (
          <div className="items-center flex flex-col">
            <h2 class="text-xl text-black font-bold mt-6 mb-2 ml-4">{team}</h2>
            <table class="table-auto ml-2 mr-2 w-auto shadow-lg bg-gray-100 ">
              <thead>
                <tr>
                  <th class="border border-black px-4 py-2">Player</th>
                  <th class="border border-black px-4 py-2">Total Points</th>
                  <th class="border border-black px-4 py-2">Week One Points</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) =>
                  player.team === team ? (
                    <tr>
                      <td class="border border-black px-4 py-2">
                        {player.name}
                      </td>
                      <td class="border border-black px-4 py-2">
                        {player.points}
                      </td>
                      <td class="border border-black px-4 py-2">
                        {player.wk1points}
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
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
