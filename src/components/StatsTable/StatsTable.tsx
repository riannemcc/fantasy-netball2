import { calculatePlayerPoints } from '_util/helpers';
import { ReactElement } from 'react';
import { Player } from '_src/types/players';

interface StatsTableProps {
  players: Player[];
}

export const StatsTable = ({ players }: StatsTableProps): ReactElement => {
  const teams = Array.from(
    new Set(
      players.filter((player) => player.team).map((player) => player.team)
    )
  );
  const playersWithPoints = players.map((player) => ({
    ...player,
    points: calculatePlayerPoints(player),
  }));

  return (
    <div>
      {teams.map((team, teamIndex) => {
        return (
          <div
            key={`stats-table-team-${team}-${teamIndex}`}
            className="items-center flex flex-col"
          >
            <h2 className="text-xl text-black font-bold mt-6 mb-2 ml-4">
              {team}
            </h2>
            <table className="table-auto ml-2 mr-2 w-auto shadow-lg bg-gray-100 ">
              <thead>
                <tr>
                  <th className="border border-black px-4 py-2">Player</th>
                  <th className="border border-black px-4 py-2">
                    Total Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {playersWithPoints
                  .filter((player) => player.team === team)
                  .map((player) => (
                    <tr key={`${team}-${player._id}`}>
                      <td className="border border-black px-4 py-2">
                        {player.name}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {player.points}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
