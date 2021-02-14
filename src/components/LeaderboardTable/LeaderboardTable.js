
export const LeaderboardTable = ({ users, players, tenRows }) => {
  const getPlayerById = (playerId) =>
    players.find((player) => player._id === playerId);

  const usersWithPointsSorted = users
    .filter((user) => user.team && user.teamname)
    .map(user => ({
      ...user,
      points: Object.values(user.team).reduce((userPointsAcc, playerId) => {
        const player = getPlayerById(playerId)
        if (player && player.games && player.games.length > 0) {
          let playerPoints = player.games.reduce((playerPointsAcc, game) => {
            return playerPointsAcc + parseInt(game.points, 10)
          }, 0)
          if (player._id === user.captain && playerPoints > 0) {
            playerPoints = playerPoints * 2
          } else if (player._id === user.viceCaptain && playerPoints > 0) {
            playerPoints = playerPoints * 1.5
          }
          return userPointsAcc + playerPoints
        }
        return userPointsAcc
      }, 0)
    }))
    .sort((a, b) => b.points - a.points)

  const top10users = usersWithPointsSorted.slice(0, 10);


  return (
    <div className="w-full max-w-xl">
      <table className="bg-gray-100 shadow border w-full">
        <thead>
          <tr>
            <th class="border border-black px-4 py-2"></th>
            <th class="border border-black px-4 py-2">Team</th>
            <th class="border border-black px-4 py-2">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {tenRows
            ? top10users.map((user, index) => (
              <tr>
                <td class="border border-black px-4 py-2">{index + 1}</td>
                <td class="border border-black px-4 py-2">
                  {user.teamname}
                </td>
                <td class="border border-black px-4 py-2">{user.points}</td>
              </tr>
            ))
            : usersWithPointsSorted.map((user, index) => (
              <tr>
                <td class="border border-black px-4 py-2">{index + 1}</td>
                <td class="border border-black px-4 py-2">
                  {user.teamname}
                </td>
                <td class="border border-black px-4 py-2">{user.points}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
