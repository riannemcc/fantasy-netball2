import { useSession } from 'next-auth/react';
import { ReactElement } from 'react';
import { HomePage } from '_components/HomePage';

export default function Page(): ReactElement {
  const { status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return <HomePage />;
}
