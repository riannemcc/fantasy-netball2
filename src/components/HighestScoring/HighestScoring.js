export const HighestScoring = ({players}) => {

  const defenders = players.filter(player => {
    if (player.position.includes("GD") || player.position.includes("GK")) {
      return player.name
    }
  })
  const defendersWithPointsSorted = defenders
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

  const shooters = players.filter(player => {
    if (player.position.includes("GA") || player.position.includes("GS")) {
      return player.name
    }
  })
  const shootersWithPointsSorted = shooters
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

  const mids = players.filter(player => {
    if (player.position.includes("WA") || player.position.includes("C") || player.position.includes("WD")) {
      return player.name
    }
  })
  const midsWithPointsSorted = mids
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


  const shooterName = shootersWithPointsSorted[0] && shootersWithPointsSorted[0].name
  const shooterPoints = shootersWithPointsSorted[0] && shootersWithPointsSorted[0].points
  const defendersName = defendersWithPointsSorted[0] && defendersWithPointsSorted[0].name
  const defendersPoints = defendersWithPointsSorted[0] && defendersWithPointsSorted[0].points
  const midsName = midsWithPointsSorted[0] && midsWithPointsSorted[0].name
  const midsPoints = midsWithPointsSorted[0] && midsWithPointsSorted[0].points

  return (
    <div className="flex flex-row flex-wrap justify-center">
      <div className=" m-2 bg-pink w-60 h-60 rounded-full border-solid border-black border-2 flex flex-col justify-center items-center opacity-80">
        <div className="text-center">
          <div>Shooter</div>
          <span className="text-xl text-base text-white font-bold m-2">
            {shooterName || ' - '}
          </span>
          <br />
          <span className="text-xl text-base text-white font-bold m-2 ">
            {shooterPoints || ' - '}
          </span>
        </div>
      </div>
      <div className="m-2 bg-gray-400 w-60 h-60 rounded-full border-solid border-black border-2 flex flex-col justify-center items-center opacity-80">
        <div className="text-center">
          <div>Defender</div>
          <span className="text-xl text-base text-white font-bold m-2">
            {defendersName || ' - '}
          </span>
          <br />
          <span className="text-xl text-base text-white font-bold m-2 ">
            {defendersPoints || ' - '}
          </span>
        </div>
      </div>
      <div className="m-2 bg-turquoise w-60 h-60 rounded-full border-solid border-black border-2 flex flex-col justify-center items-center opacity-80">
        <div className="text-center">
          <div>Middie</div>
          <span className="text-xl text-base text-white font-bold m-2">
            {midsName || ' - '}
          </span>
          <br />
          <span className="text-xl text-base text-white font-bold m-2 ">
            {midsPoints || ' - '}
          </span>
        </div>
      </div>
    </div>
  );
};
