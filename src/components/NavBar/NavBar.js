import Link from "next/link";
import { useState } from "react";
import { SessionButton } from "../SessionButton";

export const NavBar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <nav className="flex items-center flex-wrap bg-black p-3 ">
      <Link href="/">
        <a className="inline-flex items-center p-2 mr-4 ">
          <span class="text-xl text-pink font-bold uppercase tracking-wide">
            Fantasy Netball
          </span>
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
      <div
        className={`${
          active ? "" : "hidden"
        }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
          <Link href="/">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white ">
              Home
            </a>
          </Link>
          <Link href="/profile">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white ">
              Profile
            </a>
          </Link>
          <Link href="/stats">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white">
              Stats
            </a>
          </Link>
          <Link href="/leaderboard">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white">
              Leaderboard
            </a>
          </Link>
          <Link href="/team-selection">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white">
              Team Selection
            </a>
          </Link>
          <Link href="/rules">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink font-bold items-center justify-center hover:bg-green-600 hover:text-white">
              Rules
            </a>
          </Link>
          <SessionButton />
        </div>
      </div>
    </nav>
  );
};
