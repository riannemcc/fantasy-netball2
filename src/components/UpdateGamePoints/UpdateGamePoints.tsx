import { ReactElement, useState } from 'react';
import moment from 'moment';
import { Game } from '_src/types/games';
import { Player } from '_src/types/players';

interface UpdateGamePlayer extends Player {
  thisGamePoints: number;
  thisGoalsScored: number;
  thisGoalsMissed: number;
}

function parseToIntIfString(value: number | string): number {
  return typeof value === 'string' ? parseInt(value, 10) : value;
}

function convertGoalsScoredToPoints(goalsScored: number) {
  return goalsScored * 3;
}

function convertGoalsMissedToPoints(goalsMissed: number) {
  return goalsMissed * -2;
}

function getGameHeading(game) {
  return `[${moment(game.startDateTime).format('DD MMM HH:mm')}] \
${game.homeTeam} vs ${game.awayTeam}`;
}

interface TeamPlayerPointsInputProps {
  teamName: string;
  players: UpdateGamePlayer[];
  onChangePoints: (
    playerId: string,
    pointsKey: string,
    pointsValue: string
  ) => void;
}

function TeamPlayerPointsInput({
  teamName,
  players,
  onChangePoints,
}: TeamPlayerPointsInputProps): ReactElement {
  return (
    <div className="flex w-full flex-wrap flex-col items-center flex-1">
      <h1 className="font-sans font-bold text-lg text-black m-2">{teamName}</h1>
      {players
        .filter((player) => player.team === teamName)
        .map((player) => (
          <div className="font-sans text-lg text-black m-4" key={player._id}>
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
                    onChangePoints(
                      player._id,
                      'thisGoalsScored',
                      event.target.value
                    )
                  }
                />
                <p className="border-2 border-black text-sm w-full p-1">
                  Points:
                  {convertGoalsScoredToPoints(player.thisGoalsScored)}
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
                    onChangePoints(
                      player._id,
                      'thisGoalsMissed',
                      event.target.value
                    )
                  }
                />
                <p className="border-2 border-black text-sm w-full p-1">
                  Points:
                  {convertGoalsMissedToPoints(player.thisGoalsMissed)}
                </p>
              </div>
              <p className="border-2 border-black text-sm w-full p-1">
                Total points:
                {convertGoalsScoredToPoints(player.thisGoalsScored) +
                  convertGoalsMissedToPoints(player.thisGoalsMissed)}
              </p>
            </div>
          </div>
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
        points:
          convertGoalsScoredToPoints(player.thisGoalsScored) +
          convertGoalsMissedToPoints(player.thisGoalsMissed),
        goalsScored: player.thisGoalsScored,
        goalsMissed: player.thisGoalsMissed,
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
          const goalsScored = (playerGameRef && playerGameRef.goalsScored) || 0;
          const goalsMissed = (playerGameRef && playerGameRef.goalsMissed) || 0;
          const points = (playerGameRef && playerGameRef.points) || 0;
          return {
            ...player,
            thisGamePoints: parseToIntIfString(points),
            thisGoalsScored: parseToIntIfString(goalsScored),
            thisGoalsMissed: parseToIntIfString(goalsMissed),
          };
        }),
    });
  };

  const handleChangePoints = (
    playerId: string,
    pointsKey: string,
    pointsValue: string
  ) => {
    setSelected((state) => {
      return {
        ...state,
        players: state.players.map((player) => ({
          ...player,
          [pointsKey]:
            player._id === playerId
              ? parseInt(pointsValue, 10)
              : player[pointsKey],
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
              onChangePoints={handleChangePoints}
            />
            <TeamPlayerPointsInput
              teamName={selected.game.awayTeam}
              players={selected.players}
              onChangePoints={handleChangePoints}
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
