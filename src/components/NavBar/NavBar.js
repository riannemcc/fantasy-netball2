import Link from "next/link";
import { useState } from "react";
import { SessionButton } from "../SessionButton";
import { useSession } from "next-auth/client";
import Image from "next/image";

export const NavBar = ({ currentUser }) => {
  const [active, setActive] = useState(false);
  const [session, loading] = useSession();

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <nav className="flex items-center flex-wrap bg-black">
      <Link href="/">
        <a class="inline-flex items-center mr-4 ">
          <Image src="/logo.png" alt="netball" width="80" height="80" />
          {/* <span class="text-xl text-pink font-bold uppercase tracking-wide">
            Fantasy Netball
          </span> */}
        </a>
      </Link>
      <button
        class=" inline-flex p-3 hover:bg-pink-900 rounded lg:hidden text-pink ml-auto hover:text-white outline-none"
        onClick={handleClick}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className={`${active ? "" : "hidden"} w-full lg:inline-flex lg:flex-grow lg:w-auto`}>
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
          <Link href="/">
            <a
              onClick={handleClick}
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white "
            >
              Home
            </a>
          </Link>
          {session && (
            <Link href="/profile">
              <a
                onClick={handleClick}
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white "
              >
                Profile
              </a>
            </Link>
          )}
          <Link href="/stats">
            <a
              onClick={handleClick}
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white"
            >
              Stats
            </a>
          </Link>
          <Link href="/leaderboard">
            <a
              onClick={handleClick}
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white"
            >
              Leaderboard
            </a>
          </Link>
          <Link href="/team-selection">
            <a
              onClick={handleClick}
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white"
            >
              Team Selection
            </a>
          </Link>
          <Link href="/rules">
            <a
              onClick={handleClick}
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white"
            >
              Rules
            </a>
          </Link>
          {currentUser && currentUser.isAdmin ? (
            <Link href="/update-points">
              <a
                onClick={handleClick}
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white"
              >
                Update Points
              </a>
            </Link>
          ) : null}
          {loading ? null : <SessionButton />}
        </div>
      </div>
    </nav>
  );
};
