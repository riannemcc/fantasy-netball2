import React from "react";
import Image from "next/image";
import { SessionButton } from "../SessionButton";
import { ProfileButton } from "../ProfileButton";

export const HomePage = () => {
  return (
    <div class="w-11/12">
      <div className="flex flex-col justify-center items-center">
        <Image src="/logo.png" alt="netball" width="100" height="100" />
      </div>
      <div class="flex flex-col ml-4">
        <h1 class="font-sans font-bold text-6xl text-black text-center mt-4">
          Superleague
          <br />
          Fantasy Netball
        </h1>
        <h2 class="font-sans font-bold text-3xl text-gray-600 text-center mt-5 mb-6">
          Choose your team. Watch them play. Win some points.
        </h2>
        <div class="w=6/12 self-center flex flex-col ">
          <SessionButton />
          <ProfileButton />
        </div>
      </div>
      {/* <Image src="/netballcrop.png" alt="netball" width="550" height="550" /> */}
    </div>
  );
};
