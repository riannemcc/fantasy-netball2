import { signIn, signOut, useSession } from "next-auth/client";

export const SessionButton = () => {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          <button
            onClick={signIn}
            class="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          <button
            onClick={signOut}
            class="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Sign out
          </button>
        </>
      )}
    </>
  );
};
