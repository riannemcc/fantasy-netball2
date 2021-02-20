export function findPlayerById(playerId, players) {
  return players.find((player) => player._id === playerId);
}

export function calculatePlayerPoints(player) {
  let playerPoints = 0
  if (player && player.games && player.games.length > 0) {
    playerPoints = player.games.reduce((playerPointsAcc, game) => {
      return playerPointsAcc + parseInt(game.points, 10)
    }, 0)
  }
  return playerPoints
}

export function calculateUserPlayerPoints(user, player) {
  let playerPoints = calculatePlayerPoints(player)
  if (player._id === user.captain && playerPoints > 0) {
    playerPoints = playerPoints * 2
  } else if (player._id === user.viceCaptain && playerPoints > 0) {
    playerPoints = playerPoints * 1.5
  }
  return playerPoints
}

export function calculateUserPoints(user, players) {
  let userPoints = 0
  if (user && user.teamPlayers && user.teamPlayers.length > 0) {
    userPoints = user.teamPlayers.reduce((userPointsAcc, { playerId }) => {
      const player = findPlayerById(playerId, players)
      const playerPoints = calculateUserPlayerPoints(user, player)
      return userPointsAcc + playerPoints
    }, 0)

    if (user.lateEntry) {
      userPoints - 20
    }
  }
  return userPoints
}
