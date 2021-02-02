import { signIn, signOut, useSession } from "next-auth/client";

export const SessionButton = () => {
  const [session, loading] = useSession();

  //   if (loading) {
  //     return <p>Loading...</p>;
  //   }

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
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
          {/* Signed in as {session.user.email} <br /> */}
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
