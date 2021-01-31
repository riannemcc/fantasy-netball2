import { signIn, signOut, useSession } from "next-auth/client";
import { HomePage } from "../src/components/HomePage";

export default function Page() {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

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
          Signed in as {session.user.email} <br />
          <button
            onClick={signOut}
            class="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Sign out
          </button>
        </>
      )}
      <HomePage />
    </>
  );
}
// export { HomePage as default } from '../src/components/HomePage'
