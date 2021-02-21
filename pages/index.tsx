import { useSession } from 'next-auth/client';
import { ReactElement } from 'react';
import { HomePage } from '_components/HomePage';

export default function Page(): ReactElement {
  const [, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  return <HomePage />;
}
