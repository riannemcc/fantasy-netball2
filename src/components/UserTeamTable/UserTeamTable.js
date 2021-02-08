export const UserTeamTable = ({ players, currentUser }) => {
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
    "sub1",
    "sub2",
    "sub3",
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
    <div>
      <table className="ml-2">
        <thead>
          <tr>
            <th class="border px-4 py-2">Position</th>
            <th class="border px-4 py-2">Player</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) =>
            currentUser.team ? (
              <tr>
                <td class="border px-4 py-2">{position}</td>
                <td className="border px-4 py-2">
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
