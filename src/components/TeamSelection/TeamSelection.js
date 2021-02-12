import React from "react";
import Router from "next/router";

function checkForDuplicates ( array ) {
  return new Set( array ).size !== array.length;
}

const MAX_TEAMMATES_ALLOWED = 2;

const positions = [
  { key: "GS", display: "GS" },
  { key: "GA", display: "GA" },
  { key: "WA", display: "WA" },
  { key: "C", display: "C" },
  { key: "WD", display: "WD" },
  { key: "GD", display: "GD" },
  { key: "GK", display: "GK" },
];

const initialTeamState = positions.reduce(
  ( state, position ) => ( {
    ...state,
    [ position.key ]: "",
  } ),
  {}
);

export const TeamSelction = ( { players = [] } ) => {
  const [ team, setTeam ] = React.useState( initialTeamState );
  const [ teamName, setTeamName ] = React.useState( "" );
  const [ captain, setCaptain ] = React.useState( "" );
  const [ viceCaptain, setViceCaptain ] = React.useState( "" );
  const [ selectedPlayersTeams, setSelectedPlayersTeams ] = React.useState( [] );

  React.useEffect( () => {
    const selectedPlayerIds = Object.values( team );
    setSelectedPlayersTeams(
      players
        .filter(
          ( player ) => selectedPlayerIds.includes( player._id ) && player.team
        )
        .map( ( player ) => player.team )
    );
  }, [ players, team ] );

  const getPlayerById = React.useCallback(
    ( playerId ) => players.find( ( player ) => player._id === playerId ),
    [ players ]
  );

  const handleTeamPlayerSelect = React.useCallback(
    ( positionKey, playerId ) => {
      setTeam( ( currentTeam ) => ( {
        ...currentTeam,
        [ positionKey ]: playerId,
      } ) );
    },
    [ setTeam ]
  );
  return (
    <>
      <div className="flex flex-col">
        <div className="m-4 flex flex-row">
          <span className="text-xl text-black font-bold ">Select your team</span>
          <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-80" />
        </div>
        <ul className="ml-4 mb-2">
          <li>Select one player for each position</li>
          <li>You may only select a player once.</li>
          <li>You may only select a maximum of two players from any one VNSL team.</li>
        </ul>
        <div className="bg-gray-200 m-2 pb-4 border-black border-2 w-auto">
          <form
            id="formy"
            class="flex flex-col"
            onSubmit={ async ( event ) => {
              event.preventDefault();
              const hasDuplicates = checkForDuplicates( Object.values( team ) );

              if ( hasDuplicates ) {
                alert( "You may only use a player once" );
                return;
              }

              try {
                if ( !hasDuplicates ) {
                  await insertTeam( team, teamName, captain, viceCaptain );
                  alert( "Success" );
                  Router.push( "/profile" );
                }
              } catch ( error ) {
                console.error( error );
                alert( "Error" );
              }
            } }
          >
            <label
              htmlFor="teamname"
              class="font-sans font-bold text-xl text-black m-4"
            >
              Team name:
          </label>
            <input
              type="text"
              id="teamname"
              name="teamname"
              label="Team name"
              class="border-2 border-black w-6/12 ml-4"
              required
              value={ teamName }
              onChange={ ( event ) => setTeamName( event.target.value ) }
            />
            { positions.map( ( { key, display } ) => {
              return (
                <div
                  key={ `select-position-${ key }` }
                  className="w-auto m-6 flex flex-row items-center"
                >
                  <label
                    htmlFor={ key }
                    class="font-sans font-bold text-xl text-black text-center w-2/12"
                  >
                    { display }
                  </label>
                  <select
                    name={ key }
                    id={ key }
                    class="w-8/12 ml-6 border-2 border-black"
                    required
                    value={ team[ key ] || "" }
                    onChange={ ( event ) => {
                      handleTeamPlayerSelect( key, event.target.value );
                    } }
                  >
                    <option value="">--Please choose an option--</option>
                    { players
                      .filter(
                        ( player ) =>
                          player.position &&
                          player.position.length &&
                          player.position.includes( key )
                      )
                      .map( ( player ) => {
                        const isSelectedInAnotherPosition =
                          Object.values( team ).includes( player._id ) &&
                          team[ key ] !== player._id;

                        const isMaximumTeammatesSelected =
                          selectedPlayersTeams.filter(
                            ( team ) => player.team === team
                          ).length >= MAX_TEAMMATES_ALLOWED &&
                          team[ key ] !== player._id;

                        return (
                          <option
                            key={ `player-${ player._id }` }
                            value={ player._id }
                            disabled={
                              isSelectedInAnotherPosition ||
                              isMaximumTeammatesSelected ||
                              player._id === "60195c482bdff032e549977f"
                            }
                          >{ `${ player.team ? `[${ player.team }]: ` : "" }${ player.name
                            }${ isSelectedInAnotherPosition
                              ? " (Already selected)"
                              : isMaximumTeammatesSelected
                                ? ` (Maximum ${ MAX_TEAMMATES_ALLOWED } players from a team)`
                                : ""
                            }` }</option>
                        );
                      } ) }
                  </select>
                </div>
              );
            } ) }

            <label
              htmlFor="captain"
              class="font-sans font-bold text-xl text-black m-6"
            >
              Captain
          </label>
            <select
              name="captain"
              id="captain"
              className="w-8/12 ml-6 border-2 border-black"
              required
              value={ captain }
              onChange={ ( event ) => setCaptain( event.target.value ) }
            >
              <option value="">--Please choose an option--</option>
              { Object.values( team ).map( ( playerId ) => {
                const player = getPlayerById( playerId );
                if ( player && playerId !== viceCaptain ) {
                  return (
                    <option key={ `captain-${ playerId }` } value={ playerId }>
                      {player.name }
                    </option>
                  );
                }
                return null;
              } ) }
            </select>
            <label
              htmlFor="viceCaptain"
              className="font-sans font-bold text-xl text-black m-6"
            >
              Vice Captain
          </label>
            <select
              name="viceCaptain"
              id="viceCaptain"
              class="w-8/12 ml-6 mb-6 border-2 border-black"
              required
              value={ viceCaptain }
              onChange={ ( event ) => setViceCaptain( event.target.value ) }
            >
              <option value="">--Please choose an option--</option>
              { Object.values( team ).map( ( playerId ) => {
                const player = getPlayerById( playerId );
                if ( player && playerId !== captain ) {
                  return (
                    <option key={ `vice-captain-${ playerId }` } value={ playerId }>
                      {player.name }
                    </option>
                  );
                }
                return null;
              } ) }
            </select>

            <button
              type="submit"
              class="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full self-center"
            >
              Confirm team
          </button>
          </form>
        </div>
      </div>
    </>
  )
}

async function insertTeam ( team, teamName, captain, viceCaptain ) {
  try {
    const res = await fetch( "/api/users", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify( { team, teamName, captain, viceCaptain } ),
    } );
    const json = await res.json();
    console.log( "res: ", json );
  } catch ( error ) {
    console.error( error );
  }
}