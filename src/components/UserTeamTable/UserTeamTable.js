import { POSITIONS } from "../../../util/constants";
import { calculateUserPlayerPoints, findPlayerById } from "../../../util/helpers";
import Link from "next/link";

export const UserTeamTable = ({ players, currentUser, className }) => {

  const getDatePlayerAdded = (position) => {
    const teamPlayer = (currentUser.teamPlayers || []).find(player => player.position === position)
    if (teamPlayer) {
      return teamPlayer.dateAdded;
    }
    return null
  }

  const findUserPlayerByPosition = (position) => {
    const teamPlayer = (currentUser.teamPlayers || []).find(player => player.position === position)
    if (teamPlayer) {
      return findPlayerById(teamPlayer.playerId, players);
    }
    return null
  }

  const hasInjuredPlayers = (currentUser.teamPlayers || []).some(({ playerId }) => {
    const player = findPlayerById(playerId, players)
    return player && player.isInjured
  })

  return (
    <div>
      <table className="mb-8 shadow-lg bg-gray-100">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2">Position</th>
            <th className="border border-black px-4 py-2">Player</th>
            <th className="border border-black px-4 py-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {POSITIONS.map((position) => {
            const player = findUserPlayerByPosition(position)
            const datePlayerAdded = getDatePlayerAdded(position)
            return (
              <tr key={`user-team-table-${position}`}>
                <td class="border border-black px-4 py-2">{position}</td>
                <td className="border border-black px-4 py-2">
                  {player ? (<>
                    {player.name}
                    {player._id === currentUser.captain ? <span class="w-6 bg-pink text-white rounded p-1 m-2">C</span> : ''}
                    {player._id === currentUser.viceCaptain ? <span class="w-6 bg-pink text-white rounded p-1 m-2">VC</span> : ''}
                    {player.isInjured ? <span className="bg-red-500 ml-2 text-sm rounded text-white p-1">Injured</span> : ''}
                  </>) : ' - '}
                </td>
                <td className="border border-black px-4 py-2">
                  {player ? calculateUserPlayerPoints(currentUser, player, datePlayerAdded) : ' - '}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div >
  );
};
