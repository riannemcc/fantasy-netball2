import { ReactElement } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export const SessionButton = (): ReactElement => {
  const { data: session } = useSession();

  return (
    <>
      {!session && (
        <>
          <button
            onClick={() =>
              signIn(undefined, {
                callbackUrl: `${window.location.origin}/profile`,
              })
            }
            className="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full w-32 m-2"
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          <button
            onClick={() =>
              signOut({ callbackUrl: `${window.location.origin}` })
            }
            className="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full w-32 m-2"
          >
            Sign out
          </button>
        </>
      )}
    </>
  );
};
