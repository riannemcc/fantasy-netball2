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
    <div className="bg-gray-300 w-52 rounded-full border-solid border-black border-2">
      <h2 className="text-2xl text-black font-bold uppercase m-2 self-center ">
        Highest scoring player
        <br />
        <span className="text-base text-black font-bold m-2 ">
          Name: {playerWithHighestPoints[0].name}
        </span>
        <br />
        <span className="text-base text-black font-bold m-2 ">
          Points: {playerWithHighestPoints[0].points}
        </span>
      </h2>
    </div>
  );
};
