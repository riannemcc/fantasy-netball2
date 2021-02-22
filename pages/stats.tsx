import React, { ReactElement } from 'react';
import { connectToDatabase } from '_util/mongodb';
import { StatsTable } from '_components/StatsTable';
import { Player } from '_src/types/players';

interface StatsProps {
  players: Player[];
}

export default function Stats({ players }: StatsProps): ReactElement {
  return (
    <div>
      <div className="m-4 flex flex-row">
        <h1 className="text-xl text-black font-bold ">Player stats</h1>
        <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-1" />
      </div>
      <div className="flex flex-col items-center m-4 overflow-x-scroll">
        <StatsTable players={players} />
      </div>
    </div>
  );
}

export async function getServerSideProps(): Promise<{ props: StatsProps }> {
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
