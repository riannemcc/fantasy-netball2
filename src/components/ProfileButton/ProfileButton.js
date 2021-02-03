import { useSession } from "next-auth/client";
import Link from "next/link";

export const ProfileButton = () => {
  const [session, loading] = useSession();

  return (
    <>
      {session && (
        <>
          <button
            onClick={() => {}}
            class="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full w-32 m-2"
          >
            <Link href="/profile">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center">
                Profile
              </a>
            </Link>
          </button>
        </>
      )}
    </>
  );
};
