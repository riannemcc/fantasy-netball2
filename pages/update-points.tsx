import { ReactElement } from 'react';
import { useSession } from 'next-auth/react';
import { connectToDatabase } from '_util/mongodb';
import { UpdateGamePoints } from '_components/UpdateGamePoints';
import { useCurrentUser } from '_src/hooks/useCurrentUser';
import { Player } from '_src/types/players';
import { Game } from '_src/types/games';

interface UpdatePointsPageProps {
  games: Game[];
  players: Player[];
}

export default function UpdatePointsPage({
  games,
  players,
}: UpdatePointsPageProps): ReactElement {
  const { status } = useSession();
  const { currentUser } = useCurrentUser();

  if (status === 'loading') {
    return <div>...loading</div>;
  }

  if (currentUser && currentUser.isAdmin) {
    return <UpdateGamePoints games={games} players={players} />;
  }

  return <div>This page is not for you ⛔</div>;
}

export async function getServerSideProps(): Promise<{
  props: UpdatePointsPageProps;
}> {
  const { db } = await connectToDatabase();

  const games = await db
    .collection('games')
    .find({})
    .sort({})
    .limit(300)
    .toArray();

  const players = await db
    .collection('players')
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
