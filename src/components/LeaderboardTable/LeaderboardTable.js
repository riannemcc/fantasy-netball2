export const LeaderboardTable = ({ users, players, tenRows }) => {
  //function which calculates user's points? pass in team, map over get each of their points, add to total
  //call it in table

  // let userPoints = 0;
  // usersWithTeams.map((user) => {
  //   const team = user.team;
  //   Object.values(team).map((userPlayerId) => {
  //     players.map((player) => {
  //       userPlayerId === player._id ? player.points : null;
  //       userPoints = userPoints + player.points;
  //       return userPoints;
  //     });
  //   });
  // });

  // let userWk1Points = 0;
  // usersWithTeams.map((user) => {
  //   const team = user.team;
  //   Object.values(team).map((userPlayer) => {
  //     players.map((player) => {
  //       userPlayer === player._id ? player.wk1points : null;
  //       userWk1Points = userWk1Points + player.wk1points;
  //       return userWk1Points;
  //     });
  //   });
  // });

  function compare(a, b) {
    const aPoints = a.points || 0;
    const bPoints = b.points || 0;
    return bPoints - aPoints;
  }

  const usersWithTeamsSorted = users
    .filter((user) => !!user.team)
    .sort(compare);

  const top10users = usersWithTeamsSorted.slice(0, 10);

  return (
    <div>
      <table className="m-2 bg-gray-100 shadow border">
        <thead>
          <tr>
            <th class="border border-black px-4 py-2"></th>
            <th class="border border-black px-4 py-2">Team</th>
            <th class="border border-black px-4 py-2">Total Points</th>
            <th class="border border-black px-4 py-2">Week One Points</th>
          </tr>
        </thead>
        <tbody>
          {tenRows
            ? top10users.map((user, index) => (
                <tr>
                  <td class="border border-black px-4 py-2">{index + 1}</td>
                  <td class="border border-black px-4 py-2">{user.teamname}</td>
                  <td class="border border-black px-4 py-2">{user.points}</td>
                  <td class="border border-black px-4 py-2">
                    {user.wk1points}
                  </td>
                </tr>
              ))
            : usersWithTeamsSorted.map((user, index) => (
                <tr>
                  <td class="border border-black px-4 py-2">{index + 1}</td>
                  <td class="border border-black px-4 py-2">{user.teamname}</td>
                  <td class="border border-black px-4 py-2">{user.points}</td>
                  <td class="border border-black px-4 py-2">
                    {user.wk1points}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
