import { useSession, getSession } from "next-auth/client";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { connectToDatabase } from "../util/mongodb";
import { LeaderboardTable } from "../src/components/LeaderboardTable";
import { GameSchedule } from "../src/components/GameSchedule/GameSchedule";

export default function Profile({ players, users, currentUser }) {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl text-black font-bold uppercase m-2">
        {currentUser.teamname && currentUser.teamname}
      </h2>
      {currentUser.team ? null : (
        <Link href="/team-selection">
          <a class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center">
            Team Selection
          </a>
        </Link>
      )}
      <h2 className="text-xl text-black font-bold uppercase m-2">
        Top 10 Fantasy Teams
      </h2>
      <LeaderboardTable users={users} players={players} tenRows />
      <h2 className="text-xl text-black font-bold uppercase m-2">
        Upcoming Games
      </h2>
      <GameSchedule />
      <div>HIGHEST SCORING PLAYER</div>
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
    // players with highest score
    .sort({})
    .limit(5)
    .toArray();

  return {
    props: {
      currentUser: JSON.parse(JSON.stringify(currentUser)),
      users: JSON.parse(JSON.stringify(users)),
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
