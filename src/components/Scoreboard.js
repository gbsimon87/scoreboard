import React from 'react'

const Scoreboard = ({
  homeScore,
  awayScore,
  selectedPlayer,
  homeTeamData,
  awayTeamData,
  handleAction,
  handleSelectPlayer
}) => {
  return (
    <div className="scoreboard">
      <div className="scoreboard-area__score">
        <div className="scoreboard-area__score-team-scores">
          <div>{homeScore}</div>
          <div>{awayScore}</div>
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
        <div className="scoreboard-area__teams--team-list team-list-left">
          {
            homeTeamData.map((player, index) => (
              <div key={index} className={`player ${selectedPlayer && selectedPlayer.player && selectedPlayer.player.id === player.id ? "player-selected" : ""}`} onClick={() => handleSelectPlayer(player, "home")}>
                <div className="player_number">{player.number}</div>
                <div className="player_name">{player.name}</div>
                <div className="player_position">{player.position}</div>
              </div>
            ))
          }
        </div>
        <div className="scoreboard-area__teams--team-list team-list-right">
          {
            awayTeamData.map((player, index) => (
              <div key={index} className={`player ${selectedPlayer && selectedPlayer.player && selectedPlayer.player.id === player.id ? "player-selected" : ""}`} onClick={() => handleSelectPlayer(player, "away")}>
                <div className="player_number">{player.number}</div>
                <div className="player_name">{player.name}</div>
                <div className="player_position">{player.position}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Scoreboard