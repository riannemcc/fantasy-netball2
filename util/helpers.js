import moment from 'moment';
import { DEFAULT_GAME_START_DATE, START_OF_SEASON_DATE } from './constants';

export function findPlayerById(playerId, players) {
  return players.find((player) => player._id === playerId);
}

export function calculatePlayerPoints(player, startDate, endDate) {
  let playerPoints = 0;
  startDate = startDate || START_OF_SEASON_DATE;
  endDate = endDate || moment().toISOString();
  if (player && player.games && player.games.length > 0) {
    playerPoints = player.games
      .filter((game) => {
        const gameStartDate = moment(
          game.startDateTime || DEFAULT_GAME_START_DATE
        );
        return (
          gameStartDate.isSameOrAfter(startDate) &&
          gameStartDate.isSameOrBefore(endDate)
        );
      })
      .reduce((playerPointsAcc, game) => {
        return playerPointsAcc + parseInt(game.points, 10);
      }, 0);
  }
  return playerPoints;
}

export function calculateUserPlayerPoints(user, player, dateAdded) {
  let playerPoints = calculatePlayerPoints(player, dateAdded);
  if (player._id === user.captain && playerPoints > 0) {
    playerPoints = playerPoints * 2;
  } else if (player._id === user.viceCaptain && playerPoints > 0) {
    playerPoints = playerPoints * 1.5;
  }
  return playerPoints;
}

export function calculateExPlayerPoints(
  player,
  dateAdded,
  dateRemoved,
  wasCaptain,
  wasViceCaptain
) {
  let playerPoints = calculatePlayerPoints(player, dateAdded, dateRemoved);
  if (wasCaptain && playerPoints > 0) {
    playerPoints = playerPoints * 2;
  } else if (wasViceCaptain && playerPoints > 0) {
    playerPoints = playerPoints * 1.5;
  }
  return playerPoints;
}

export function calculateUserPoints(user, players) {
  let userPoints = 0;
  if (user) {
    userPoints += (user.teamPlayers || []).reduce(
      (userPointsAcc, { playerId, dateAdded }) => {
        const player = findPlayerById(playerId, players);
        const playerPoints = calculateUserPlayerPoints(user, player, dateAdded);
        return userPointsAcc + playerPoints;
      },
      0
    );

    userPoints += (user.exPlayers || []).reduce(
      (
        userPointsAcc,
        { playerId, dateAdded, dateRemoved, wasCaptain, wasViceCaptain }
      ) => {
        const player = findPlayerById(playerId, players);
        const playerPoints = calculateExPlayerPoints(
          player,
          dateAdded,
          dateRemoved,
          wasCaptain,
          wasViceCaptain
        );
        return userPointsAcc + playerPoints;
      },
      0
    );

    if (user.lateEntry) {
      userPoints -= 20;
    }
  }
  return userPoints;
}
