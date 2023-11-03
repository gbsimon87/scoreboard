import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { generateRandomId, slicedPlayerName } from '../../utils';

const FormNewGame = () => {
  const [homeTeamName, setHomeTeamName] = useState('');
  const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
  const [homePlayerName, setHomePlayerName] = useState('');
  const [homeTeamSelectedPosition, setHomeTeamSelectedPosition] = useState("");
  const [selectedHomeTeamPlayerNumber, setSelectedHomeTeamPlayerNumber] = useState('Select Number');
  const [awayTeamName, setAwayTeamName] = useState('');
  const [awayTeamPlayers, setAwayTeamPlayers] = useState([]);
  const [awayPlayerName, setAwayPlayerName] = useState('');
  const [awayTeamSelectedPosition, setAwayTeamSelectedPosition] = useState("");
  const [selectedAwayTeamPlayerNumber, setSelectedAwayTeamPlayerNumber] = useState('Select Number');
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
      fouls: 0,
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
      player.position = homeTeamSelectedPosition;
      player.number = selectedHomeTeamPlayerNumber;

      if (homePlayerName.trim() !== '') {
        setHomeTeamPlayers([
          ...homeTeamPlayers,
          player
        ]);
        setHomePlayerName(''); // Clear the input after adding a player
        setHomeTeamSelectedPosition('');
        setSelectedHomeTeamPlayerNumber('Select Number');
      }
    } else if (team === 'away') {
      player.position = awayTeamSelectedPosition;
      player.number = selectedAwayTeamPlayerNumber;

      if (awayPlayerName.trim() !== '') {
        setAwayTeamPlayers([
          ...awayTeamPlayers,
          player
        ]);
        setAwayPlayerName(''); // Clear the input after adding a player
        setAwayTeamSelectedPosition('');
        setSelectedAwayTeamPlayerNumber('Select Number');
      }
    }
  };

  const handleHomeTeamPositionChange = (event) => {
    setHomeTeamSelectedPosition(event.target.value);
  }

  const handleAwayTeamPositionChange = (event) => {
    setAwayTeamSelectedPosition(event.target.value);
  }

  const handleHomeTeamNumberChange = (event) => {
    setSelectedHomeTeamPlayerNumber(event.target.value);
  }

  const handleAwayTeamNumberChange = (event) => {
    setSelectedAwayTeamPlayerNumber(event.target.value);
  }

  const handleStartGame = () => {
    const data = {
      id: generateRandomId(),
      homeTeam: {
        name: homeTeamName,
        score: 0,
        players: homeTeamPlayers,
        id: generateRandomId(),
      },
      awayTeam: {
        name: awayTeamName,
        score: 0,
        players: awayTeamPlayers,
        id: generateRandomId(),
      },
      completed: false,
    };

    // Get the existing games data from local storage
    const storedData = localStorage.getItem('games');
    let parsedData = storedData ? JSON.parse(storedData) : [];

    // Add the new game to the beginning of the games array
    parsedData.unshift(data);

    localStorage.setItem('games', JSON.stringify(parsedData));

    dispatch({ type: 'CREATE_GAME', payload: data });

    navigate('/scoreboard');
  };

  return (
    <div className="page page--new-game">
      <form className="form">
        <label>
          Home Team Name
          <input type="text" value={homeTeamName} onChange={handleHomeTeamNameChange} />
        </label>
        <label>
          Away Team Name
          <input type="text" value={awayTeamName} onChange={handleAwayTeamNameChange} />
        </label>
      </form>

      <div className="home-team-players-container">
        <div className="home-team-players-name">
          <label>
            Home Team Players
            <input
              type="text"
              value={homePlayerName}
              onChange={handleHomePlayerNameChange}
            />
          </label>
          <select value={homeTeamSelectedPosition} onChange={handleHomeTeamPositionChange}>
            <option value="" disabled>Select Position</option>
            <option value="PG">PG</option>
            <option value="SG">SG</option>
            <option value="SF">SF</option>
            <option value="PF">PF</option>
            <option value="C">C</option>
          </select>
          <input
            type="number"
            value={selectedHomeTeamPlayerNumber}
            onChange={handleHomeTeamNumberChange}
          />
          <button onClick={() => addPlayerToTeam('home')}>Add Player</button>
        </div>

        <div className="away-team-players-name">
          <label>
            Away Team Players
            <input
              type="text"
              value={awayPlayerName}
              onChange={handleAwayPlayerNameChange}
            />
          </label>
          <select value={awayTeamSelectedPosition} onChange={handleAwayTeamPositionChange}>
            <option value="" disabled>Select Position</option>
            <option value="PG">PG</option>
            <option value="SG">SG</option>
            <option value="SF">SF</option>
            <option value="PF">PF</option>
            <option value="C">C</option>
          </select>
          <input
            type="number"
            value={selectedAwayTeamPlayerNumber}
            onChange={handleAwayTeamNumberChange}
          />
          <button onClick={() => addPlayerToTeam('away')}>Add Player</button>
        </div>
      </div>

      <div className="players-roster-container">
        <div className="players-roster-container__home">
          <h3>{homeTeamName}</h3>
          <ul>
            {homeTeamPlayers.map((player, index) => (
              <li key={index}>
                <span>{player?.position && player.position}</span>
                <span>{player?.number && player.number}</span>
                <span>{player?.name && slicedPlayerName(player.name)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="players-roster-container__away">
          <h3>{awayTeamName}</h3>
          <ul>
            {awayTeamPlayers.map((player, index) => (
              <li key={index}>
                <span>{player?.position && player.position}</span>
                <span>{player?.number && player.number}</span>
                <span>{player?.name && slicedPlayerName(player.name)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <button onClick={() => handleStartGame()}>START GAME</button>
      </div>
    </div>
  );
};

export default FormNewGame;
