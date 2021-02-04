import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { connectToDatabase } from "../util/mongodb";

const UnauthenticatedComponent = dynamic(() =>
  import("../src/components/unathenticated")
);
const AuthenticatedComponent = dynamic(() =>
  import("../src/components/authenticated")
);

export default function Profile({ players, users }) {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) return <p>Loading...</p>;

  if (!session) return <UnauthenticatedComponent />;

  // use session.user to match users bd collection, and extract team name
  // object of all games with dates, if date has passed, do not show game
  return (
    <div>
      <AuthenticatedComponent user={session.user} />

      {/* <h2>{user.teamname && user.teamname}</h2> */}
      <Link href="/team-selection">
        <a class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center">
          Team Selection
        </a>
      </Link>
      <div>LEADERBOARD - TOP 10?</div>
      <div>UPCOMING GAMES?</div>
      <div>HIGHEST SCORING PLAYER</div>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

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
      users: JSON.parse(JSON.stringify(users)),
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
