import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { POSITIONS, START_OF_SEASON_DATE } from '_util/constants';
import { findPlayerById } from '_util/helpers';
import { Player } from '_src/types/players';
import { CurrentUser } from '_src/types/users';

function checkForDuplicates(array) {
  return new Set(array).size !== array.length;
}

const MAX_TEAMMATES_ALLOWED = 2;

const initialTeamState = POSITIONS.reduce(
  (state, position) => ({
    ...state,
    [position]: '',
  }),
  {}
);

interface TeamSelectionProps {
  players: Player[];
  currentUser: CurrentUser;
  isInjuryUpdate?: boolean;
  isTransferWindow?: boolean;
}

export const TeamSelection = ({
  players = [],
  currentUser,
  isInjuryUpdate = false,
  isTransferWindow = true,
}: TeamSelectionProps): ReactElement => {
  const [existingTeam, setExistingTeam] = React.useState<
    Record<string, string>
  >(initialTeamState);
  const [team, setTeam] = React.useState<Record<string, string>>(
    initialTeamState
  );
  const [teamName, setTeamName] = React.useState('');
  const [captain, setCaptain] = React.useState('');
  const [captainName, setCaptainName] = React.useState('');
  const [viceCaptain, setViceCaptain] = React.useState('');
  const [viceCaptainName, setViceCaptainName] = React.useState('');
  const [selectedPlayersTeams, setSelectedPlayersTeams] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [shooterTransferred, setShooterTransferred] = React.useState(false);
  const [defenderTransferred, setDefenderTransferred] = React.useState(false);
  const [midTransferred, setMidTransferred] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (currentUser) {
      setTeamName(currentUser.teamname || '');
      setCaptain(currentUser.captain || '');
      setViceCaptain(currentUser.viceCaptain || '');
    }
    if ((currentUser.teamPlayers || []).length > 0) {
      setTeam((currentTeam) => {
        const userTeam = currentUser.teamPlayers.reduce(
          (acc, { playerId, position }) => ({
            ...acc,
            [position]: playerId,
          }),
          {}
        );
        setExistingTeam(userTeam);
        return {
          ...currentTeam,
          ...userTeam,
        };
      });
    }
  }, [
    setTeam,
    setTeamName,
    setCaptain,
    setViceCaptain,
    setExistingTeam,
    currentUser,
  ]);

  React.useEffect(() => {
    const selectedPlayerIds = Object.values(team);
    setSelectedPlayersTeams(
      players
        .filter(
          (player) => selectedPlayerIds.includes(player._id) && player.team
        )
        .map((player) => player.team)
    );
  }, [players, team]);

  React.useEffect(() => {
    const captainPlayer = findPlayerById(captain, players);
    if (captainPlayer) {
      setCaptainName(captainPlayer.name);
    }
  }, [captain, setCaptainName]);

  React.useEffect(() => {
    const viceCaptainPlayer = findPlayerById(viceCaptain, players);
    if (viceCaptainPlayer) {
      setViceCaptainName(viceCaptainPlayer.name);
    }
  }, [viceCaptain, setViceCaptainName]);

  React.useEffect(() => {
    setShooterTransferred(
      team['GS'] !== existingTeam['GS'] || team['GA'] !== existingTeam['GA']
    );
    setMidTransferred(
      team['WA'] !== existingTeam['WA'] ||
        team['C'] !== existingTeam['C'] ||
        team['WD'] !== existingTeam['WD']
    );
    setDefenderTransferred(
      team['GD'] !== existingTeam['GD'] || team['GK'] !== existingTeam['GK']
    );
  }, [team, existingTeam]);

  const handleTeamPlayerSelect = React.useCallback(
    (positionKey, playerId) => {
      setTeam((currentTeam) => {
        setCaptain((currentCaptain) => {
          if (currentTeam[positionKey] === currentCaptain) {
            return playerId;
          }
          return currentCaptain;
        });
        setViceCaptain((currentViceCaptain) => {
          if (currentTeam[positionKey] === currentViceCaptain) {
            return playerId;
          }
          return currentViceCaptain;
        });
        return {
          ...currentTeam,
          [positionKey]: playerId,
        };
      });
    },
    [setTeam, setCaptain, setViceCaptain]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const hasDuplicates = checkForDuplicates(Object.values(team));

    if (hasDuplicates) {
      alert('You may only use a player once');
      return;
    }

    const dateNow = moment().toISOString();
    const removedPlayers = [...(currentUser.exPlayers || [])];
    const teamPlayers = [];
    POSITIONS.forEach((position) => {
      const existingPlayer = (currentUser.teamPlayers || []).find(
        (player) => player.position === position
      );

      if (existingPlayer && existingPlayer.playerId === team[position]) {
        teamPlayers.push(existingPlayer);
      } else if (existingPlayer && existingPlayer.playerId !== team[position]) {
        teamPlayers.push({
          position,
          playerId: team[position],
          dateAdded: dateNow,
        });
        removedPlayers.push({
          ...existingPlayer,
          dateRemoved: dateNow,
          wasCaptain: currentUser.captain === existingPlayer.playerId,
          wasViceCaptain: currentUser.viceCaptain === existingPlayer.playerId,
        });
      } else if (team[position]) {
        teamPlayers.push({
          position,
          playerId: team[position],
          dateAdded: START_OF_SEASON_DATE,
        });
      }
    });

    setIsSubmitting(true);
    try {
      const res = await updateTeam(
        teamName,
        captain,
        viceCaptain,
        teamPlayers,
        removedPlayers
      );
      if (res.status === 204) {
        router.push('/profile');
      } else {
        setIsSubmitting(false);
        throw new Error(`Response status: ${res.status}`);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      alert('Error');
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="m-4 flex flex-row">
          <span className="text-xl text-black font-bold ">
            Select your team
          </span>
          <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-80" />
        </div>
        <ul className="ml-4 mb-2">
          {isTransferWindow ? (
            <>
              <li className="font-bold">Tranfer window is now open!</li>
              <li className="font-bold">
                You can change one player from each area of the court - shooter,
                mid and defence.
              </li>
              <li className="font-bold">
                {Number(!shooterTransferred) +
                  Number(!midTransferred) +
                  Number(!defenderTransferred)}
                /3 changes remaining
              </li>
            </>
          ) : null}
          <li>Select one player for each position.</li>
          <li>You may only select a player once.</li>
          <li>
            You may only select a maximum of two players from any one VNSL team.
          </li>
        </ul>
        <div className="bg-gray-200 m-2 pb-4 border-black border-2 w-auto">
          <form id="formy" className="flex flex-col" onSubmit={handleSubmit}>
            <label
              htmlFor="teamname"
              className="font-sans font-bold text-xl text-black m-4"
            >
              Team name:
            </label>
            {isInjuryUpdate || isTransferWindow ? (
              <input
                type="text"
                id="teamname"
                name="teamname"
                className="border-2 border-black w-6/12 ml-4"
                required
                readOnly
                value={teamName}
              />
            ) : (
              <input
                type="text"
                id="teamname"
                name="teamname"
                className="border-2 border-black w-6/12 ml-4"
                required
                value={teamName}
                onChange={(event) => setTeamName(event.target.value)}
              />
            )}
            {POSITIONS.map((key) => {
              if (isInjuryUpdate || isTransferWindow) {
                const teamPlayer = currentUser.teamPlayers.find(
                  ({ position }) => position === key
                );
                const player = findPlayerById(teamPlayer.playerId, players);
                const positionNotAvailableForTransfer =
                  !isTransferWindow ||
                  (team[key] === existingTeam[key] &&
                    ((['GS', 'GA'].includes(key) && shooterTransferred) ||
                      (['WA', 'C', 'WD'].includes(key) && midTransferred) ||
                      (['GD', 'GK'].includes(key) && defenderTransferred)));
                if (
                  player &&
                  !player.isInjured &&
                  positionNotAvailableForTransfer
                ) {
                  return (
                    <div
                      key={`select-position-${key}`}
                      className="w-auto m-6 flex flex-row items-center"
                    >
                      <label
                        htmlFor={key}
                        className="font-sans font-bold text-xl text-black text-center w-2/12"
                      >
                        {key}
                      </label>
                      <input
                        type="text"
                        name={key}
                        id={key}
                        className="w-8/12 ml-6 border-2 border-black"
                        required
                        readOnly
                        value={`${player.team ? `[${player.team}]: ` : ''}${
                          player.name
                        }`}
                      />
                    </div>
                  );
                }
              }

              return (
                <div
                  key={`select-position-${key}`}
                  className="w-auto m-6 flex flex-row items-center"
                >
                  <label
                    htmlFor={key}
                    className="font-sans font-bold text-xl text-black text-center w-2/12"
                  >
                    {key}
                  </label>
                  <select
                    name={key}
                    id={key}
                    className={`w-8/12 ml-6 border-2 ${
                      isInjuryUpdate ? 'border-pink' : 'border-black'
                    }`}
                    required
                    value={team[key] || ''}
                    onChange={(event) => {
                      handleTeamPlayerSelect(key, event.target.value);
                    }}
                  >
                    <option value="">--Please choose an option--</option>
                    {players
                      .filter(
                        (player) =>
                          (player.position &&
                            player.position.length &&
                            player.position.includes(key)) ||
                          player._id === existingTeam[key]
                      )
                      .map((player) => {
                        const isSelectedInAnotherPosition =
                          Object.values(team).includes(player._id) &&
                          team[key] !== player._id;

                        const isMaximumTeammatesSelected =
                          selectedPlayersTeams.filter(
                            (team) => player.team === team
                          ).length >= MAX_TEAMMATES_ALLOWED &&
                          team[key] !== player._id;

                        const isInjured = player.isInjured;

                        return (
                          <option
                            key={`player-${player._id}`}
                            value={player._id}
                            disabled={
                              isSelectedInAnotherPosition ||
                              isMaximumTeammatesSelected ||
                              isInjured ||
                              player._id === '60195c482bdff032e549977f'
                            }
                          >{`${player.team ? `[${player.team}]: ` : ''}${
                            player.name
                          }${
                            isInjured
                              ? ' (Injured)'
                              : isSelectedInAnotherPosition
                              ? ' (Already selected)'
                              : isMaximumTeammatesSelected
                              ? ` (Maximum ${MAX_TEAMMATES_ALLOWED} players from a team)`
                              : ''
                          }`}</option>
                        );
                      })}
                  </select>
                </div>
              );
            })}

            <label
              htmlFor="captain"
              className="font-sans font-bold text-xl text-black m-6"
            >
              Captain
            </label>
            {isInjuryUpdate && !isTransferWindow ? (
              <input
                type="text"
                name="captain"
                id="captain"
                className="w-8/12 ml-6 border-2 border-black"
                required
                readOnly
                value={captainName}
              />
            ) : (
              <select
                name="captain"
                id="captain"
                className="w-8/12 ml-6 border-2 border-black"
                required
                value={captain}
                onChange={(event) => setCaptain(event.target.value)}
              >
                <option value="">--Please choose an option--</option>
                {Object.values(team).map((playerId) => {
                  const player = findPlayerById(playerId, players);
                  if (player && playerId !== viceCaptain) {
                    return (
                      <option key={`captain-${playerId}`} value={playerId}>
                        {player.name}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            )}
            <label
              htmlFor="viceCaptain"
              className="font-sans font-bold text-xl text-black m-6"
            >
              Vice Captain
            </label>
            {isInjuryUpdate && !isTransferWindow ? (
              <input
                type="text"
                name="viceCaptain"
                id="viceCaptain"
                className="w-8/12 ml-6 mb-6 border-2 border-black"
                required
                readOnly
                value={viceCaptainName}
              />
            ) : (
              <select
                name="viceCaptain"
                id="viceCaptain"
                className="w-8/12 ml-6 mb-6 border-2 border-black"
                required
                value={viceCaptain}
                onChange={(event) => setViceCaptain(event.target.value)}
              >
                <option value="">--Please choose an option--</option>
                {Object.values(team).map((playerId) => {
                  const player = findPlayerById(playerId, players);
                  if (player && playerId !== captain) {
                    return (
                      <option key={`vice-captain-${playerId}`} value={playerId}>
                        {player.name}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full self-center"
            >
              {isSubmitting ? 'Updating...' : 'Confirm team'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

async function updateTeam(
  teamName,
  captain,
  viceCaptain,
  teamPlayers,
  exPlayers
) {
  return fetch('/api/user-team', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      teamName,
      captain,
      viceCaptain,
      teamPlayers,
      exPlayers,
    }),
  });
}
