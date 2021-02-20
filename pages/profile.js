import { useSession } from "next-auth/client";
import Link from "next/link";
import { connectToDatabase } from "../util/mongodb";
import { LeaderboardTable } from "../src/components/LeaderboardTable";
import { GameSchedule } from "../src/components/GameSchedule";
import { HighestScoring } from "../src/components/HighestScoring";
import { UserTeamTable } from "../src/components/UserTeamTable";
import { calculateUserPoints } from "../util/helpers";
import { useCurrentUser } from "../src/hooks/useCurrentUser";
import { useUsers } from "../src/hooks/useUsers";

export default function Profile({ players }) {
  const [, loading] = useSession();
  const { currentUser } = useCurrentUser()
  const { users } = useUsers()

  if (typeof window !== "undefined" && loading) return <p>Loading...</p>;

  if (!currentUser || !users) {
    return null
  }

  return (
    <div className="m-2 self-center flex flex-col">
      {currentUser.teamPlayers ? (
        <>
          <div className="m-4 flex flex-row">
            <span className="text-xl text-black font-bold ">Your Team</span>
            <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-80" />
          </div>
          <div className="w-auto bg-pink shadow mx-4 mb-6 px-4 flex flex-col items-center">
            <h2 className="text-xl text-white font-bold m-2 self-center ">
              {currentUser.teamname && currentUser.teamname}
            </h2>
            <h2 className="text-xl text-white font-bold m-2 self-center ">Your points: {calculateUserPoints(currentUser, players)}</h2>
            <UserTeamTable
              className="-mb-4"
              currentUser={currentUser}
              players={players}
            />
          </div>
        </>
      ) : (
          <>
            <span className="text-xl text-black font-bold m-2">
              Don't have a team yet?
          </span>
            <button className="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full w-32 m-2">
              <Link href="/team-selection">
                <a classNamee="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center w=6/12 self-center flex flex-col">
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

      <div className="overflow-x-auto w-auto bg-gray-300 m-2 p-4 flex flex-col">
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

      <div className="m-4 flex flex-row">
        <div className="border-t-2 flex-1 ml-2 mr-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-80" />
        <span className="text-xl text-black font-bold ">Upcoming Games</span>
      </div>
      <div className="w-auto bg-gray-300 m-10 p-4 flex flex-col">
        <GameSchedule />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const players = await db
    .collection("players")
    .find({})
    .toArray();

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
