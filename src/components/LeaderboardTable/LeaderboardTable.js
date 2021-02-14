export const LeaderboardTable = ({users, players, tenRows, currentUser}) => {

  const usersWithTeams = users.filter((user) => {
    return user.team;
  });

  function compare(a, b) {
    const userA = a.points;
    const userB = b.points;

    let comparison = 0;
    if (userA > userB) {
      comparison = -1;
    } else if (userA < userB) {
      return comparison * 1;
    }
    return comparison;
  }

  const top10users = usersWithTeams.sort(compare).slice(0, 10);

  return (
    <div>
      <table className="m-4 bg-gray-100 shadow border">
        <thead>
          <tr>
            <th class="border border-black px-4 py-2"></th>
            <th class="border border-black px-4 py-2">Team</th>
            <th class="border border-black px-4 py-2">Total Points</th>
            <th class="border border-black px-4 py-2">Round 1 and 2</th>
            <th class="border border-black px-4 py-2">Round 3</th>
          </tr>
        </thead>
        <tbody>
          {tenRows
            ? top10users
              .filter((user) => !!user.teamname)
              .map((user, index) => (
                <tr>
                  <td class="border border-black px-4 py-2">{index + 1}</td>
                  <td class="border border-black px-4 py-2">
                    {user.teamname}
                  </td>
                  <td class="border border-black px-4 py-2">{user.points}</td>
                  <td class="border border-black px-4 py-2">
                    {user.round1and2pts && user.round1and2pts}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {user.round3pts && user.round3pts}
                  </td>
                </tr>
              ))
            : usersWithTeams
              .filter((user) => !!user.teamname)
              .map((user, index) => (
                <tr>
                  <td class="border border-black px-4 py-2">{index + 1}</td>
                  <td class="border border-black px-4 py-2">
                    {user.teamname}
                  </td>
                  <td class="border border-black px-4 py-2">{user.points}</td>
                  <td class="border border-black px-4 py-2">
                    {user.round1and2pts && user.round1and2pts}
                  </td>
                  <td class="border border-black px-4 py-2">
                    {user.round3pts && user.round3pts}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
