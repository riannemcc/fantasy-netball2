import React, { ReactElement } from 'react';
import { connectToDatabase } from '_util/mongodb';
import { LeaderboardTable } from '_components/LeaderboardTable';
import { EMMNASponsor } from '_components/EMMNASponsor';
import { useUsers } from '_src/hooks/useUsers';
import { Player } from '_src/types/players';

interface LeaderboardProps {
  players: Player[];
}

export default function Leaderboard({
  players,
}: LeaderboardProps): ReactElement {
  const { users } = useUsers();

  return (
    <>
      <div className="m-2 flex flex-row">
        <h1 className="text-xl text-black font-bold">Leaderboard</h1>
        <div className="border-t-2 flex-1 ml-2 leading-9 text-base font-semibold mt-3.5 border-pink opacity-1 w-6/12" />
      </div>
      <div className="m-2 mx-auto max-w-2xl flex flex-col items-center">
        <EMMNASponsor />
      </div>
      <div className="flex flex-col items-center m-4 overflow-x-scroll">
        {users ? (
          <LeaderboardTable users={users} players={players} tenRows={false} />
        ) : null}
      </div>
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: LeaderboardProps;
}> {
  const { db } = await connectToDatabase();

  const players = await db.collection('players').find({}).toArray();

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
