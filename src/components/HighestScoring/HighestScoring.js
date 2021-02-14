export const HighestScoring = ({ players }) => {
  const playersWithPointsSorted = players
    .map(player => {
      let playerPoints = 0
      if (player.games && player.games.length > 0) {
        playerPoints = player.games.reduce((playerPointsAcc, game) => {
          return playerPointsAcc + parseInt(game.points, 10)
        }, 0)
      }
      return {
        ...player,
        points: playerPoints
      }
    })
    .sort((a, b) => b.points - a.points)

  const playerName = playersWithPointsSorted[0] && playersWithPointsSorted[0].name
  const playerPoints = playersWithPointsSorted[0] && playersWithPointsSorted[0].points

  return (
    <div className="bg-pink w-60 h-60 rounded-full border-solid border-black border-2 flex flex-col justify-center items-center opacity-80">
      <div className="text-center">
        <span className="text-xl text-base text-black font-bold m-2">
          {playerName || ' - '}
        </span>
        <br />
        <span className="text-xl text-base text-black font-bold m-2 ">
          {playerPoints || ' - '}
        </span>
      </div>
    </div>
  );
};
