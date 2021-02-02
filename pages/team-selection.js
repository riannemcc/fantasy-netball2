import React, { useState, useEffect } from "react";

import { connectToDatabase } from "../util/mongodb";
import Image from "next/image";

// need to toggle dropdown up or down
export default function TeamSelection({ players = [] }) {
  const shooters = players
    .filter((player) => {
      return (
        (player.position && player.position.includes("GS")) ||
        (player.position && player.position.includes("GA"))
      );
    })
    .map((shooter) => {
      return `${shooter.name} - ${shooter.team}`;
    });

  const centreCourt = players
    .filter((player) => {
      return (
        (player.position && player.position.includes("WA")) ||
        (player.position && player.position.includes("C")) ||
        (player.position && player.position.includes("WD"))
      );
    })
    .map((cenntreCourt) => {
      return `${cenntreCourt.name} - ${cenntreCourt.team}`;
    });

  const defenders = players
    .filter((player) => {
      return (
        (player.position && player.position.includes("GD")) ||
        (player.position && player.position.includes("GK"))
      );
    })
    .map((defender) => {
      return `${defender.name} - ${defender.team}`;
    });

  const positions = [
    "GS",
    "GA",
    "WA",
    "C",
    "WD",
    "GD",
    "GK",
    "Sub 1",
    "Sub 2",
    "Sub 3",
  ];

  return (
    <div>
      <div class="font-sans font-bold text-xl text-black">
        <h2> Select your Team</h2>
        <p>
          Select one player for each position and 3 subs (1 shooter, 1 centre
          court and 1 defender)
        </p>
      </div>
      <div>
        {positions.map((position) => {
          return (
            <div class="w-80 m-6 flex-row">
              <label
                for={position}
                class="font-sans font-bold text-xl text-black text-center"
              >
                {position}
              </label>
              <select
                name={position}
                id={position}
                class="w-8/12 ml-6 border-2 border-black"
              >
                <option value="">--Please choose an option--</option>
                {position === "GS" || position === "GA" || position === "Sub 1"
                  ? shooters.map((shooter) => {
                      return <option value={shooter}>{shooter}</option>;
                    })
                  : null}
                {position === "WA" ||
                position === "C" ||
                position === "WD" ||
                position === "Sub 2"
                  ? centreCourt.map((centerCourter) => {
                      return (
                        <option value={centerCourter}>{centerCourter}</option>
                      );
                    })
                  : null}
                {position === "GD" || position === "GK" || position === "Sub 3"
                  ? defenders.map((defender) => {
                      return <option value={defender}>{defender}</option>;
                    })
                  : null}
              </select>
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        class="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Submit team
      </button>
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

//RULES
// You can only have 3 shooters on your team
// You can only have 4 centre court player son your team
// You can only have 3 defenders on your team
// You can only select one player as a captain
// You can only select one player as a vice captain, that cannot be the same person as the captain
