import React from "react";
import {connectToDatabase} from "../util/mongodb";
import {StatsTable} from "../src/components/StatsTable";

export default function Stats({players}) {
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
      <StatsTable players={players} teams={teams} />
    </div>
  );
}
async function insertPoints(points) {
  try {
    const res = await fetch("/api/players", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({points}),
    });
    const json = await res.json();
    console.log("res: ", json);
  } catch (error) {
    console.error(error);
  }
}

export async function getServerSideProps() {
  const {db} = await connectToDatabase();

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
