import React from "react";


export const StatsTable = ({players, teams}) => {
    // const calculateTotalPoints = () => {
    //     players.map(player => {
    //         const game1 = player.wk1points && player.wk1points
    //         const points = game1
    //         return points
    //     })
    // }

    // console.log('calcpoints', calculateTotalPoints())
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
                                            <th class="border border-black px-4 py-2">Round 1 and 2</th>
                                            <th class="border border-black px-4 py-2">Round 3</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {players.map((player, index) =>
                                            player.team === team ? (
                                                <tr>
                                                    <td class="border border-black px-4 py-2">
                                                        {player.name}
                                                    </td>
                                                    <td class="border border-black px-4 py-2">
                                                        {player.points}
                                                    </td>
                                                    <td class="border border-black px-4 py-2">
                                                        {player.round1and2pts && player.round1and2pts}
                                                    </td>
                                                    <td class="border border-black px-4 py-2">
                                                        {player.round3pts && player.round3pts}
                                                    </td>
                                                </tr>
                                            ) : null
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


