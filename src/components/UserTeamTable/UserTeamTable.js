export const UserTeamTable = ({ players, currentUser, className }) => {
  //   const usersWithTeams = users.filter((user) => {
  //     return user.team;
  //   });

  const positions = [
    "GS",
    "GA",
    "WA",
    "C",
    "WD",
    "GD",
    "GK",
  ];

  const getPlayerById = (playerId) =>
    players.find((player) => player._id === playerId);

  const teamPlayers = Object.keys(currentUser.team).reduce(
    (output, position) => {
      output[position] = getPlayerById(currentUser.team[position]);
      return output;
    },
    {}
  );

  return (
    <div className={className}>
      <table className="m-2shadow-lg bg-gray-100">
        <thead>
          <tr>
            <th class="border border-black px-4 py-2">Position</th>
            <th class="border border-black px-4 py-2">Player</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) =>
            currentUser.team ? (
              <tr>
                <td class="border border-black px-4 py-2">{position}</td>
                <td className="border border-black px-4 py-2">
                  {(teamPlayers[position] && teamPlayers[position].name) ||
                    " - "}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};
