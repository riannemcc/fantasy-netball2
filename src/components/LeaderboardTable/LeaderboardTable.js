import { calculateUserPoints } from "../../../util/helpers";

export const LeaderboardTable = ({ users, players, tenRows }) => {
  const usersWithPointsSorted = users
    .filter((user) => user.teamPlayers && user.teamname)
    .map(user => ({
      ...user,
      points: calculateUserPoints(user, players),
    }))
    .sort((a, b) => b.points - a.points)

  const top10users = usersWithPointsSorted.slice(0, 10);

  return (
    <div className="w-full max-w-xl">
      <table className="bg-gray-100 shadow border w-full">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2"></th>
            <th className="border border-black px-4 py-2">Team</th>
            <th className="border border-black px-4 py-2">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {tenRows
            ? top10users.map((user, index) => (
              <tr>
                <td className="border border-black px-4 py-2">{index + 1}</td>
                <td className="border border-black px-4 py-2">
                  {user.teamname}
                </td>
                <td className="border border-black px-4 py-2">{user.points}</td>
              </tr>
            ))
            : usersWithPointsSorted.map((user, index) => (
              <tr>
                <td className="border border-black px-4 py-2">{index + 1}</td>
                <td className="border border-black px-4 py-2">
                  {user.teamname}
                </td>
                <td className="border border-black px-4 py-2">{user.points}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
