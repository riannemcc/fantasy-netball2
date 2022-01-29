import React, { ReactElement } from 'react';
import Image from 'next/image';
import { SessionButton } from '_components/SessionButton';
import { ProfileButton } from '_components/ProfileButton';

export const HomePage = (): ReactElement => {
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
        {/* <div className="w=6/12 self-center flex flex-col ">
          <ProfileButton />
          <SessionButton />
        </div> */}
        <h2 className="font-sans font-bold text-3xl text-pink text-center mb-5">
          Re-opening for team selection from 9am 7th February until midnight
          10th February!
        </h2>
      </div>
    </div>
  );
};
