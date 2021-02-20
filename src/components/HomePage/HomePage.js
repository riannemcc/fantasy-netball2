import React from 'react';
import Image from 'next/image';
import { SessionButton } from '../SessionButton';
import { ProfileButton } from '../ProfileButton';

export const HomePage = () => {
  return (
    <div className="mr-2">
      <div className="flex flex-col ml-4">
        <h1 className="font-sans font-bold text-6xl text-black text-center mt-4">
          Superleague
          <br />
          Fantasy Netball
        </h1>
        <div className="flex flex-col justify-center items-center">
          <Image src="/logoalt.png" alt="netball" width="140" height="140" />
        </div>
        <h2 className="font-sans font-bold text-3xl text-gray-600 text-center mb-5">
          Choose your team. Watch them play. Win some points.
        </h2>
        <div className="w=6/12 self-center flex flex-col ">
          <ProfileButton />
          <SessionButton />
        </div>
      </div>
    </div>
  );
};
