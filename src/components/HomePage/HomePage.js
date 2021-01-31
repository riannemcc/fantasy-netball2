import React from "react";
import Image from "next/image";

import styles from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1
          className="title"
          class="font-sans font-bold text-3xl text-black text-center"
        >
          Superleague Fantasy Netball
        </h1>
        <Image src="/netball.png" alt="netball" width="550" height="550" />
      </div>
    </>
  );
};
