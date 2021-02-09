import React from "react";

import styles from "./RulesText.module.css";

export const RulesText = () => {
  return (
    <div>
      <div className="m-4 flex flex-row">
        <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-1" />
        <span className="text-xl text-black font-bold ml-2">The Rules</span>
      </div>
      <ul className="bg-gray-200 shadow m-2 p-4 font-bold">
        <li>Goals +2</li>
        <li>Misses -4</li>
        <li>Interceptions +10</li>
        <li>Turnovers +1</li>
      </ul>
      <div className="bg-pink text-l p-4 m-2 font-bold">
        Captains will earn 2x the points for the week. Vice Captains will earn
        1.5x the points for the week
      </div>
    </div>
  );
};
