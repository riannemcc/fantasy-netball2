import { ReactElement, useState } from 'react';
import moment from 'moment';
import { Game } from '_src/types/games';
import { Player } from '_src/types/players';

interface UpdateGamePlayer extends Player {
  thisGamePoints: string;
  thisGoalsScored: string;
  thisGoalsMissed: string;
}

function getGameHeading(game) {
  return `[${moment(game.startDateTime).format('DD MMM HH:mm')}] ${
    game.homeTeam
  } vs ${game.awayTeam}`;
}

interface TeamPlayerPointsInputProps {
  teamName: string;
  players: UpdateGamePlayer[];
  onGoalsScoredChange: (playerId: string, goalsScored: string) => void;
  onGoalsMissedChange: (playerId: string, goalsMissed: string) => void;
}

function TeamPlayerPointsInput({
  teamName,
  players,
  onGoalsScoredChange,
  onGoalsMissedChange,
}: TeamPlayerPointsInputProps): ReactElement {
  return (
    <div className="flex w-full flex-wrap flex-col items-center flex-1">
      <h1 className="font-sans font-bold text-lg text-black m-2">{teamName}</h1>
      {players
        .filter((player) => player.team === teamName)
        .map((player) => (
          <label className="font-sans text-lg text-black m-4" key={player._id}>
            <div className="flex flex-row w-min">
              <p className="font-sans font-bold text-base text-black m-2">
                {player.name}
              </p>
              <div className="flex flex-col mr-2 mx-2 w-min">
                <p className="font-sans text-sm text-black m-2">Goals scored</p>
                <input
                  className="border-2 border-black text-sm w-full p-1"
                  type="number"
                  required
                  value={player.thisGoalsScored}
                  onChange={(event) =>
                    onGoalsScoredChange(player._id, event.target.value)
                  }
                />
                <p className="border-2 border-black text-sm w-full p-1">
                  Points:
                  {parseInt(player.thisGoalsScored) * 3}
                </p>
              </div>
              <div className="flex flex-col w-min">
                <p className="font-sans text-sm text-black m-2">Goals missed</p>
                <input
                  className="border-2 border-black text-sm w-full p-1"
                  type="number"
                  required
                  value={player.thisGoalsMissed}
                  onChange={(event) =>
                    onGoalsMissedChange(player._id, event.target.value)
                  }
                />
                <p className="border-2 border-black text-sm w-full p-1">
                  Points:
                  {parseInt(player.thisGoalsMissed) * -2}
                </p>
              </div>
              <p className="border-2 border-black text-sm w-full p-1">
                Total points:
                {parseInt(player.thisGoalsMissed) +
                  parseInt(player.thisGoalsScored)}
              </p>
            </div>
          </label>
        ))}
    </div>
  );
}

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
        goalsScored: parseInt(player.thisGoalsScored, 10) * 3,
        goalsMissed: parseInt(player.thisGoalsMissed, 10) * -2,
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
          const goalsScored =
            (playerGameRef && playerGameRef.goalsScored) || '0';
          const goalsMissed =
            (playerGameRef && playerGameRef.goalsMissed) || '0';
          const points =
            parseInt(goalsScored) * 3 + parseInt(goalsMissed) + -2 || 0;
          return {
            ...player,
            thisGamePoints: points,
            thisGoalsScored: parseInt(goalsScored) * 3,
            thisGoalsMissed: goalsMissed,
          };
        }),
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
    <form className="flex w-screen flex-col" onSubmit={handleSubmit}>
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
          <div className="flex flex-col w-screen justify-center">
            <TeamPlayerPointsInput
              teamName={selected.game.homeTeam}
              players={selected.players}
              onGoalsScoredChange={handleChangeGoalsScored}
              onGoalsMissedChange={handleChangeGoalsMissed}
            />
            <TeamPlayerPointsInput
              teamName={selected.game.awayTeam}
              players={selected.players}
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
