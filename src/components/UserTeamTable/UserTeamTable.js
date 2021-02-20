import { POSITIONS } from "../../../util/constants";
import { calculateUserPlayerPoints, findPlayerById } from "../../../util/helpers";

export const UserTeamTable = ({ players, currentUser, className }) => {

  const findUserPlayerByPosition = (position) => {
    const teamPlayer = (currentUser.teamPlayers || []).find(player => player.position === position)
    if (teamPlayer) {
      return findPlayerById(teamPlayer.playerId, players);
    }
    return null
  }

  return (
    <div className={className}>

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
            return (
              <tr key={`user-team-table-${position}`}>
                <td class="border border-black px-4 py-2">{position}</td>
                <td className="border border-black px-4 py-2">
                  {player ? (<>
                    {player.name}
                    {player._id === currentUser.captain ? <span class="w-6 bg-pink text-white rounded p-1 m-2">C</span> : ''}
                    {player._id === currentUser.viceCaptain ? <span class="w-6 bg-pink text-white rounded p-1 m-2">VC</span> : ''}
                  </>) : ' - '}
                </td>
                <td className="border border-black px-4 py-2">
                  {player ? calculateUserPlayerPoints(currentUser, player) : ' - '}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};
