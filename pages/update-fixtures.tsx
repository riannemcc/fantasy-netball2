import { ReactElement } from 'react';
import { useSession } from 'next-auth/client';
import { connectToDatabase } from '_util/mongodb';
import { UpdateGameFixtures } from '_components/UpdateGameFixtures';
import { Game } from '_src/types/games';
import { useCurrentUser } from '_src/hooks/useCurrentUser';

interface UpdateGamesProps {
  game: Game[];
}
export default function UpdateGames({ game }: UpdateGamesProps): ReactElement {
  const [, loading] = useSession();
  const { currentUser } = useCurrentUser();

  if (loading) {
    return <div>...loading</div>;
  }

  if (currentUser && currentUser.isAdmin) {
    return <UpdateGameFixtures game={game} />;
  }

  return <div>This page is not for you ⛔</div>;
}

export async function getServerSideProps(): Promise<{}> {
  const { db } = await connectToDatabase();

  const games = await db
    .collection('games')
    .find({})
    .sort({})
    .limit(300)
    .toArray();

  return {
    props: {
      game: JSON.parse(JSON.stringify(games)),
    },
  };
}
