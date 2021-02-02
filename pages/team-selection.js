import React, { useState, useEffect } from "react";

import { connectToDatabase } from "../util/mongodb";
import Image from "next/image";

// need to toggle dropdown up or down
export default function TeamSelection({ players = [] }) {
  const shooters = players.map((player) => {
    if (
      (player.position && player.position.includes("GS")) ||
      (player.position && player.position.includes("GA"))
    ) {
      return `${player.name} - ${player.team}`;
    } else {
      return null;
    }
  });

  const centreCourt = players.map((player) => {
    if (
      (player.position && player.position.includes("WA")) ||
      (player.position && player.position.includes("C")) ||
      (player.position && player.position.includes("WD"))
    ) {
      return `${player.name} - ${player.team}`;
    } else {
      return null;
    }
  });

  const defenders = players.map((player) => {
    if (
      (player.position && player.position.includes("GD")) ||
      (player.position && player.position.includes("GK"))
    ) {
      return `${player.name} - ${player.team}`;
    } else {
      return null;
    }
  });

  const positions = ["GS", "GA", "WA", "C", "WD", "GD", "GK"];

  return (
    <div>
      <div class="relative mb-6">
        <h2> Select your Team</h2>
        <p>
          Select one player for each position and 3 subs (1 shooter, 1 centre
          court and 1 defender)
        </p>
      </div>
      <div class="ml-28 mt-6 w-10/12">
        {positions.map((position) => {
          return (
            <div class="relative inline-block text-left ml-24 w-24">
              <div>
                <button
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  {position}
                  <svg
                    class="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div class="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  class="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {position === "GS" || position === "GA"
                    ? shooters.map((shooter) => {
                        return (
                          <a
                            href="#"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            {shooter}
                          </a>
                        );
                      })
                    : null}
                  {position === "WA" || position === "C" || position === "WD"
                    ? centreCourt.map((centerCourter) => {
                        return (
                          <a
                            href="#"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            {centerCourter}
                          </a>
                        );
                      })
                    : null}
                  {position === "GD" || position === "GK"
                    ? defenders.map((defender) => {
                        return (
                          <a
                            href="#"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            {defender}
                          </a>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button type="submit" className="teamSubmit">
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
