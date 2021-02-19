import React from "react";
import {connectToDatabase} from "../util/mongodb";
import {TeamSelection} from "../src/components/TeamSelection";

export default function TeamSelectionPage({players = [], currentUser}) {
  return (
    <>
      {currentUser && currentUser.team ? (
        <div
          className="m-6 p-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          You have already selected your team and cannot amend until the
          mid-season swap window.
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              class="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      ) : (
          <TeamSelection players={players} />
          // <div className="m-6 p-2 bg-green-100 border border-green-400 text-black text-xl font-bold px-4 py-3 rounded relative">
          //   Team selection is now closed. Come back next year!
          // </div>
        )}
    </>
  );
}

export async function getServerSideProps({req}) {
  const {db} = await connectToDatabase();

  const players = await db
    .collection("players")
    .find({})
    .sort({team: 1, name: 1})
    .limit(200)
    .toArray();

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
