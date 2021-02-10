import React from "react";
import { connectToDatabase } from "../util/mongodb";
import Router from "next/router";

function checkForDuplicates(array) {
  return new Set(array).size !== array.length;
}

const positions = [
  { key: "GS", display: "GS" },
  { key: "GA", display: "GA" },
  { key: "WA", display: "WA" },
  { key: "C", display: "C" },
  { key: "WD", display: "WD" },
  { key: "GD", display: "GD" },
  { key: "GK", display: "GK" },
  { key: "sub1", display: "Sub 1" },
  { key: "sub2", display: "Sub 2" },
  { key: "sub3", display: "Sub 3" },
];

const initialTeamState = positions.reduce(
  (state, position) => ({
    ...state,
    [position.key]: "",
  }),
  {}
);

export default function TeamSelection({ players = [] }) {
  const [team, setTeam] = React.useState(initialTeamState);
  const [teamName, setTeamName] = React.useState("");
  const [captain, setCaptain] = React.useState("");
  const [viceCaptain, setViceCaptain] = React.useState("");

  const getPlayerById = React.useCallback(
    (playerId) => players.find((player) => player._id === playerId),
    [players]
  );

  const handleTeamPlayerSelect = React.useCallback(
    (positionKey, playerId) => {
      setTeam((currentTeam) => ({
        ...currentTeam,
        [positionKey]: playerId,
      }));
    },
    [setTeam]
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <div class="font-sans font-bold text-xl text-black text-center m-2">
        <h2> Select your Team</h2>
        <p>
          Select one player for each position and 3 subs (1 shooter, 1 centre
          court and 1 defender)
        </p>
      </div>
      <div className="bg-gray-300 m-2 pb-4 border-black border-2 w-11/12">
        <form
          id="formy"
          class="flex flex-col"
          onSubmit={async (event) => {
            event.preventDefault();
            const hasDuplicates = checkForDuplicates(Object.values(team));

            if (hasDuplicates) {
              alert("You may only use a player once");
              return;
            }

            try {
              if (!hasDuplicates) {
                await insertTeam(team, teamName, captain, viceCaptain);
                alert("Success");
                Router.push("/profile");
              }
            } catch (error) {
              console.error(error);
              alert("Error");
            }
          }}
        >
          <label
            htmlFor="teamname"
            class="font-sans font-bold text-xl text-black m-4"
          >
            Team name:
          </label>
          <input
            type="text"
            id="teamname"
            name="teamname"
            label="Team name"
            class="border-2 border-black w-6/12 ml-4"
            required
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
          />
          {positions.map(({ key, display }) => {
            return (
              <div
                key={`select-position-${key}`}
                className="w-auto m-6 flex-row"
              >
                <label
                  htmlFor={key}
                  class="font-sans font-bold text-xl text-black text-center w-2/12"
                >
                  {display}
                </label>
                <select
                  name={key}
                  id={key}
                  class="w-8/12 ml-6 border-2 border-black"
                  required
                  value={team[key] || ""}
                  onChange={(event) => {
                    handleTeamPlayerSelect(key, event.target.value);
                  }}
                >
                  <option value="">--Please choose an option--</option>
                  {players
                    .filter(
                      (player) =>
                        player.position &&
                        player.position.length &&
                        player.position.includes(key)
                    )
                    .map((player) => {
                      const showAlreadySelected =
                        Object.values(team).includes(player._id) &&
                        team[key] !== player._id;
                      return (
                        <option
                          key={`player-${player._id}`}
                          value={player._id}
                          disabled={showAlreadySelected}
                        >{`${player.team ? `[${player.team}]: ` : ""}${
                          player.name
                        }${
                          showAlreadySelected ? " (Already selected)" : ""
                        }`}</option>
                      );
                    })}
                </select>
              </div>
            );
          })}

          <label
            htmlFor="captain"
            class="font-sans font-bold text-xl text-black m-6"
          >
            Captain
          </label>
          <select
            name="captain"
            id="captain"
            className="w-8/12 ml-6 border-2 border-black"
            required
            value={captain}
            onChange={(event) => setCaptain(event.target.value)}
          >
            <option value="">--Please choose an option--</option>
            {Object.values(team).map((playerId) => {
              const player = getPlayerById(playerId);
              if (player && playerId !== viceCaptain) {
                return (
                  <option key={`captain-${playerId}`} value={playerId}>
                    {player.name}
                  </option>
                );
              }
              return null;
            })}
          </select>
          <label
            htmlFor="viceCaptain"
            className="font-sans font-bold text-xl text-black m-6"
          >
            Vice Captain
          </label>
          <select
            name="viceCaptain"
            id="viceCaptain"
            class="w-8/12 ml-6 mb-6 border-2 border-black"
            required
            value={viceCaptain}
            onChange={(event) => setViceCaptain(event.target.value)}
          >
            <option value="">--Please choose an option--</option>
            {Object.values(team).map((playerId) => {
              const player = getPlayerById(playerId);
              if (player && playerId !== captain) {
                return (
                  <option key={`vice-captain-${playerId}`} value={playerId}>
                    {player.name}
                  </option>
                );
              }
              return null;
            })}
          </select>

          <button
            type="submit"
            class="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full self-center"
          >
            Confirm team
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const players = await db
    .collection("players")
    .find({})
    .sort({ team: 1, name: 1 })
    .limit(200)
    .toArray();

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}

async function insertTeam(team, teamName, captain, viceCaptain) {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ team, teamName, captain, viceCaptain }),
    });
    const json = await res.json();
    console.log("res: ", json);
  } catch (error) {
    console.error(error);
  }
}

//RULES
// You can only have 3 shooters on your team
// You can only have 4 centre court players on your team
// You can only have 3 defenders on your team
// You can only select one player as a captain
// You can only select one player as a vice captain, that cannot be the same person as the captain
// You can only choose a player once - should be disabled in all other dropdowns?

// formik - validation? Maybe no package or some other package though
