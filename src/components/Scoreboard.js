import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import ConfirmationModal from './Modal/ConfirmationModal';
import { slicedPlayerName } from '../utils';
import BoxScoreModal from './Modal/BoxScoreModal';

const Scoreboard = () => {
  const { state: { currentGame }, dispatch } = useGlobalContext();
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showBoxScoreModal, setShowBoxScoreModal] = useState(false);
  const navigate = useNavigate();

  const handleSelectPlayer = (player, location) => {
    const selectedPlayerDetails = {
      player,
      location
    }
    setSelectedPlayer(selectedPlayerDetails);
  };

  const handleAction = (actionType) => {
    const selectedPlayerIsEmpty = Object.keys(selectedPlayer).length === 0;

    if (selectedPlayerIsEmpty) return;

    if (selectedPlayer) {
      dispatch({
        type: 'UPDATE_PLAYER_STAT',
        payload: { actionType, selectedPlayer }
      });

      setSelectedPlayer({});
    }
  };

  const handleFinishGame = () => {
    setShowConfirmationModal(true);
  };

  const handleCompleteGame = () => {
    if (currentGame) {
      currentGame.completed = true;

      dispatch({ type: 'COMPLETE_GAME', payload: currentGame });

      const storedData = localStorage.getItem('games');
      let parsedData = storedData ? JSON.parse(storedData) : [];
      const gameIndex = parsedData.findIndex((game) => game.id === currentGame.id);

      if (gameIndex !== -1) {
        parsedData[gameIndex] = currentGame;
        localStorage.setItem('games', JSON.stringify(parsedData));
      }

      setShowConfirmationModal(false);
      navigate("/")
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleShowBoxScore = () => {
    setShowBoxScoreModal(true);
  }

  const handleCloseBoxScoreModal = () => {
    setShowBoxScoreModal(false);
  }

  const {
    homeTeam,
    awayTeam
  } = currentGame;

  return (
    <div className="scoreboard">
      <div className="scoreboard-area__score">
        <div className="scoreboard-area__score-team-scores">
          <div className="homeTeam">
            <h1>{homeTeam?.name}</h1>
            <span>{homeTeam?.score}</span>
          </div>
          <div className="awayTeam">
            <span>{awayTeam?.score}</span>
            <h1>{awayTeam?.name}</h1>
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
      <div className="scoreboard-area__box-score">
        <button className="button" onClick={handleFinishGame}>Finish Game</button>
        <button className="button" onClick={handleShowBoxScore}>Box Score</button>
      </div>
      <div className="scoreboard-area__stats-options">
        <div className="left-side">
          <button className="button button_made left-side__stats" onClick={() => handleAction("fouls")}>FL</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("turnovers")}>TO</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("freeThrowsMade")}>FT</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("steals")}>STL</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("blocks")}>BLK</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("threePointFieldGoalsMade")}>3PT</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("assists")}>AST</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("rebounds")}>REB</button>
          <button className="button button_made left-side__stats" onClick={() => handleAction("twoPointFieldGoalsMade")}>2PT</button>
        </div>
        <div className="right-side">
          <button className="button button_missed right-side__stats" onClick={() => handleAction("freeThrowsMissed")}>FT</button>
          <button className="button button_missed right-side__stats" onClick={() => handleAction("threePointFieldGoalsMissed")}>3PT</button>
          <button className="button button_missed right-side__stats" onClick={() => handleAction("twoPointFieldGoalsMissed")}>2PT</button>
        </div>
      </div>
      <div className="scoreboard-area__teams">
        <div className="scoreboard-area__teams--team-list team-list-home">
          {
            homeTeam?.players?.map((player, index) => (
              <div
                key={index}
                className={`player ${selectedPlayer && selectedPlayer.player && selectedPlayer.player.id === player.id ? "player-selected" : ""}`}
                onClick={() => handleSelectPlayer(player, "home")}>
                <div className="player_number">{player?.number}</div>
                <span>|</span>
                <div className="player_name">{player?.name && slicedPlayerName(player.name)}</div>
              </div>
            ))
          }
        </div>
        <div className="scoreboard-area__teams--team-list team-list-away">
          {
            awayTeam?.players?.map((player, index) => (
              <div
                key={index}
                className={`player ${selectedPlayer && selectedPlayer.player && selectedPlayer.player.id === player.id ? "player-selected" : ""}`}
                onClick={() => handleSelectPlayer(player, "away")}>
                <div className="player_name">{player?.name && slicedPlayerName(player.name)}</div>
                <span>|</span>
                <div className="player_number">{player?.number}</div>
              </div>
            ))
          }
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmationModal}
        closeModal={handleCloseConfirmationModal}
        onConfirm={handleCompleteGame}
      />

      <BoxScoreModal
        isOpen={showBoxScoreModal}
        closeModal={handleCloseBoxScoreModal}
        data={currentGame}
      />
    </div>
  )
}

export default Scoreboard;
