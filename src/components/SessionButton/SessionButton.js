import { signIn, signOut, useSession } from 'next-auth/client';

export const SessionButton = () => {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          <button
            onClick={signIn}
            className="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full w-32 m-2"
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          <button
            onClick={signOut}
            className="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full w-32 m-2"
          >
            Sign out
          </button>
        </>
      )}
    </>
  );
};
