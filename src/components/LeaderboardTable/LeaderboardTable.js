export const LeaderboardTable = ({ users, players, tenRows }) => {
  let userPoints = 5;
  users.map((user) => {
    const team = user.team;
    Object.values(team).map((userPlayerId) => {
      players.map((player) => {
        userPlayerId === player._id ? player.points : null;
        userPoints = userPoints + player.points;
        return userPoints;
      });
    });
  });

  let userWk1Points = 6;
  users.map((user) => {
    const team = user.team;
    Object.values(team).map((userPlayer) => {
      players.map((player) => {
        userPlayer === player._id ? player.wk1points : null;
        userWk1Points = userWk1Points + player.wk1points;
        return userWk1Points;
      });
    });
  });

  function compare(a, b) {
    const userA = a.points;
    const userB = b.points;

    let comparison = 0;
    if (userA > userB) {
      comparison = 1;
    } else if (userAA < userB) {
      return comparison * -1;
    }
    return comparison;
  }

  const top10users = users.sort(compare).slice(0, 10);

  return (
    <div>
      <table class="table-auto ml-2">
        <thead>
          <tr>
            <th class="border px-4 py-2">Team</th>
            <th class="border px-4 py-2">Total Points</th>
            <th class="border px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        <tbody>
          {tenRows
            ? top10users.map((user) =>
                user.teamname ? (
                  <tr>
                    <td class="border px-4 py-2">{user.teamname}</td>
                    <td class="border px-4 py-2">{userPoints}</td>
                    <td class="border px-4 py-2">{userWk1Points}</td>
                  </tr>
                ) : null
              )
            : users.map((user) =>
                user.teamname ? (
                  <tr>
                    <td class="border px-4 py-2">{user.teamname}</td>
                    <td class="border px-4 py-2">{userPoints}</td>
                    <td class="border px-4 py-2">{userWk1Points}</td>
                  </tr>
                ) : null
              )}
        </tbody>
      </table>
    </div>
  );
};
