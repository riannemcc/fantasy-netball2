import React from "react";
import { connectToDatabase } from "../util/mongodb";
import { TeamSelection } from "../src/components/TeamSelection";
import { useCurrentUser } from "../src/hooks/useCurrentUser";
import { findPlayerById } from "../util/helpers";

export default function TeamSelectionPage({ players = [] }) {
  const { currentUser } = useCurrentUser()
  if (!currentUser) {
    return null
  }

  const hasInjuredPlayers = (currentUser.teamPlayers || []).some(({ playerId }) => {
    const player = findPlayerById(playerId, players)
    return player && player.isInjured
  })

  if (currentUser.teamPlayers && hasInjuredPlayers) {
    return (
      <TeamSelection players={players} currentUser={currentUser} isInjuryUpdate />
    )
  }

  if (currentUser.teamPlayers) {
    return (
      <div
        className="m-6 p-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        You have already selected your team and cannot amend until the
        mid-season swap window.
      </div>
    )
  }

  return (
    <TeamSelection players={players} currentUser={currentUser} />
    // <div className="m-6 p-2 bg-green-100 border border-green-400 text-black text-xl font-bold px-4 py-3 rounded relative">
    //   Team selection is now closed. Come back next year!
    // </div>
  )
}

export async function getServerSideProps({ req }) {
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
