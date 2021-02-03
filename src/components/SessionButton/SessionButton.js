// import { signIn, signOut, useSession } from "next-auth/client";
import { useUser } from "../../../lib/hooks";

export const SessionButton = () => {
  // const [session, loading] = useSession();

  //   if (loading) {
  //     return <p>Loading...</p>;
  //   }
  const [, { mutate }] = useUser();
  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    // set the user state to null
    mutate(null);
  };

  return (
    <button
      // onClick={signOut}
      onClick={handleLogout}
      class="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full"
    >
      Sign out
    </button>
  );
};
