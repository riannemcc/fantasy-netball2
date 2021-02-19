import { findPlayerById } from "../../../util/helpers";
import { calculatePlayerPoints } from "../../../util/helpers";

export const UserTeamTable = ({ players, currentUser, className }) => {

  const positions = [
    "GS",
    "GA",
    "WA",
    "C",
    "WD",
    "GD",
    "GK",
  ];

  const teamPlayers = Object.keys(currentUser.team).reduce(
    (output, position) => {
      output[position] = findPlayerById(currentUser.team[position], players);
      return output;
    },
    {}
  );


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
          {positions.map((position) =>
            currentUser.team ? (
              <tr>
                <td className="border border-black px-4 py-2">{position}</td>
                <td className="border border-black px-4 py-2">
                  {teamPlayers[position] ? (<>
                    {teamPlayers[position].name}
                    {teamPlayers[position]._id === currentUser.captain ? <span className="w-6 bg-pink text-white rounded p-1 m-2">C</span> : ''}
                    {teamPlayers[position]._id === currentUser.viceCaptain ? <span className="w-6 bg-pink text-white rounded p-1 m-2">VC</span> : ''}
                  </>) : ' - '}
                </td>
                <td className="border border-black px-4 py-2">
                  {teamPlayers[position] ?
                    calculatePlayerPoints(teamPlayers[position]) : ' - '}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};
