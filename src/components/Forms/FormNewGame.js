import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { generateRandomId, slicedPlayerName } from '../../utils';

const FormNewGame = () => {
  const [homeTeamName, setHomeTeamName] = useState('');
  const [homeTeamPlayers, setHomeTeamPlayers] = useState([]);
  const [homePlayerName, setHomePlayerName] = useState('');
  const [homeTeamSelectedPosition, setHomeTeamSelectedPosition] = useState("");
  const [selectedHomeTeamPlayerNumber, setSelectedHomeTeamPlayerNumber] = useState('');
  const [awayTeamName, setAwayTeamName] = useState('');
  const [awayTeamPlayers, setAwayTeamPlayers] = useState([]);
  const [awayPlayerName, setAwayPlayerName] = useState('');
  const [awayTeamSelectedPosition, setAwayTeamSelectedPosition] = useState("");
  const [selectedAwayTeamPlayerNumber, setSelectedAwayTeamPlayerNumber] = useState('');
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
      assists: 0,
      rebounds: 0,
      steals: 0,
      blocks: 0,
      points: 0,
      freeThrowsMade: 0,
      freeThrowsMissed: 0,
      twoPointFieldGoalsMade: 0,
      twoPointFieldGoalsMissed: 0,
      threePointFieldGoalsMade: 0,
      threePointFieldGoalsMissed: 0,
      turnovers: 0,
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
      <form className="form--create-teams">
        <div className="form--create-teams__home-team-container">
          <h3>Home Team</h3>
          <input type="text" placeholder="Home Team Name" value={homeTeamName} onChange={handleHomeTeamNameChange} />
          <div className="home-team-players-name">
            <input
              type="text"
              value={homePlayerName}
              onChange={handleHomePlayerNameChange}
              placeholder="Home Team Player Name"
            />
            <div className="form--create-teams__add-team-players-actions">
              <select value={homeTeamSelectedPosition} onChange={handleHomeTeamPositionChange}>
                <option value="" disabled>Position</option>
                <option value="PG">PG</option>
                <option value="SG">SG</option>
                <option value="SF">SF</option>
                <option value="PF">PF</option>
                <option value="C">C</option>
              </select>
              <input
                placeholder="Player #"
                type="number"
                min={0}
                max={999}
                value={selectedHomeTeamPlayerNumber}
                onChange={handleHomeTeamNumberChange}
              />
              <button type="button" className="button" onClick={() => addPlayerToTeam('home')}>Add Player</button>
            </div>
          </div>
        </div>
        <div className="form--create-teams__away-team-container">
          <h3>Away Team</h3>
          <input type="text" placeholder="Away Team Name" value={awayTeamName} onChange={handleAwayTeamNameChange} />
          <div className="away-team-players-name">
            <input
              placeholder="Away Team Player Name"
              type="text"
              value={awayPlayerName}
              onChange={handleAwayPlayerNameChange}
            />
            <div className="form--create-teams__add-team-players-actions">
              <select value={awayTeamSelectedPosition} onChange={handleAwayTeamPositionChange}>
                <option value="" disabled>Position</option>
                <option value="PG">PG</option>
                <option value="SG">SG</option>
                <option value="SF">SF</option>
                <option value="PF">PF</option>
                <option value="C">C</option>
              </select>
              <input
                placeholder="Player #"
                type="number"
                min={0}
                max={999}
                value={selectedAwayTeamPlayerNumber}
                onChange={handleAwayTeamNumberChange}
              />
              <button type="button" className="button" onClick={() => addPlayerToTeam('away')}>Add Player</button>
            </div>
          </div>
        </div>
      </form>

      <div className="team-roster-container">
        <div className="team-roster-container__home">
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
        <div className="team-roster-container__away">
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

      <div className="form--submit-container">
        <button className="button" onClick={() => handleStartGame()}>START GAME</button>
      </div>
    </div>
  );
};

export default FormNewGame;
