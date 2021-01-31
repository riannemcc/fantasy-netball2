import React from "react";
import Image from "next/image";

import styles from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1
          className="title"
          class="font-sans font-bold text-2xl text-red-700 text-center"
        >
          Welcome to Macca's Fantasy Netball
        </h1>
        <Image
          class="absolute inset-y-0 left-0 w-8"
          src="/netball.png"
          alt="netball"
          width="550"
          height="550"
        />
      </div>
    </>
  );
};
