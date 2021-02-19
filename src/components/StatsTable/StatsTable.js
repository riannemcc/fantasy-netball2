import { calculatePlayerPoints } from "../../../util/helpers";

export const StatsTable = ({ players }) => {
    const teams = Array.from(
        new Set(players
            .filter(player => player.team)
            .map(player => player.team)
        )
    )
    const playersWithPoints = players.map(player => ({
        ...player,
        points: calculatePlayerPoints(player)
    }))

    return (
        <div>
            {
                teams.map((team) => {
                    return (
                        <>
                            <div className="items-center flex flex-col" >
                                <h2 class="text-xl text-black font-bold mt-6 mb-2 ml-4">{team}</h2>
                                <table class="table-auto ml-2 mr-2 w-auto shadow-lg bg-gray-100 ">
                                    <thead>
                                        <tr>
                                            <th class="border border-black px-4 py-2">Player</th>
                                            <th class="border border-black px-4 py-2">Total Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {playersWithPoints
                                            .filter(player => player.team === team)
                                            .map((player) =>
                                            (
                                                <tr key={`${team}-${player._id}`}>
                                                    <td class="border border-black px-4 py-2">
                                                        {player.name}
                                                    </td>
                                                    <td class="border border-black px-4 py-2">
                                                        {player.points}
                                                    </td>
                                                </tr>
                                            )
                                            )}
                                    </tbody>
                                </table>
                            </div>

                        </>
                    );
                })
            }
        </div>
    )
}


