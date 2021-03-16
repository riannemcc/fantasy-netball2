import { calculatePlayerPoints } from '_util/helpers';
import { ReactElement } from 'react';
import { Player } from '_src/types/players';
import moment from 'moment';

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
                  <th className="border border-black px-4 py-2">Game Four</th>
                  <th className="border border-black px-4 py-2">Game Five</th>
                  <th className="border border-black px-4 py-2">Game Six</th>
                  <th className="border border-black px-4 py-2">Game Seven</th>
                  <th className="border border-black px-4 py-2">Game Eight</th>
                </tr>
              </thead>
              <tbody>
                {playersWithPoints
                  .filter((player) => player.team === team)
                  .map((player) => {
                    const games =
                      player.games &&
                      player.games.sort((a, b) => {
                        if (moment(a.startDateTime).isBefore(b.startDateTime)) {
                          return -1;
                        }
                        if (moment(a.startDateTime).isAfter(b.startDateTime)) {
                          return 1;
                        }
                        return 0;
                      });
                    return (
                      <tr key={`${team}-${player._id}`}>
                        <td className="border border-black px-4 py-2">
                          {player.name}
                        </td>
                        <td className="border border-black px-4 py-2">
                          {player.points}
                        </td>
                        <td className="border border-black px-4 py-2">
                          {games && games[0] && games[0].points}
                        </td>
                        <td className="border border-black px-4 py-2">
                          {games && games[1] && games[1].points}
                        </td>
                        <td className="border border-black px-4 py-2">
                          {games && games[2] && games[2].points}
                        </td>
                        <td className="border border-black px-4 py-2">
                          {games && games[3] && games[3].points}
                        </td>
                        <td className="border border-black px-4 py-2">
                          {games && games[4] && games[4].points}
                        </td>
                        <td className="border border-black px-4 py-2">
                          {games && games[5] && games[5].points}
                        </td>
                        <td className="border border-black px-4 py-2">
                          {games && games[6] && games[6].points}
                        </td>
                        <td className="border border-black px-4 py-2">
                          {games && games[7] && games[7].points}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
