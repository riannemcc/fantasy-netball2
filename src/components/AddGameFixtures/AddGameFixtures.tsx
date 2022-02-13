import React, { ReactElement } from 'react';
import moment from 'moment';

interface AddGameFixturesProps {
  teams: string[];
}

export const AddGameFixtures = ({
  teams,
}: AddGameFixturesProps): ReactElement => {
  const [homeTeam, setHomeTeam] = React.useState('');
  const [awayTeam, setAwayTeam] = React.useState('');
  const [startDateTime, setStartDateTime] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const homeTeams = React.useMemo(() => {
    return teams.filter((team) => team !== awayTeam);
  }, [teams, awayTeam]);
  const awayTeams = React.useMemo(() => {
    return teams.filter((team) => team !== homeTeam);
  }, [teams, homeTeam]);

  const resetValues = React.useCallback(() => {
    setHomeTeam('');
    setAwayTeam('');
    setStartDateTime('');
  }, [setHomeTeam, setAwayTeam, setStartDateTime]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    try {
      const res = await addGameFixture(homeTeam, awayTeam, startDateTime);
      if (res.status === 201) {
        alert('Fixture added 🎉');
        resetValues();
      } else {
        throw new Error(`Response status: ${res.status}`);
      }
    } catch (error) {
      console.error(error);
      alert('Sorry, something went wrong');
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="m-4 flex flex-row">
          <span className="text-xl text-black font-bold ">
            Enter game fixture
          </span>
          <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-80" />
        </div>
        <div className="bg-gray-200 m-4 pb-4 border-black border-2 w-auto rounded relative">
          <form id="formy" className="flex flex-col" onSubmit={handleSubmit}>
            <label
              htmlFor="home-team-select"
              className="font-sans font-bold text-xl text-black m-4"
            >
              Home Team:
            </label>
            <select
              id="home-team-select"
              value={homeTeam}
              required
              onChange={(event) => setHomeTeam(event.target.value)}
            >
              <option value="">--Please choose an option--</option>
              {homeTeams.map((team, index) => (
                <option key={`home-option-${team}-${index}`} value={team}>
                  {team}
                </option>
              ))}
            </select>

            <label
              htmlFor="away-team-select"
              className="font-sans font-bold text-xl text-black m-4"
            >
              Away Team:
            </label>
            <select
              id="away-team-select"
              value={awayTeam}
              required
              onChange={(event) => setAwayTeam(event.target.value)}
            >
              <option value="">--Please choose an option--</option>
              {awayTeams.map((team, index) => (
                <option key={`away-option-${team}-${index}`} value={team}>
                  {team}
                </option>
              ))}
            </select>

            <label
              htmlFor="startDateTime"
              className="font-sans font-bold text-xl text-black m-4"
            >
              Date:
            </label>
            <input
              type="datetime-local"
              id="startDateTime"
              name="startDateTime"
              className="border-2 border-black w-6/12 ml-4"
              required
              value={moment(startDateTime).format('YYYY-MM-DDTHH:mm')}
              onChange={(event) =>
                setStartDateTime(moment(event.target.value).toISOString())
              }
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full self-center"
            >
              {isSubmitting ? 'Updating...' : 'Confirm game'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

async function addGameFixture(
  homeTeam: string,
  awayTeam: string,
  startDateTime: string
) {
  return fetch('/api/update-fixtures', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ homeTeam, awayTeam, startDateTime }),
  });
}
