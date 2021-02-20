import { useSession } from "next-auth/client";
import { connectToDatabase } from "../util/mongodb";
import { UpdateGamePoints } from "../src/components/UpdateGamePoints";
import { useCurrentUser } from "../src/hooks/useCurrentUser";

export default function UpdatePointsPage({ games, players }) {
  const [, loading] = useSession()
  const { currentUser } = useCurrentUser()

  if (loading) {
    return <div>...loading</div>
  }

  if (currentUser && currentUser.isAdmin) {
    return <UpdateGamePoints games={games} players={players} />
  }

  return <div>This page is not for you ⛔</div>
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const games = await db
    .collection("games")
    .find({})
    .sort({})
    .limit(300)
    .toArray();

  const players = await db
    .collection("players")
    .find({})
    .sort({})
    .limit(200)
    .toArray();

  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
