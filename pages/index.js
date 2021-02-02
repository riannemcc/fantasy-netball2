import { signIn, signOut, useSession } from "next-auth/client";
import { HomePage } from "../src/components/HomePage";

export default function Page() {
  const [, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  return <HomePage />;
}
