import React from "react";
import { connectToDatabase } from "../util/mongodb";

export default function TeamSelection({ players = [], users }) {
  const selectTeam = async () => {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "post",
      body: JSON.stringify(results),
    });
  };

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
      <div class="font-sans font-bold text-xl text-black text-center m-2">
        <h2> Select your Team</h2>
        <p>
          Select one player for each position and 3 subs (1 shooter, 1 centre
          court and 1 defender)
        </p>
      </div>
      <div>
        <form
          id="formy"
          class="flex flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.target);
            const shooters1 = data.get("GS");
            const shooters2 = data.get("GA");
            const centreCourt1 = data.get("WA");
            const centreCourt2 = data.get("C");
            const centreCourt3 = data.get("WD");
            const defenders1 = data.get("GD");
            const defenders2 = data.get("GK");
            const shooterSub = data.get("Sub 1");
            const centreCourtSub = data.get("Sub 2");
            const defenceSub = data.get("Sub 3");
            const teamName = data.get("teamname");

            const team = [
              shooters1,
              shooters2,
              centreCourt1,
              centreCourt2,
              centreCourt3,
              defenders1,
              defenders2,
              shooterSub,
              centreCourtSub,
              defenceSub,
            ];
            insertTeam(team, teamName);
          }}
        >
          <label
            for="teamname"
            class="font-sans font-bold text-xl text-black text-center m-2"
          >
            Team name:
          </label>
          <input
            type="text"
            id="teamname"
            name="teamname"
            label="Team name"
            class="border-2 border-black w-8/12 ml-2"
            required
          />
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
                    required
                  >
                    <option value="">--Please choose an option--</option>
                    {position === "GS" ||
                    position === "GA" ||
                    position === "Sub 1"
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
                            <option value={centerCourter}>
                              {centerCourter}
                            </option>
                          );
                        })
                      : null}
                    {position === "GD" ||
                    position === "GK" ||
                    position === "Sub 3"
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
            class="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full self-center"
          >
            Submit team
          </button>
        </form>
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

async function insertTeam(team, teamName) {
  console.log("team", team);
  console.log("teamName", teamName);
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ team, teamName }),
    });
    const json = await res.json();
    console.log("res: ", json);
  } catch (error) {
    console.error(error);
  }
}

//RULES
// You can only have 3 shooters on your team
// You can only have 4 centre court player son your team
// You can only have 3 defenders on your team
// You can only select one player as a captain
// You can only select one player as a vice captain, that cannot be the same person as the captain
// You can only choose a player once - should be disabled in all other dropdowns?

// formik - validation? Maybe no package or some other package though
