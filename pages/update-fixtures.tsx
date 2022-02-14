import { ReactElement } from 'react';
import { useSession } from 'next-auth/react';
import { connectToDatabase } from '_util/mongodb';
import { AddGameFixtures } from '_components/AddGameFixtures';
import { Game } from '_src/types/games';
import { useCurrentUser } from '_src/hooks/useCurrentUser';

interface FixturesPageProps {
  games: Game[];
  teams: string[];
}

export default function FixturesPage({
  teams,
}: FixturesPageProps): ReactElement {
  const { status } = useSession();
  const { currentUser } = useCurrentUser();

  if (status === 'loading') {
    return <div>...loading</div>;
  }

  if (currentUser && currentUser.isAdmin) {
    return <AddGameFixtures teams={teams} />;
  }

  return <div>This page is not for you ⛔</div>;
}

export async function getServerSideProps(): Promise<{
  props: FixturesPageProps;
}> {
  const { db } = await connectToDatabase();

  const gamesPromise = db.collection('games').find({}).toArray();
  const teamsPromise = db.collection('players').distinct('team');

  const [games, teams] = await Promise.all([gamesPromise, teamsPromise]);

  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
      teams: JSON.parse(JSON.stringify(teams.sort())),
    },
  };
}
