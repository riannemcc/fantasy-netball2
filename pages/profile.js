import { useSession, getSession } from "next-auth/client";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { connectToDatabase } from "../util/mongodb";
import { LeaderboardTable } from "../src/components/LeaderboardTable";
import { GameSchedule } from "../src/components/GameSchedule";
import { HighestScoring } from "../src/components/HighestScoring";
import { UserTeamTable } from "../src/components/UserTeamTable";

export default function Profile({ players, users, currentUser }) {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) return <p>Loading...</p>;
  return (
    <div className="self-center flex flex-col">
      {currentUser.team ? (
        <>
          <div className="m-4 flex flex-row">
            <span className="text-xl text-black font-bold ">Your Team</span>
            <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3 border-pink opacity-10" />
          </div>
          <div className="w-auto bg-pink shadow-xl m-6 p-4 flex flex-col">
            <h2 className="text-xl text-black font-bold m-2 self-center ">
              {currentUser.teamname && currentUser.teamname}
            </h2>
            <div className="m-2 self-center ">
              <UserTeamTable currentUser={currentUser} players={players} />
            </div>
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
        <div className="border-t-2 flex-1 mr-2 ml-2 leading-9 text-base font-semibold mt-3 border-pink opcity-10" />
        <h2 className="text-xl text-black font-bold ">Top 10 Fantasy Teams</h2>
      </div>
      <div className="w-auto bg-gray-300 m-6 p-4 flex flex-col">
        {currentUser.team ? (
          <LeaderboardTable users={users} players={players} tenRows />
        ) : null}
      </div>
      <div className="m-4 flex flex-row">
        <span className="text-xl text-black font-bold ">
          Highest Scoring Player
        </span>
        <div className="border-t-2 flex-1 ml-2 mr-2 leading-9 text-base font-semibold mt-3 border-pink opcity-10" />
      </div>
      <div className="text-xl text-black font-bold uppercase mt-8 mb-4 self-center flex flex-col">
        <HighestScoring players={players} />
      </div>
      <div className="m-4 flex flex-row">
        <div className="border-t-2 flex-1 ml-2 mr-2 leading-9 text-base font-semibold mt-3 border-pink opcity-10" />
        <span className="text-xl text-black font-bold ">Upcoming Games</span>
      </div>
      <div className="shadow-xl w-auto bg-gray-300 m-6 p-4 flex flex-col ">
        <GameSchedule />
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { db } = await connectToDatabase();
  const session = await getSession({ req });

  const currentUser = await db
    .collection("users")
    .findOne(ObjectId(session.userId));

  const users = await db
    .collection("users")
    .find({})
    .sort({})
    .limit(200)
    .toArray();

  const players = await db
    .collection("players")
    .find({})
    .sort({})
    .limit(200)
    .toArray();

  return {
    props: {
      currentUser: JSON.parse(JSON.stringify(currentUser)),
      users: JSON.parse(JSON.stringify(users)),
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
