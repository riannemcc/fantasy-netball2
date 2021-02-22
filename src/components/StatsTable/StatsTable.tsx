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
    <div className="w-full max-w-xl">
      {teams.map((team, teamIndex) => {
        return (
          <div key={`stats-table-team-${team}-${teamIndex}`}>
            <h2 className="text-xl text-black font-bold mt-6 mb-2 ml-4">
              {team}
            </h2>
            <table className="bg-gray-100 shadow border w-full">
              <thead>
                <tr>
                  <th className="border border-black px-4 py-2">Player</th>
                  <th className="border border-black px-4 py-2">
                    Total Points
                  </th>
                  <th className="border border-black px-4 py-2">Game One</th>
                  <th className="border border-black px-4 py-2">Game Two</th>
                  <th className="border border-black px-4 py-2">Game Three</th>
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
                      <td className="border border-black px-4 py-2">
                        {player.games && player.games[0].points}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {player.games &&
                          player.games[1] &&
                          player.games[1].points}
                      </td>
                      <td className="border border-black px-4 py-2">
                        {player.games &&
                          player.games[2] &&
                          player.games[2].points}
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
