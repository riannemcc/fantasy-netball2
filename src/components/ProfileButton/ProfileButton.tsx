import { useSession } from 'next-auth/react';
import { ReactElement } from 'react';
import Link from 'next/link';

export const ProfileButton = (): ReactElement => {
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <>
          <button
            onClick={() => null}
            className="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full w-32 m-2"
          >
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </button>
        </>
      )}
    </>
  );
};
