import React from 'react';
import { connectToDatabase } from '../util/mongodb';
import { StatsTable } from '../src/components/StatsTable';

export default function Stats({ players }) {
  return (
    <div>
      <div className="m-4 flex flex-row">
        <h1 className="text-xl text-black font-bold ">Player stats</h1>
        <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-1" />
      </div>
      <StatsTable players={players} />
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const players = await db
    .collection('players')
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
