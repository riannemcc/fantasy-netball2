import { ReactElement } from 'react';
import { calculatePlayerPoints } from '_util/helpers';
import { Player } from '_src/types/players';

interface HighestScoringProps {
  players: Player[];
}

export const HighestScoring = ({
  players,
}: HighestScoringProps): ReactElement => {
  const playersWithPointsSorted = players
    .map((player) => ({
      ...player,
      points: calculatePlayerPoints(player),
    }))
    .sort((a, b) => b.points - a.points);

  const defendersWithPointsSorted = playersWithPointsSorted.filter(
    (player) => player.position.includes('GD') || player.position.includes('GK')
  );

  const shootersWithPointsSorted = playersWithPointsSorted.filter(
    (player) => player.position.includes('GA') || player.position.includes('GS')
  );

  const midsWithPointsSorted = playersWithPointsSorted.filter(
    (player) =>
      player.position.includes('WA') ||
      player.position.includes('C') ||
      player.position.includes('WD')
  );

  const shooterName =
    shootersWithPointsSorted[0] && shootersWithPointsSorted[0].name;
  const shooterPoints =
    shootersWithPointsSorted[0] && shootersWithPointsSorted[0].points;
  const defendersName =
    defendersWithPointsSorted[0] && defendersWithPointsSorted[0].name;
  const defendersPoints =
    defendersWithPointsSorted[0] && defendersWithPointsSorted[0].points;
  const midsName = midsWithPointsSorted[0] && midsWithPointsSorted[0].name;
  const midsPoints = midsWithPointsSorted[0] && midsWithPointsSorted[0].points;

  return (
    <div className="flex flex-row flex-wrap justify-center">
      <div className=" m-2 bg-pink w-60 h-60 rounded-full border-solid border-black border-2 flex flex-col justify-center items-center opacity-80">
        <div className="text-center">
          <div>Shooter</div>
          <span className="text-xl text-base text-white font-bold m-2">
            {shooterName || ' - '}
          </span>
          <br />
          <span className="text-xl text-base text-white font-bold m-2 ">
            {shooterPoints || ' - '}
          </span>
        </div>
      </div>
      <div className="m-2 bg-gray-400 w-60 h-60 rounded-full border-solid border-black border-2 flex flex-col justify-center items-center opacity-80">
        <div className="text-center">
          <div>Defender</div>
          <span className="text-xl text-base text-white font-bold m-2">
            {defendersName || ' - '}
          </span>
          <br />
          <span className="text-xl text-base text-white font-bold m-2 ">
            {defendersPoints || ' - '}
          </span>
        </div>
      </div>
      <div className="m-2 bg-turquoise w-60 h-60 rounded-full border-solid border-black border-2 flex flex-col justify-center items-center opacity-80">
        <div className="text-center">
          <div>Middie</div>
          <span className="text-xl text-base text-white font-bold m-2">
            {midsName || ' - '}
          </span>
          <br />
          <span className="text-xl text-base text-white font-bold m-2 ">
            {midsPoints || ' - '}
          </span>
        </div>
      </div>
    </div>
  );
};
