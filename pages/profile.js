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
  console;

  if (typeof window !== "undefined" && loading) return <p>Loading...</p>;
  return (
    <div className="self-center flex flex-col">
      <div className="w-6/12 bg-pink m-6 p-4 flex flex-col">
        <h2 className="text-xl text-black font-bold uppercase m-2 self-center ">
          Your team: {currentUser.teamname && currentUser.teamname}
        </h2>
        <div className="m-2 self-center ">
          <UserTeamTable currentUser={currentUser} players={players} />
        </div>
      </div>
      {currentUser.team ? null : (
        <Link href="/team-selection">
          <a classNamee="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center w=6/12 self-center flex flex-col">
            Team Selection
          </a>
        </Link>
      )}
      <div className="w-6/12 bg-gray-300 m-6 p-4 flex flex-col">
        <h2 className="text-xl text-black font-bold uppercase mt-8 mb-4 self-center flex flex-col">
          Top 10 Fantasy Teams
        </h2>
        {currentUser.team ? (
          <LeaderboardTable users={users} players={players} tenRows />
        ) : null}
      </div>
      <div className="text-xl text-black font-bold uppercase mt-8 mb-4 self-center flex flex-col">
        <HighestScoring players={players} />
      </div>
      <div className="w-6/12 bg-pink m-6 p-4 flex flex-col ">
        <h2 className="text-xl text-black font-bold uppercase mt-8 mb-4 self-center flex flex-col">
          Upcoming Games
        </h2>
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
