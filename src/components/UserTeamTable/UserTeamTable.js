export const UserTeamTable = ({players, currentUser, className}) => {

  const positions = [
    "GS",
    "GA",
    "WA",
    "C",
    "WD",
    "GD",
    "GK",
  ];

  const getPlayerById = (playerId) => players.find((player) => player._id === playerId)

  const teamPlayers = Object.keys(currentUser.team).reduce(
    (output, position) => {
      output[position] = getPlayerById(currentUser.team[position]);
      return output;
    },
    {}
  );

  console.log('currentUser: ', currentUser)

  return (
    <div className={className}>

      <table className="mb-8 shadow-lg bg-gray-100">
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
                  {teamPlayers[position] ? (<>
                    {teamPlayers[position].name}
                    {teamPlayers[position]._id === currentUser.captain ? <span class="w-6 bg-pink text-white rounded p-1 m-2">C</span> : ''}
                    {teamPlayers[position]._id === currentUser.viceCaptain ? <span class="w-6 bg-pink text-white rounded p-1 m-2">VC</span> : ''}
                  </>) : ' - '}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};
