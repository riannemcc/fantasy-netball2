import React from "react";
import Image from "next/image";

import styles from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div class="flex flex-row w-11/12">
      <div className={styles.container} class="flex flex-col ml-28 ">
        <h1 class="font-sans font-bold text-6xl text-black text-center  mt-20 object-center">
          Superleague
          <br />
          Fantasy Netball
        </h1>
        <h2 class="font-sans font-bold text-3xl text-gray-600 text-center mt-20">
          Choose your team. Watch them play. Win some points.
        </h2>
      </div>
      <Image src="/netballcrop.png" alt="netball" width="550" height="550" />
    </div>
  );
};
