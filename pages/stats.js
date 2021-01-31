import React from "react";
import { connectToDatabase } from "../util/mongodb";

export default function Stats({ players }) {
  return (
    <div>
      <h1>VNSL players stats</h1>
      <h2 class="text-xl text-black font-bold uppercase tracking-wide">
        Celtic Dragons
      </h2>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">Player</th>
            <th class="border px-4 py-2">Team</th>
            <th class="border px-4 py-2">Total Points</th>
            <th class="border px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        {players.map((player) =>
          player.team === "Celtic Dragons" ? (
            <tbody>
              <td class="border px-4 py-2">{player.name}</td>
              <td class="border px-4 py-2">{player.team}</td>
              <td class="border px-4 py-2">POINTS</td>
              <td class="border px-4 py-2">20</td>
            </tbody>
          ) : null
        )}
      </table>
      <h2 class="text-xl text-bla font-bold uppercase tracking-wide">
        Leeds Rhinos
      </h2>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">Player</th>
            <th class="border px-4 py-2">Team</th>
            <th class="border px-4 py-2">Total Points</th>
            <th class="border px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        {players.map((player) =>
          player.team === "Leeds Rhinos" ? (
            <tbody>
              <td class="border px-4 py-2">{player.name}</td>
              <td class="border px-4 py-2">{player.team}</td>
              <td class="border px-4 py-2">POINTS</td>
              <td class="border px-4 py-2">20</td>
            </tbody>
          ) : null
        )}
      </table>
      <h2 class="text-xl text-bla font-bold uppercase tracking-wide">
        London Pulse
      </h2>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">Player</th>
            <th class="border px-4 py-2">Team</th>
            <th class="border px-4 py-2">Total Points</th>
            <th class="border px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        {players.map((player) =>
          player.team === "London Pulse" ? (
            <tbody>
              <td class="border px-4 py-2">{player.name}</td>
              <td class="border px-4 py-2">{player.team}</td>
              <td class="border px-4 py-2">POINTS</td>
              <td class="border px-4 py-2">20</td>
            </tbody>
          ) : null
        )}
      </table>
      <h2 class="text-xl text-bla font-bold uppercase tracking-wide">
        Loughborough Lightning
      </h2>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">Player</th>
            <th class="border px-4 py-2">Team</th>
            <th class="border px-4 py-2">Total Points</th>
            <th class="border px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        {players.map((player) =>
          player.team === "Loughborough Lightning" ? (
            <tbody>
              <td class="border px-4 py-2">{player.name}</td>
              <td class="border px-4 py-2">{player.team}</td>
              <td class="border px-4 py-2">POINTS</td>
              <td class="border px-4 py-2">20</td>
            </tbody>
          ) : null
        )}
      </table>
      <h2 class="text-xl text-bla font-bold uppercase tracking-wide">
        Manchester Thunder
      </h2>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">Player</th>
            <th class="border px-4 py-2">Team</th>
            <th class="border px-4 py-2">Total Points</th>
            <th class="border px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        {players.map((player) =>
          player.team === "Manchester Thunder" ? (
            <tbody>
              <td class="border px-4 py-2">{player.name}</td>
              <td class="border px-4 py-2">{player.team}</td>
              <td class="border px-4 py-2">POINTS</td>
              <td class="border px-4 py-2">20</td>
            </tbody>
          ) : null
        )}
      </table>
      <h2 class="text-xl text-bla font-bold uppercase tracking-wide">
        Saracens Mavericks
      </h2>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">Player</th>
            <th class="border px-4 py-2">Team</th>
            <th class="border px-4 py-2">Total Points</th>
            <th class="border px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        {players.map((player) =>
          player.team === "Saracens Mavericks" ? (
            <tbody>
              <td class="border px-4 py-2">{player.name}</td>
              <td class="border px-4 py-2">{player.team}</td>
              <td class="border px-4 py-2">POINTS</td>
              <td class="border px-4 py-2">20</td>
            </tbody>
          ) : null
        )}
      </table>
      <h2 class="text-xl text-bla font-bold uppercase tracking-wide">
        Severn Stars
      </h2>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">Player</th>
            <th class="border px-4 py-2">Team</th>
            <th class="border px-4 py-2">Total Points</th>
            <th class="border px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        {players.map((player) =>
          player.team === "Severn Stars" ? (
            <tbody>
              <td class="border px-4 py-2">{player.name}</td>
              <td class="border px-4 py-2">{player.team}</td>
              <td class="border px-4 py-2">POINTS</td>
              <td class="border px-4 py-2">20</td>
            </tbody>
          ) : null
        )}
      </table>
      <h2 class="text-xl text-bla font-bold uppercase tracking-wide">
        Strathclyde Sirens
      </h2>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">Player</th>
            <th class="border px-4 py-2">Team</th>
            <th class="border px-4 py-2">Total Points</th>
            <th class="border px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        {players.map((player) =>
          player.team === "Strathclyde Sirens" ? (
            <tbody>
              <td class="border px-4 py-2">{player.name}</td>
              <td class="border px-4 py-2">{player.team}</td>
              <td class="border px-4 py-2">POINTS</td>
              <td class="border px-4 py-2">20</td>
            </tbody>
          ) : null
        )}
      </table>
      <h2 class="text-xl text-bla font-bold uppercase tracking-wide">
        Surrey Storm
      </h2>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">Player</th>
            <th class="border px-4 py-2">Team</th>
            <th class="border px-4 py-2">Total Points</th>
            <th class="border px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        {players.map((player) =>
          player.team === "Surrey Storm" ? (
            <tbody>
              <td class="border px-4 py-2">{player.name}</td>
              <td class="border px-4 py-2">{player.team}</td>
              <td class="border px-4 py-2">POINTS</td>
              <td class="border px-4 py-2">20</td>
            </tbody>
          ) : null
        )}
      </table>
      <h2 class="text-xl text-bla font-bold uppercase tracking-wide">
        Team Bath
      </h2>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="border px-4 py-2">Player</th>
            <th class="border px-4 py-2">Team</th>
            <th class="border px-4 py-2">Total Points</th>
            <th class="border px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        {players.map((player) =>
          player.team === "Team Bath" ? (
            <tbody>
              <td class="border px-4 py-2">{player.name}</td>
              <td class="border px-4 py-2">{player.team}</td>
              <td class="border px-4 py-2">POINTS</td>
              <td class="border px-4 py-2">20</td>
            </tbody>
          ) : null
        )}
      </table>
      <h2 class="text-xl text-bla font-bold uppercase tracking-wide">
        Wasps Netball
      </h2>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Player</th>
            <th class="px-4 py-2">Team</th>
            <th class="px-4 py-2">Total Points</th>
            <th class="px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        {players.map((player) =>
          player.team === "Wasps Netball" ? (
            <tbody>
              <td class="border px-4 py-2">{player.name}</td>
              <td class="border px-4 py-2">{player.team}</td>
              <td class="border px-4 py-2">POINTS</td>
              <td class="border px-4 py-2">20</td>
            </tbody>
          ) : null
        )}
      </table>
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
