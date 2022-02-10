import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Game } from '_src/types/games';

interface GameFixture extends Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  startDateTime: string;
}

export const AddGameFixtures = (): ReactElement => {
  const [homeTeam, setHomeTeam] = React.useState('');
  const [awayTeam, setAwayTeam] = React.useState('');
  const [startDateTime, setStartDateTime] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    try {
      const res = await updateGameFixture(homeTeam, awayTeam, startDateTime);
      if (res.status === 204) {
        alert('Fixture updated 🎉');
      } else {
        setIsSubmitting(false);
        throw new Error(`Response status: ${res.status}`);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      alert('Sorry, something went wrong');
    }
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
              htmlFor="homeTeam"
              className="font-sans font-bold text-xl text-black m-4"
            >
              Home Team:
            </label>
            <input
              type="text"
              id="homeTeam"
              name="homeTeam"
              className="border-2 border-black w-6/12 ml-4"
              required
              value={homeTeam}
              onChange={(event) => setHomeTeam(event.target.value)}
            />

            <label
              htmlFor="awayTeam"
              className="font-sans font-bold text-xl text-black m-4"
            >
              Away Team:
            </label>
            <input
              type="text"
              id="awayTeam"
              name="awayTeam"
              className="border-2 border-black w-6/12 ml-4"
              required
              value={awayTeam}
              onChange={(event) => setAwayTeam(event.target.value)}
            />

            <label
              htmlFor="startDateTime"
              className="font-sans font-bold text-xl text-black m-4"
            >
              Date:
            </label>
            <input
              type="text"
              id="startDateTime"
              name="startDateTime"
              className="border-2 border-black w-6/12 ml-4"
              required
              value={startDateTime}
              onChange={(event) => setStartDateTime(event.target.value)}
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

async function updateGameFixture(homeTeam, awayTeam, startDateTime) {
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
