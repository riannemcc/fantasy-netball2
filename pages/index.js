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
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
      <HomePage />
    </>
  );
}
// export { HomePage as default } from '../src/components/HomePage'
