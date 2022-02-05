import { ReactElement, useState } from 'react';
import moment from 'moment';
import { Game } from '_src/types/games';
import { Player } from '_src/types/players';

interface UpdateGamePlayer extends Player {
  thisGamePoints: number;
  thisGoalsScored: number;
  thisGoalsMissed: number;
  thisPenalties: number;
  thisOffensiveRebounds: number;
  thisDefensiveRebounds: number;
  thisInterceptions: number;
  thisDeflections: number;
  thisTurnovers: number;
  thisUnforcedErrors: number;
  thisCautions: number;
  thisMVP: number;
}

function parseToIntIfString(value: number | string): number {
  return typeof value === 'string' ? parseInt(value, 10) : value;
}

function convertGoalsScoredToPoints(goalsScored: number) {
  return goalsScored * 3;
}

function convertGoalsMissedToPoints(goalsMissed: number) {
  return goalsMissed * -3;
}

function convertPenaltiesToPoints(penalties: number) {
  return penalties * -3;
}

function convertOffensiveReboundsToPoints(offensiveRebounds: number) {
  return offensiveRebounds * 3;
}

function convertDefensiveReboundsToPoints(defensiveRebounds: number) {
  return defensiveRebounds * 3;
}

function convertInterceptionsToPoints(interceptions: number) {
  return interceptions * 10;
}

function convertDeflectionsToPoints(deflections: number) {
  return deflections * 5;
}

function convertTurnoversToPoints(turnovers: number) {
  return turnovers * 8;
}

function convertUnforcedErrorsToPoints(unforcedErrors: number) {
  return unforcedErrors * -2;
}

function convertCautionsToPoints(cautions: number) {
  return cautions * -10;
}

function convertMVPToPoints(mvp: number) {
  return mvp * 20;
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
              <p className="font-sans font-bold text-base text-black m-4 w-20">
                {player.name}
              </p>
              <div className="flex flex-col w-min">
                <p className="font-sans text-sm text-black m-2 h-10">
                  Goals scored
                </p>
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
                <p className="font-sans text-sm text-black m-2 h-10">
                  Goals missed
                </p>
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
              <div className="flex flex-col w-min">
                <p className="font-sans text-sm text-black m-2 h-10">
                  Penalties
                </p>
                <input
                  className="border-2 border-black text-sm w-full p-1"
                  type="number"
                  required
                  value={player.thisPenalties}
                  onChange={(event) =>
                    onChangePoints(player._id, 'penalties', event.target.value)
                  }
                />
                <p className="border-2 border-black text-sm w-full p-1">
                  Points:
                  {convertPenaltiesToPoints(player.thisPenalties)}
                </p>
              </div>
              <div className="flex flex-col w-min">
                <p className="font-sans text-sm text-black m-2 h-10">
                  Offensive Rebounds
                </p>
                <input
                  className="border-2 border-black text-sm w-full p-1"
                  type="number"
                  required
                  value={player.thisOffensiveRebounds}
                  onChange={(event) =>
                    onChangePoints(
                      player._id,
                      'offensiveRebounds',
                      event.target.value
                    )
                  }
                />
                <p className="border-2 border-black text-sm w-full p-1">
                  Points:
                  {convertOffensiveReboundsToPoints(
                    player.thisOffensiveRebounds
                  )}
                </p>
              </div>
              <div className="flex flex-col w-min">
                <p className="font-sans text-sm text-black m-2 h-10">
                  Defensive Rebounds
                </p>
                <input
                  className="border-2 border-black text-sm w-full p-1"
                  type="number"
                  required
                  value={player.thisDefensiveRebounds}
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
                  {convertDefensiveReboundsToPoints(
                    player.thisDefensiveRebounds
                  )}
                </p>
              </div>
              <div className="flex flex-col w-min">
                <p className="font-sans text-sm text-black m-2 h-10">
                  Interceptions
                </p>
                <input
                  className="border-2 border-black text-sm w-full p-1"
                  type="number"
                  required
                  value={player.thisInterceptions}
                  onChange={(event) =>
                    onChangePoints(
                      player._id,
                      'interceptions',
                      event.target.value
                    )
                  }
                />
                <p className="border-2 border-black text-sm w-full p-1">
                  Points:
                  {convertInterceptionsToPoints(player.thisInterceptions)}
                </p>
              </div>
              <div className="flex flex-col w-min">
                <p className="font-sans text-sm text-black m-2 h-10">
                  Deflections
                </p>
                <input
                  className="border-2 border-black text-sm w-full p-1"
                  type="number"
                  required
                  value={player.thisDeflections}
                  onChange={(event) =>
                    onChangePoints(
                      player._id,
                      'deflections',
                      event.target.value
                    )
                  }
                />
                <p className="border-2 border-black text-sm w-full p-1">
                  Points:
                  {convertDeflectionsToPoints(player.thisDeflections)}
                </p>
              </div>
              <div className="flex flex-col w-min">
                <p className="font-sans text-sm text-black m-2 h-10">
                  Turnovers
                </p>
                <input
                  className="border-2 border-black text-sm w-full p-1"
                  type="number"
                  required
                  value={player.thisTurnovers}
                  onChange={(event) =>
                    onChangePoints(player._id, 'turnovers', event.target.value)
                  }
                />
                <p className="border-2 border-black text-sm w-full p-1">
                  Points:
                  {convertTurnoversToPoints(player.thisTurnovers)}
                </p>
              </div>
              <div className="flex flex-col w-min">
                <p className="font-sans text-sm text-black m-2 h-10">
                  UnforcedErrors
                </p>
                <input
                  className="border-2 border-black text-sm w-full p-1"
                  type="number"
                  required
                  value={player.thisUnforcedErrors}
                  onChange={(event) =>
                    onChangePoints(
                      player._id,
                      'thisUnforcedErrors',
                      event.target.value
                    )
                  }
                />
                <p className="border-2 border-black text-sm w-full p-1">
                  Points:
                  {convertUnforcedErrorsToPoints(player.thisUnforcedErrors)}
                </p>
              </div>
              <div className="flex flex-col w-min">
                <p className="font-sans text-sm text-black m-2 h-10">
                  Cautions
                </p>
                <input
                  className="border-2 border-black text-sm w-full p-1"
                  type="number"
                  required
                  value={player.thisCautions}
                  onChange={(event) =>
                    onChangePoints(
                      player._id,
                      'thisCautions',
                      event.target.value
                    )
                  }
                />
                <p className="border-2 border-black text-sm w-full p-1">
                  Points:
                  {convertCautionsToPoints(player.thisCautions)}
                </p>
              </div>
              <div className="flex flex-col w-min">
                <p className="font-sans text-sm text-black m-2 h-10">MVP</p>
                <input
                  className="border-2 border-black text-sm w-full p-1"
                  type="number"
                  required
                  value={player.thisMVP}
                  onChange={(event) =>
                    onChangePoints(player._id, 'thisMVP', event.target.value)
                  }
                />
                <p className="border-2 border-black text-sm w-full p-1">
                  Points:
                  {convertMVPToPoints(player.thisMVP)}
                </p>
              </div>
              <p className="border-2 border-black text-sm w-full p-1">
                Total points:
                {convertGoalsScoredToPoints(player.thisGoalsScored) +
                  convertGoalsMissedToPoints(player.thisGoalsMissed) +
                  convertPenaltiesToPoints(player.thisPenalties) +
                  convertOffensiveReboundsToPoints(
                    player.thisOffensiveRebounds
                  ) +
                  convertDefensiveReboundsToPoints(
                    player.thisDefensiveRebounds
                  ) +
                  convertInterceptionsToPoints(player.thisInterceptions) +
                  convertDeflectionsToPoints(player.thisDeflections) +
                  convertTurnoversToPoints(player.thisTurnovers) +
                  convertUnforcedErrorsToPoints(player.thisUnforcedErrors) +
                  convertCautionsToPoints(player.thisCautions) +
                  convertMVPToPoints(player.thisMVP)}
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
          convertGoalsMissedToPoints(player.thisGoalsMissed) +
          convertPenaltiesToPoints(player.thisPenalties) +
          convertOffensiveReboundsToPoints(player.thisOffensiveRebounds) +
          convertDefensiveReboundsToPoints(player.thisDefensiveRebounds) +
          convertInterceptionsToPoints(player.thisInterceptions) +
          convertDeflectionsToPoints(player.thisDeflections) +
          convertTurnoversToPoints(player.thisTurnovers) +
          convertUnforcedErrorsToPoints(player.thisUnforcedErrors) +
          convertCautionsToPoints(player.thisCautions) +
          convertMVPToPoints(player.thisMVP),
        goalsScored: player.thisGoalsScored,
        goalsMissed: player.thisGoalsMissed,
        penalties: player.thisPenalties,
        offensiveRebounds: player.thisOffensiveRebounds,
        defensiveRebounds: player.thisDefensiveRebounds,
        interceptionsToPoints: player.thisInterceptions,
        deflectionsToPoints: player.thisDeflections,
        turnoversToPoints: player.thisTurnovers,
        unforcedErrorsToPoints: player.thisUnforcedErrors,
        cautionsToPoints: player.thisCautions,
        mvp: player.thisMVP,
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
          const penalties = (playerGameRef && playerGameRef.penalties) || 0;
          const offensiveRebounds =
            (playerGameRef && playerGameRef.offensiveRebounds) || 0;
          const defensiveRebounds =
            (playerGameRef && playerGameRef.defensiveRebounds) || 0;
          const interceptionss =
            (playerGameRef && playerGameRef.interceptions) || 0;
          const deflections = (playerGameRef && playerGameRef.deflections) || 0;
          const turnovers = (playerGameRef && playerGameRef.turnovers) || 0;
          const unforcedErrors =
            (playerGameRef && playerGameRef.unforcedErrors) || 0;
          const cautions = (playerGameRef && playerGameRef.cautions) || 0;
          const mvp = (playerGameRef && playerGameRef.mvp) || 0;
          const points = (playerGameRef && playerGameRef.points) || 0;
          return {
            ...player,
            thisGamePoints: parseToIntIfString(points),
            thisGoalsScored: parseToIntIfString(goalsScored),
            thisGoalsMissed: parseToIntIfString(goalsMissed),
            thisPenalties: parseToIntIfString(penalties),
            thisOffensiveRebounds: parseToIntIfString(offensiveRebounds),
            thisDefensiveRebounds: parseToIntIfString(defensiveRebounds),
            thisInterceptions: parseToIntIfString(interceptionss),
            thisDeflections: parseToIntIfString(deflections),
            thisTurnovers: parseToIntIfString(turnovers),
            thisUnforcedErrors: parseToIntIfString(unforcedErrors),
            thisCautions: parseToIntIfString(cautions),
            thisMVP: parseToIntIfString(mvp),
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
