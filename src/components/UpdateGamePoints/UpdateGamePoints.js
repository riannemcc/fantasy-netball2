import { useState } from "react"
import moment from "moment";

function getGameHeading(game) {
  return `[${moment(game.startDateTime).format("DD MMM HH:mm")}] ${game.homeTeam} vs ${game.awayTeam}`
}

function TeamPlayerPointsInput({ teamName, players, onChange }) {
  return (
    <div className="flex w-full flex-wrap flex-col items-center flex-1">
      <h2>{teamName}</h2>
      {players.filter(player => player.team === teamName).map(player => (
        <label class="font-sans font-bold text-xl text-black m-4" key={player._id}>
          {player.name}
          <input
            class="border-2 border-black w-6/12 ml-4"
            type="number"
            required
            value={player.thisGamePoints}
            onChange={(event) => onChange(player._id, event.target.value)}
          />
        </label>
      ))}
    </div>
  )
}

async function updatePoints(game, players) {
  const playersGames = players.map(player => {
    const otherGames = (player.games && player.games.filter(playerGame => game._id !== playerGame.gameId)) || []
    const allPlayerGames = [
      ...otherGames,
      {
        gameId: game._id,
        startDateTime: game.startDateTime,
        points: parseInt(player.thisGamePoints, 10)
      }
    ]

    return {
      id: player._id,
      games: allPlayerGames,
    }
  })

  return fetch("/api/update-points", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ playersGames }),
  });
}


export function UpdateGamePoints({ games, players }) {
  const [selected, setSelected] = useState({
    game: null,
    players: null
  })

  const handleSelectGame = (gameId) => {
    const selectedGame = games.find(game => game._id === gameId)

    setSelected({
      game: selectedGame,
      players: players
        .filter(player => player.team === selectedGame.homeTeam || player.team === selectedGame.awayTeam)
        .map(player => {
          const playerGameRef = player.games && player.games.find(game => game.gameId === selectedGame._id)
          const points = (playerGameRef && playerGameRef.points) || 0
          return {
            ...player,
            thisGamePoints: points
          }
        })
    })
  }

  const handleChangePlayerPoints = (playerId, points) => {
    setSelected(state => {
      return {
        ...state,
        players: state.players.map(player => ({
          ...player,
          thisGamePoints: player._id === playerId ? points : player.thisGamePoints
        }))
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!selected.game || !selected.players) {
      alert('Missing data')
      return
    }

    try {
      const res = await updatePoints(selected.game, selected.players)
      if (res.status === 204) {
        alert('Team updated 🎉')
      } else {
        throw new Error(`Response status: ${res.status}`)
      }
    } catch (error) {
      alert('Sorry, something went wrong.')
    }
  }

  return (
    <form className="flex w-screen flex-col items-center" onSubmit={handleSubmit}>
      <label htmlFor="select-game">Select a game</label>
      <select id="select-game" class="w-8/12 ml-6 mb-6 border-2 border-black" onChange={(event) => {
        handleSelectGame(event.target.value)
      }}>
        <option value="">--- No game selected ---</option>
        {games.map((game) => (
          <option key={game._id} value={game._id}>
            {getGameHeading(game)}
          </option>
        ))}
      </select>
      {selected.game ? (
        <>
          <div className="flex w-screen justify-center">
            <TeamPlayerPointsInput teamName={selected.game.homeTeam} players={selected.players} onChange={handleChangePlayerPoints} />
            <TeamPlayerPointsInput teamName={selected.game.awayTeam} players={selected.players} onChange={handleChangePlayerPoints} />
          </div>
          <button class="bg-pink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full self-center" type="submit">Update points</button>
        </>
      ) : null}
    </form>
  )
}