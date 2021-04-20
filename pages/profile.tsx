import { ReactElement } from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { connectToDatabase } from '_util/mongodb';
import { LeaderboardTable } from '_components/LeaderboardTable';
import { GameSchedule } from '_components/GameSchedule';
import { HighestScoring } from '_components/HighestScoring';
import { UserTeamTable } from '_components/UserTeamTable';
import { calculateUserPoints } from '_util/helpers';
import { useCurrentUser } from '_src/hooks/useCurrentUser';
import { useUsers } from '_src/hooks/useUsers';
import { UserExPlayersTable } from '_components/UserExPlayersTable/UserExPlayersTable';
import { findPlayerById } from '_util/helpers';
import { Player } from '_src/types/players';
import Exclaim from '_public/exclaim.svg';

interface ProfileProps {
  players: Player[];
}

export default function Profile({ players }: ProfileProps): ReactElement {
  const [, loading] = useSession();
  const { currentUser } = useCurrentUser();
  const { users } = useUsers();

  if (loading || !currentUser || !users) {
    return <p>Loading...</p>;
  }

  const hasInjuredPlayers = (currentUser.teamPlayers || []).some(
    ({ playerId }) => {
      const player = findPlayerById(playerId, players);
      return player && player.isInjured;
    }
  );

  const allSelectedPlayers: {
    [key: string]: Player & { count: number };
  } = users
    .filter((user) => user.teamPlayers)
    .reduce((playersAcc, user) => {
      const userPlayers = user.teamPlayers.map(({ playerId }) =>
        findPlayerById(playerId, players)
      );
      return [...playersAcc, ...userPlayers];
    }, [])
    .reduce((playersMap, player) => {
      if (playersMap[player._id]) {
        playersMap[player._id].count = playersMap[player._id].count + 1;
        return playersMap;
      }
      return {
        ...playersMap,
        [player._id]: {
          ...player,
          count: 1,
        },
      };
    }, {});

  const allPlayersWithCountSorted = Object.values(allSelectedPlayers).sort(
    (a, b) => {
      return b.count - a.count;
    }
  );

  console.log('allPlayersWithCountSorted: ', allPlayersWithCountSorted);

  const included = users.filter((user) => {
    const teamTwo = user.teamPlayers && Object.values(user.teamPlayers);
    if (
      teamTwo &&
      teamTwo.some((e) => e.playerId === '6019595f2bdff032e549976a')
    ) {
      return user.teamname;
    }
  });

  return (
    <div className="m-2 self-center flex flex-col">
      {currentUser.teamPlayers ? (
        <>
          <div className="m-4 p-2 bg-blue-200 opacity-1 border border-blue-900 text-black text-lg font-bold px-4 py-3 rounded relative">
            <div className="flex">
              <Exclaim className="w-7 mr-2" />
              <span>
                The mid-season transfer window is open! Head to
                <Link href="/team-selection">
                  <a className="text-pink ml-1 mr-1">Team Selection</a>
                </Link>
                to select your players.
              </span>
            </div>
          </div>
          <div className="m-4 flex flex-row">
            <span className="text-xl text-black font-bold ">Your Team</span>
            <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-80" />
          </div>
          {hasInjuredPlayers ? (
            <div className="m-4 p-2 bg-red-100 opacity-1 border border-red-500 text-black text-sm font-bold px-4 py-3 rounded relative">
              <div className="flex">
                <Exclaim className="w-7 mr-2" />
                <span>
                  You have injured players, head to
                  <Link href="/team-selection">
                    <a className="text-turquoise ml-1 mr-1">Team Selection</a>
                  </Link>
                  to select a substitute.
                </span>
              </div>
            </div>
          ) : null}
          <div className="w-auto bg-gray-200 shadow mx-4 mb-6 px-4 flex flex-col items-center">
            <h2 className="text-xl text-pink font-bold m-2 self-center ">
              {currentUser.teamname && currentUser.teamname}
            </h2>
            <h2 className="text-xl text-pink font-bold m-2 self-center ">
              Your points: {calculateUserPoints(currentUser, players)}
            </h2>
            <UserTeamTable
              className="mb-4"
              currentUser={currentUser}
              players={players}
            />
            {currentUser.exPlayers ? (
              <>
                <span className="text-xl text-pink font-bold m-2">
                  Previous players
                </span>
                <UserExPlayersTable
                  className="-mb-4"
                  currentUser={currentUser}
                  players={players}
                />
              </>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <span className="text-xl text-black font-bold m-2">
            Don&apos;t have a team yet?
          </span>
          <button className="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full w-32 m-2">
            <Link href="/team-selection">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center w=6/12 self-center flex flex-col">
                Team Selection
              </a>
            </Link>
          </button>
        </>
      )}
      <div className="m-4 flex flex-row">
        <div className="border-t-2 flex-1 mr-2 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-80" />
        <h2 className="text-xl text-black font-bold ">Top 10 Fantasy Teams</h2>
      </div>

      <div className="w-auto bg-gray-200 shadow p-6 mx-4 mb-6 px-4 flex flex-col items-center">
        {currentUser.teamPlayers ? (
          <LeaderboardTable users={users} players={players} tenRows />
        ) : null}
      </div>

      <div className="m-4 flex flex-row">
        <span className="text-xl text-black font-bold ">
          Highest Scoring Players
        </span>
        <div className="border-t-2 flex-1 ml-2 mr-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-80" />
      </div>
      <div className="text-xl text-black font-bold uppercase mt-8 mb-4 self-center flex flex-col">
        <HighestScoring players={players} />
      </div>

      {/* <div className="m-4 flex flex-row">
        <div className="border-t-2 flex-1 ml-2 mr-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-80" />
        <span className="text-xl text-black font-bold ">Upcoming Games</span>
      </div> */}
      {/* <div className="w-auto bg-gray-300 m-10 p-4 flex flex-col">
        <GameSchedule />
      </div> */}
    </div>
  );
}

export async function getServerSideProps(): Promise<{ props: ProfileProps }> {
  const { db } = await connectToDatabase();

  const players = await db.collection('players').find({}).toArray();

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
