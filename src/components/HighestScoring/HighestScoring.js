export const HighestScoring = ({ players }) => {
  function compare(a, b) {
    const playerA = a.points;
    const playerB = b.points;

    let comparison = 0;
    if (playerA > playerB) {
      comparison = -1;
    } else if (playerA < playerB) {
      return comparison * 1;
    }
    return comparison;
  }
  const playerWithHighestPoints = players.sort(compare).slice(0, 1);

  return (
    <div className="bg-pink w-60 h-60 rounded-full border-solid border-black border-2 flex flex-col justify-center items-center opacity-80">
      <div className="text-center">
        <span className="text-xl text-base text-black font-bold m-2">
          {playerWithHighestPoints[0].name}
        </span>
        <br />
        <span className="text-xl text-base text-black font-bold m-2 ">
          {playerWithHighestPoints[0].points}
        </span>
      </div>
    </div>
  );
};
