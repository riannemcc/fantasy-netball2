import React, { ReactElement } from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import { connectToDatabase } from '_util/mongodb';
import { TeamSelection } from '_components/TeamSelection';
import { useCurrentUser } from '_src/hooks/useCurrentUser';
import { findPlayerById } from '_util/helpers';
import { Player } from '_src/types/players';

interface TeamSelectionPageProps {
  players: Player[];
}

const IS_TRANFER_WINDOW_OPEN = false;
const POST_TRANSFER_DATE = '2021-04-20T18:00:00.000Z';

export default function TeamSelectionPage({
  players = [],
}: TeamSelectionPageProps): ReactElement {
  const { currentUser } = useCurrentUser();
  if (!currentUser) {
    return null;
  }

  if ((currentUser.teamPlayers || []).length === 0) {
    return (
      <div className="m-6 p-2 bg-green-100 border border-green-400 text-black text-xl font-bold px-4 py-3 rounded relative">
        Team selection is now closed. Come back next year!
      </div>
    );
  }

  const hasInjuredPlayers = (currentUser.teamPlayers || []).some(
    ({ playerId }) => {
      const player = findPlayerById(playerId, players);
      return player && player.isInjured;
    }
  );

  const dateLastPlayerAdded = (currentUser.teamPlayers || [])
    .filter(({ dateAdded }) => !!dateAdded)
    .map(({ dateAdded }) => dateAdded)
    .sort((a, b) => {
      if (moment(a).isBefore(b)) {
        return 1;
      }
      if (moment(a).isAfter(b)) {
        return -1;
      }
      return 0;
    })[0];

  let isTransferWindow = IS_TRANFER_WINDOW_OPEN;
  if (
    dateLastPlayerAdded &&
    moment(dateLastPlayerAdded).isAfter(POST_TRANSFER_DATE)
  ) {
    isTransferWindow = false;
  }

  if (currentUser.teamPlayers && (hasInjuredPlayers || isTransferWindow)) {
    return (
      <TeamSelection
        players={players}
        currentUser={currentUser}
        isInjuryUpdate={hasInjuredPlayers}
        isTransferWindow={isTransferWindow}
      />
    );
  }

  if (currentUser.teamPlayers) {
    return (
      <div
        className="m-6 p-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {IS_TRANFER_WINDOW_OPEN &&
        dateLastPlayerAdded &&
        moment(dateLastPlayerAdded).isAfter(POST_TRANSFER_DATE) ? (
          <>
            You already submitted your mid-season transfer changes on{' '}
            <Moment format="Do MMMM">{dateLastPlayerAdded}</Moment> and cannot
            make any further changes.
          </>
        ) : (
          <>
            The mid-season transfer window is now closed and you cannot make any
            further changes.
          </>
        )}
      </div>
    );
  }

  return (
    // <TeamSelection players={players} currentUser={currentUser} />
    <div className="m-6 p-2 bg-green-100 border border-green-400 text-black text-xl font-bold px-4 py-3 rounded relative">
      Team selection is now closed. Come back next year!
    </div>
  );
}

export async function getServerSideProps(): Promise<{
  props: TeamSelectionPageProps;
}> {
  const { db } = await connectToDatabase();

  const players = await db
    .collection('players')
    .find({})
    .sort({ team: 1, name: 1 })
    .limit(200)
    .toArray();

  return {
    props: {
      players: JSON.parse(JSON.stringify(players)),
    },
  };
}
