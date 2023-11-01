import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { generateRandomId } from '../../utils';

const FormNewGame = () => {
  const [homeTeamName, setHomeTeamName] = useState('');
  const [awayTeamName, setAwayTeamName] = useState('');
  const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
  const [awayTeamPlayers, setAwayTeamPlayers] = useState([]);
  const [homePlayerName, setHomePlayerName] = useState('');
  const [awayPlayerName, setAwayPlayerName] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();

  const handleHomeTeamNameChange = (event) => {
    setHomeTeamName(event.target.value);
  };

  const handleAwayTeamNameChange = (event) => {
    setAwayTeamName(event.target.value);
  };

  const handleHomePlayerNameChange = (event) => {
    setHomePlayerName(event.target.value);
  };

  const handleAwayPlayerNameChange = (event) => {
    setAwayPlayerName(event.target.value);
  };

  const addPlayerToTeam = (team) => {
    const player = {
      name: team === 'home' ? homePlayerName : awayPlayerName,
      id: generateRandomId(),
      position: '', // Add any other properties you need
      fouls: 0,
      number: 0,
      points: 0,
      assists: 0,
      rebounds: 0,
      steals: 0,
      blocks: 0,
      threePoints: 0,
      turnovers: 0,
      freethrows: 0,
    };

    if (team === 'home') {
      if (homePlayerName.trim() !== '') {
        setHomeTeamPlayers([...homeTeamPlayers, player]);
        setHomePlayerName(''); // Clear the input after adding a player
      }
    } else if (team === 'away') {
      if (awayPlayerName.trim() !== '') {
        setAwayTeamPlayers([...awayTeamPlayers, player]);
        setAwayPlayerName(''); // Clear the input after adding a player
      }
    }
  };

  const handleStartGame = () => {
    const data = {
      id: generateRandomId(),
      homeTeam: {
        name: homeTeamName,
        score: 0,
        players: homeTeamPlayers,
      },
      awayTeam: {
        name: awayTeamName,
        score: 0,
        players: awayTeamPlayers,
      },
      completed: false,
    };

    // Get the existing games data from local storage
    const storedData = localStorage.getItem('games');
    let parsedData = storedData ? JSON.parse(storedData) : [];

    // Add the new game to the beginning of the games array
    parsedData.unshift(data);

    // Update local storage with the modified games array
    localStorage.setItem('games', JSON.stringify(parsedData));

    // Dispatch the CREATE_GAME action to update the state if needed
    dispatch({ type: 'CREATE_GAME', payload: data });

    // Navigate to the scoreboard or perform other actions as needed
    navigate('/scoreboard');
  };

  return (
    <div className="page page--new-game">
      <form className="form">
        <label>
          Home Team Name:
          <input type="text" value={homeTeamName} onChange={handleHomeTeamNameChange} />
        </label>
        <label>
          Away Team Name:
          <input type="text" value={awayTeamName} onChange={handleAwayTeamNameChange} />
        </label>
      </form>

      <div>
        <h3>Home Team Players</h3>
        <input
          type="text"
          value={homePlayerName}
          onChange={handleHomePlayerNameChange}
          placeholder="Player Name"
        />
        <button onClick={() => addPlayerToTeam('home')}>Add Player</button>
        <ul>
          {homeTeamPlayers.map((player, index) => (
            <li key={index}>{player?.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Away Team Players</h3>
        <input
          type="text"
          value={awayPlayerName}
          onChange={handleAwayPlayerNameChange}
          placeholder="Player Name"
        />
        <button onClick={() => addPlayerToTeam('away')}>Add Player</button>
        <ul>
          {awayTeamPlayers.map((player, index) => (
            <li key={index}>{player?.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={() => handleStartGame()}>START GAME</button>
      </div>
    </div>
  );
};

export default FormNewGame;