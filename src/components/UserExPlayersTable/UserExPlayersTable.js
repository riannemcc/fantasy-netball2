import { POSITIONS } from '../../../util/constants';
import { calculateExPlayerPoints, findPlayerById } from '../../../util/helpers';

export const UserExPlayersTable = ({ players, currentUser, className }) => {
  const findUserPlayerByPosition = (position) => {
    const exPlayer = (currentUser.exPlayers || []).find(
      (player) => player.position === position
    );
    if (exPlayer) {
      return findPlayerById(exPlayer.playerId, players);
    }
    return null;
  };

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
                  <tr key={''}>
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
