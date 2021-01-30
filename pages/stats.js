import React from 'react'
import { connectToDatabase } from "../util/mongodb";

export default function Stats({ players }) {
  return (
    <div>
      <h1>VNSL players stats</h1>
      <h2>Celtic Dragons</h2>
      <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Week One Points</th>
            </tr>
          </thead>
            {players.map((player) => (
                player.team === 'Celtic Dragons' ? 
                <tbody>
                    <td>{player.name}</td>
                    <td>{player.team}</td>
                    <td>POINTS</td>
                </tbody>
             : null
            ))}
      </table>
      <h2>Leeds Rhinos</h2>
      <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Week One Points</th>
            </tr>
          </thead>
            {players.map((player) => (
                player.team === 'Leeds Rhinos' ? 
                <tbody>
                    <td>{player.name}</td>
                    <td>{player.team}</td>
                    <td>POINTS</td>
                </tbody>
             : null
            ))}
      </table>
      <h2>London Pulse</h2>
      <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Week One Points</th>
            </tr>
          </thead>
            {players.map((player) => (
                player.team === 'London Pulse' ? 
                <tbody>
                    <td>{player.name}</td>
                    <td>{player.team}</td>
                    <td>POINTS</td>
                </tbody>
             : null
            ))}
      </table>
      <h2>Loughborough Lightning</h2>
      <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Week One Points</th>
            </tr>
          </thead>
            {players.map((player) => (
                player.team === 'Loughborough Lightning' ? 
                <tbody>
                    <td>{player.name}</td>
                    <td>{player.team}</td>
                    <td>POINTS</td>
                </tbody>
             : null
            ))}
      </table>
      <h2>Manchester Thunder</h2>
      <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Week One Points</th>
            </tr>
          </thead>
            {players.map((player) => (
                player.team === 'Manchester Thunder' ? 
                <tbody>
                    <td>{player.name}</td>
                    <td>{player.team}</td>
                    <td>POINTS</td>
                </tbody>
             : null
            ))}
      </table>
      <h2>Saracens Mavericks</h2>
      <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Week One Points</th>
            </tr>
          </thead>
            {players.map((player) => (
                player.team === 'Saracens Mavericks' ? 
                <tbody>
                    <td>{player.name}</td>
                    <td>{player.team}</td>
                    <td>POINTS</td>
                </tbody>
             : null
            ))}
      </table>
      <h2>Severn Stars</h2>
      <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Week One Points</th>
            </tr>
          </thead>
            {players.map((player) => (
                player.team === 'Severn Stars' ? 
                <tbody>
                    <td>{player.name}</td>
                    <td>{player.team}</td>
                    <td>POINTS</td>
                </tbody>
             : null
            ))}
      </table>
      <h2>Strathclyde Sirens</h2>
      <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Week One Points</th>
            </tr>
          </thead>
            {players.map((player) => (
                player.team === 'Strathclyde Sirens' ? 
                <tbody>
                    <td>{player.name}</td>
                    <td>{player.team}</td>
                    <td>POINTS</td>
                </tbody>
             : null
            ))}
      </table>
      <h2>Surrey Storm</h2>
      <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Week One Points</th>
            </tr>
          </thead>
            {players.map((player) => (
                player.team === 'Surrey Storm' ? 
                <tbody>
                    <td>{player.name}</td>
                    <td>{player.team}</td>
                    <td>POINTS</td>
                </tbody>
             : null
            ))}
      </table>
      <h2>Team Bath</h2>
      <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Week One Points</th>
            </tr>
          </thead>
            {players.map((player) => (
                player.team === 'Team Bath' ? 
                <tbody>
                    <td>{player.name}</td>
                    <td>{player.team}</td>
                    <td>POINTS</td>
                </tbody>
             : null
            ))}
      </table>
      <h2>Wasps Netball</h2>
      <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Team</th>
              <th>Total Points</th>
              <th>Week One Points</th>
            </tr>
          </thead>
            {players.map((player) => (
                player.team === 'Wasps Netball' ? 
                <tbody>
                    <td>{player.name}</td>
                    <td>{player.team}</td>
                    <td>POINTS</td>
                </tbody>
             : null
            ))}
      </table>
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
