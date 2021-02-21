import { ReactElement } from 'react';
import { Player } from '_src/types/players';
import { CurrentUser } from '_src/types/users';
import { calculateExPlayerPoints, findPlayerById } from '_util/helpers';

interface UserExPlayersTableProps {
  players: Player[];
  currentUser: CurrentUser;
  className?: string;
}

export const UserExPlayersTable = ({
  players,
  currentUser,
  className,
}: UserExPlayersTableProps): ReactElement => {
  return (
    <div className={className}>
      <table className="mb-8 shadow-lg bg-gray-100">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2">Player</th>
            <th className="border border-black px-4 py-2">Points</th>
          </tr>
        </thead>
        <tbody>
          {currentUser.exPlayers &&
            currentUser.exPlayers.map(
              ({
                playerId,
                dateAdded,
                dateRemoved,
                wasCaptain,
                wasViceCaptain,
              }) => {
                const player = findPlayerById(playerId, players);
                return (
                  <tr key={`user-ex-player-tabel-row-${playerId}`}>
                    <td className="border border-black px-4 py-2">
                      {player && player.name}
                      {wasCaptain ? (
                        <span className="w-6 bg-pink text-white rounded p-1 m-2">
                          C
                        </span>
                      ) : (
                        ''
                      )}
                      {wasViceCaptain ? (
                        <span className="w-6 bg-pink text-white rounded p-1 m-2">
                          VC
                        </span>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="border border-black px-4 py-2">
                      {player
                        ? calculateExPlayerPoints(
                            player,
                            dateAdded,
                            dateRemoved,
                            wasCaptain,
                            wasViceCaptain
                          )
                        : ' - '}
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
    </div>
  );
};
