import { ReactElement, useState } from 'react';
import moment from 'moment';
import { Game } from '_src/types/games';
import { Player } from '_src/types/players';

// add input for each category of scores for each player
// add function to calculate points for each score  based on value of activity
// thisGoalsScored + thisGoalsMissed = thisGamePoints (? not sure what this means)
// rturn additional points categories in handleChangePlayerPoints
// use calculated numbers to become total thisGamePoints for the game

interface UpdateGamePlayer extends Player {
  thisGamePoints: number | string;
  thisGoalsScored: number | string;
  thisGoalsMissed: number | string;
}

function getGameHeading(game) {
  return `[${moment(game.startDateTime).format('DD MMM HH:mm')}] ${
    game.homeTeam
  } vs ${game.awayTeam}`;
}

interface TeamPlayerPointsInputProps {
  teamName: string;
  players: UpdateGamePlayer[];
  onChange: (playerId: string, points: number | string) => void;
  onGoalsScoredChange: (playerId: string, goalsScored: number | string) => void;
  onGoalsMissedChange: (playerId: string, goalsMissed: number | string) => void;
}

function TeamPlayerPointsInput({
  teamName,
  players,
  onGoalsScoredChange,
  onGoalsMissedChange,
  onChange,
}: TeamPlayerPointsInputProps): ReactElement {
  return (
    <div className="flex w-full flex-wrap flex-col items-center flex-1">
      <h2>{teamName}</h2>
      {players
        .filter((player) => player.team === teamName)
        .map((player) => (
          <label
            className="font-sans font-bold text-xl text-black m-4"
            key={player._id}
          >
            {player.name}
            <p>Goals scored</p>
            <input
              className="border-2 border-black w-6/12 ml-4"
              type="number"
              required
              value={player.thisGoalsScored}
              onChange={(event) =>
                onGoalsScoredChange(player._id, event.target.value)
              }
            />
            <p>Goals missed</p>
            <input
              className="border-2 border-black w-6/12 ml-4"
              type="number"
              required
              value={player.thisGoalsMissed}
              onChange={(event) =>
                onGoalsMissedChange(player._id, event.target.value)
              }
            />
          </label>
        ))}
    </div>
  );
}

//function

// goals scored*  3
// golas missed * -2

// add  all of  these up?
// return number for thisGamePoints

async function updatePoints(game, players) {
  const playersGames = players.map((player) => {
    const otherGames =
      (player.games &&
        player.games.filter((playerGame) => game._id !== playerGame.gameId)) ||
      [];
    const allPlayerGames = [
      ...otherGames,
      {
        gameId: game._id,
        startDateTime: game.startDateTime,
        points: parseInt(player.thisGamePoints, 10),
        goalsScored: parseInt(player.thisGoalsScored, 10),
        goalsMissed: parseInt(player.thisGoalsMissed, 10),
      },
    ];

    return {
      id: player._id,
      games: allPlayerGames,
    };
  });

  return fetch('/api/update-points', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ playersGames }),
  });
}

interface UpdateGamePointsProps {
  games: Game[];
  players: Player[];
}

export function UpdateGamePoints({
  games,
  players,
}: UpdateGamePointsProps): ReactElement {
  const [selected, setSelected] = useState<{
    game: Game | null;
    players: UpdateGamePlayer[] | null;
  }>({
    game: null,
    players: null,
  });

  const handleSelectGame = (gameId) => {
    const selectedGame = games.find((game) => game._id === gameId);

    setSelected({
      game: selectedGame,
      players: players
        .filter(
          (player) =>
            player.team === selectedGame.homeTeam ||
            player.team === selectedGame.awayTeam
        )
        .map((player) => {
          const playerGameRef =
            player.games &&
            player.games.find((game) => game.gameId === selectedGame._id);
          const points = (playerGameRef && playerGameRef.points) || 0;
          const goalsScored = (playerGameRef && playerGameRef.goalsScored) || 0;
          const goalsMissed = (playerGameRef && playerGameRef.goalsMissed) || 0;
          return {
            ...player,
            thisGamePoints: points,
            thisGoalsScored: goalsScored,
            thisGoalsMissed: goalsMissed,
          };
        }),
    });
  };

  const handleChangePlayerPoints = (playerId, points) => {
    setSelected((state) => {
      return {
        ...state,
        players: state.players.map((player) => ({
          ...player,
          thisGamePoints:
            player._id === playerId ? points : player.thisGamePoints,
        })),
      };
    });
  };

  const handleChangeGoalsScored = (playerId, goalsScored) => {
    setSelected((state) => {
      return {
        ...state,
        players: state.players.map((player) => ({
          ...player,
          thisGoalsScored:
            player._id === playerId ? goalsScored : player.thisGoalsScored,
        })),
      };
    });
  };

  const handleChangeGoalsMissed = (playerId, goalsMissed) => {
    setSelected((state) => {
      return {
        ...state,
        players: state.players.map((player) => ({
          ...player,
          thisGoalsMissed:
            player._id === playerId ? goalsMissed : player.thisGoalsMissed,
        })),
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selected.game || !selected.players) {
      alert('Missing data');
      return;
    }

    try {
      const res = await updatePoints(selected.game, selected.players);
      if (res.status === 204) {
        alert('Points updated 🎉');
      } else {
        throw new Error(`Response status: ${res.status}`);
      }
    } catch (error) {
      console.error(error);
      alert('Sorry, something went wrong.');
    }
  };

  return (
    <form
      className="flex w-screen flex-col items-center"
      onSubmit={handleSubmit}
    >
      <label htmlFor="select-game">Select a game</label>
      <select
        id="select-game"
        className="w-8/12 ml-6 mb-6 border-2 border-black"
        onChange={(event) => {
          handleSelectGame(event.target.value);
        }}
      >
        <option value="">--- No game selected ---</option>
        {games.map((game) => (
          <option key={game._id} value={game._id}>
            {getGameHeading(game)}
          </option>
        ))}
      </select>
      {selected.game ? (
        <>
          <div className="flex w-screen justify-center">
            <TeamPlayerPointsInput
              teamName={selected.game.homeTeam}
              players={selected.players}
              onChange={handleChangePlayerPoints}
              onGoalsScoredChange={handleChangeGoalsScored}
              onGoalsMissedChange={handleChangeGoalsMissed}
            />
            <TeamPlayerPointsInput
              teamName={selected.game.awayTeam}
              players={selected.players}
              onChange={handleChangePlayerPoints}
              onGoalsScoredChange={handleChangeGoalsScored}
              onGoalsMissedChange={handleChangeGoalsMissed}
            />
          </div>
          <button
            className="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full self-center"
            type="submit"
          >
            Update points
          </button>
        </>
      ) : null}
    </form>
  );
}
