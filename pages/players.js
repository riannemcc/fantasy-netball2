// use this example for rendering db contents once

import { connectToDatabase } from "../util/mongodb";

export default function Players({ players }) {
  return (
    <div>
      <h1>VNSL players stats</h1>
      // INSERT FORM
        {/* {players.map((player) => (
          <span>{player.name}</span>
          <span>{player.team}</span> */}

        {/* ))} */}

    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const players = await db
    .collection("players")
    .find({})
    .sort({})
    .limit(200)
    .toArray();

  return {
    props: {
        players: JSON.parse(JSON.stringify(players)),
    },
  };
}