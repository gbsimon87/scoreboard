import React, { useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext';
import ConfirmationModal from './Modal/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const Scoreboard = ({ selectedPlayer, handleAction, handleSelectPlayer }) => {
  const { state: { currentGame }, dispatch } = useGlobalContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleFinishGame = () => {
    setModalOpen(true);
  };

  const handleCompleteGame = () => {
    if (currentGame) {
      currentGame.completed = true;

      // Dispatch the action to complete the game
      dispatch({ type: 'COMPLETE_GAME', payload: currentGame });

      // Get the existing games data from local storage
      const storedData = localStorage.getItem('games');
      let parsedData = storedData ? JSON.parse(storedData) : [];

      // Find the index of the game with the matching ID in local storage
      const gameIndex = parsedData.findIndex((game) => game.id === currentGame.id);

      if (gameIndex !== -1) {
        // Update the game in local storage
        parsedData[gameIndex] = currentGame;

        // Update local storage with the modified games array
        localStorage.setItem('games', JSON.stringify(parsedData));
      }

      setModalOpen(false);
      navigate("/")
    } else {
      console.log("currentGame not found");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const {
    homeTeam,
    awayTeam
  } = currentGame;

  return (
    <div className="scoreboard">
      <div className="scoreboard-area__score">
        <div className="scoreboard-area__score-team-scores">
          <div className="homeTeam">
            <span>{homeTeam?.name}</span>
            <span>{homeTeam?.score}</span>
          </div>
          <div className="awayTeam">
            <span>{awayTeam?.score}</span>
            <span>{awayTeam?.name}</span>
          </div>
        </div>
        {Object.keys(selectedPlayer).length > 0 && (
          <div className="scoreboard-area__score-stats-categories">
            <div className="stats-category">
              <div className="stats-category_points-name">
                PTS
              </div>
              <div className="stats-category_points-value">
                {selectedPlayer && selectedPlayer.player && selectedPlayer.player["points"]}
              </div>
            </div>
            <div className="stats-category">
              <div className="stats-category_assists-name">
                AST
              </div>
              <div className="stats-category_assists-value">
                {selectedPlayer && selectedPlayer.player && selectedPlayer.player["assists"]}
              </div>
            </div>
            <div className="stats-category">
              <div className="stats-category_rebounds-name">
                REB
              </div>
              <div className="stats-category_rebounds-value">
                {selectedPlayer && selectedPlayer.player && selectedPlayer.player["rebounds"]}
              </div>
            </div>
            <div className="stats-category">
              <div className="stats-category_steals-name">
                STL
              </div>
              <div className="stats-category_steals-value">
                {selectedPlayer && selectedPlayer.player && selectedPlayer.player["steals"]}
              </div>
            </div>
            <div className="stats-category">
              <div className="stats-category_blocks-name">
                BLK
              </div>
              <div className="stats-category_blocks-value">
                {selectedPlayer && selectedPlayer.player && selectedPlayer.player["blocks"]}
              </div>
            </div>
            <div className="stats-category">
              <div className="stats-category_turnovers-name">
                TO
              </div>
              <div className="stats-category_turnovers-value">
                {selectedPlayer && selectedPlayer.player && selectedPlayer.player["turnovers"]}
              </div>
            </div>
            <div className="stats-category">
              <div className="stats-category_fouls-name">
                FL
              </div>
              <div className="stats-category_fouls-value">
                {selectedPlayer && selectedPlayer.player && selectedPlayer.player["fouls"]}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="scoreboard-area__stats-options">
        <div className="left-side">
          <button className="button button_made left-side__stats" onClick={() => handleAction("fouls")}>FL</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("turnovers")}>TO</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("freethrows")}>FT</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("steals")}>STL</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("blocks")}>BLK</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("threePoints")}>3PT</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("assists")}>AST</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("rebounds")}>REB</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("twoPoints")}>2PT</button>
        </div>
        <div className="right-side">
          <button className="button button_missed right-side__stats">FT</button>
          <button className="button button_missed right-side__stats">3PT</button>
          <button className="button button_ed right-side__stats">2PT</button>
        </div>
      </div>
      <div className="scoreboard-area__teams">
        <div className="scoreboard-area__teams--team-list team-list-home">
          {
            homeTeam?.players?.map((player, index) => (
              <div key={index} className={`player ${selectedPlayer && selectedPlayer.player && selectedPlayer.player.id === player.id ? "player-selected" : ""}`} onClick={() => handleSelectPlayer(player, "home")}>
                {/* <div className="player_number">{player.number}</div> */}
                <div className="player_name">{player.name}</div>
                {/* <div className="player_position">{player.position}</div> */}
              </div>
            ))
          }
        </div>
        <div className="scoreboard-area__teams--team-list team-list-away">
          {
            awayTeam?.players?.map((player, index) => (
              <div key={index} className={`player ${selectedPlayer && selectedPlayer.player && selectedPlayer.player.id === player.id ? "player-selected" : ""}`} onClick={() => handleSelectPlayer(player, "away")}>
                {/* <div className="player_number">{player.number}</div> */}
                <div className="player_name">{player.name}</div>
                {/* <div className="player_position">{player.position}</div> */}
              </div>
            ))
          }
        </div>
      </div>

      <button onClick={handleFinishGame}>Finish Game</button>

      <ConfirmationModal
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        onConfirm={handleCompleteGame}
      />
    </div>
  )
}

export default Scoreboard;
