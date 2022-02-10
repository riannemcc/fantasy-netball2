import { ReactElement } from 'react';
import { useSession } from 'next-auth/react';
import { connectToDatabase } from '_util/mongodb';
import { AddGameFixtures } from '_components/AddGameFixtures';
import { Game } from '_src/types/games';
import { useCurrentUser } from '_src/hooks/useCurrentUser';

interface AddGamesProps {
  games: Game[];
}
export default function AddGames({ games }: AddGamesProps): ReactElement {
  const { status } = useSession();
  const { currentUser } = useCurrentUser();

  if (status === 'loading') {
    return <div>...loading</div>;
  }

  if (currentUser && currentUser.isAdmin) {
    return <AddGameFixtures games={games} />;
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
      games: JSON.parse(JSON.stringify(games)),
    },
  };
}
