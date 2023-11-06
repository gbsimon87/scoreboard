import React from 'react';

const PlayerRow = ({ player }) => (
  <tr>
    <td>{player.name}</td>
    <td>{player.points}</td>
    <td>{player.assists}</td>
    <td>{player.rebounds}</td>
    <td>{player.steals}</td>
    <td>{player.fouls}</td>
    <td>{player.blocks}</td>
    <td>{player.freeThrowsMade}</td>
    <td>{player.freeThrowsMissed}</td>
    <td>{player.twoPointFieldGoalsMade}</td>
    <td>{player.twoPointFieldGoalsMissed}</td>
    <td>{player.threePointFieldGoalsMade}</td>
    <td>{player.threePointFieldGoalsMissed}</td>
    <td>{player.turnovers}</td>
  </tr>
);

const TeamTable = ({ team }) => {
  // Calculate totals for each stat
  const totalStats = {
    points: team.players.reduce((total, player) => total + player.points, 0),
    assists: team.players.reduce((total, player) => total + player.assists, 0),
    rebounds: team.players.reduce((total, player) => total + player.rebounds, 0),
    steals: team.players.reduce((total, player) => total + player.steals, 0),
    fouls: team.players.reduce((total, player) => total + player.fouls, 0),
    blocks: team.players.reduce((total, player) => total + player.blocks, 0),
    freeThrowsMade: team.players.reduce((total, player) => total + player.freeThrowsMade, 0),
    freeThrowsMissed: team.players.reduce((total, player) => total + player.freeThrowsMissed, 0),
    twoPointFieldGoalsMade: team.players.reduce((total, player) => total + player.twoPointFieldGoalsMade, 0),
    twoPointFieldGoalsMissed: team.players.reduce((total, player) => total + player.twoPointFieldGoalsMissed, 0),
    threePointFieldGoalsMade: team.players.reduce((total, player) => total + player.threePointFieldGoalsMade, 0),
    threePointFieldGoalsMissed: team.players.reduce((total, player) => total + player.threePointFieldGoalsMissed, 0),
    turnovers: team.players.reduce((total, player) => total + player.turnovers, 0),
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>PTS</th>
            <th>AST</th>
            <th>REB</th>
            <th>STL</th>
            <th>PF</th>
            <th>BLK</th>
            <th>FTM</th>
            <th>FTA</th>
            <th>2PTM</th>
            <th>2PTA</th>
            <th>3PTM</th>
            <th>3PTA</th>
            <th>TOV</th>
          </tr>
        </thead>
        <tbody>
          {team.players.map((player) => (
            <PlayerRow key={player.id} player={player} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            {Object.values(totalStats).map((total, index) => (
              <td key={index}>{total}</td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const CombinedTotals = ({ homeTeam, awayTeam }) => {
  // Combine the stats for both teams
  const combinedStats = {
    PTS: homeTeam.players.reduce((total, player) => total + player.points, 0) +
      awayTeam.players.reduce((total, player) => total + player.points, 0),
    AST: homeTeam.players.reduce((total, player) => total + player.assists, 0) +
      awayTeam.players.reduce((total, player) => total + player.assists, 0),
    REB: homeTeam.players.reduce((total, player) => total + player.rebounds, 0) +
      awayTeam.players.reduce((total, player) => total + player.rebounds, 0),
    STL: homeTeam.players.reduce((total, player) => total + player.steals, 0) +
      awayTeam.players.reduce((total, player) => total + player.steals, 0),
    PF: homeTeam.players.reduce((total, player) => total + player.fouls, 0) +
      awayTeam.players.reduce((total, player) => total + player.fouls, 0),
    BLK: homeTeam.players.reduce((total, player) => total + player.blocks, 0) +
      awayTeam.players.reduce((total, player) => total + player.blocks, 0),
    'FTM': homeTeam.players.reduce((total, player) => total + player.freeThrowsMade, 0) +
      awayTeam.players.reduce((total, player) => total + player.freeThrowsMade, 0),
    'FTA': homeTeam.players.reduce((total, player) => total + player.freeThrowsMissed, 0) +
      awayTeam.players.reduce((total, player) => total + player.freeThrowsMissed, 0),
    '2PTM': homeTeam.players.reduce((total, player) => total + player.twoPointFieldGoalsMade, 0) +
      awayTeam.players.reduce((total, player) => total + player.twoPointFieldGoalsMade, 0),
    '2PTA': homeTeam.players.reduce((total, player) => total + player.twoPointFieldGoalsMissed, 0) +
      awayTeam.players.reduce((total, player) => total + player.twoPointFieldGoalsMissed, 0),
    '3PTM': homeTeam.players.reduce((total, player) => total + player.threePointFieldGoalsMade, 0) +
      awayTeam.players.reduce((total, player) => total + player.threePointFieldGoalsMade, 0),
    '3PTA': homeTeam.players.reduce((total, player) => total + player.threePointFieldGoalsMissed, 0) +
      awayTeam.players.reduce((total, player) => total + player.threePointFieldGoalsMissed, 0),
    TOV: homeTeam.players.reduce((total, player) => total + player.turnovers, 0) +
      awayTeam.players.reduce((total, player) => total + player.turnovers, 0),
  };

  const statCategories = Object.keys(combinedStats);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            {statCategories.map((category) => (
              <th key={category}>{category}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            {statCategories.map((category) => (
              <td key={category}>{combinedStats[category]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const BoxScoreModal = ({ isOpen, closeModal, data }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal modal__box-score" onClick={(e) => e.stopPropagation()}>
        <h2>Box Score</h2>
        <button className="button modal--box-score__close-button" onClick={closeModal}>
          Close
        </button>
        <div className="modal--box-score__stats">
          <div className="modal--box-score__stats-home">
            <h3>{data?.homeTeam?.name}</h3>
            <TeamTable team={data.homeTeam} />
          </div>
          <div className="modal--box-score__stats-away">
            <h3>{data?.awayTeam?.name}</h3>
            <TeamTable team={data.awayTeam} />
          </div>
          <CombinedTotals homeTeam={data.homeTeam} awayTeam={data.awayTeam} />
        </div>
      </div>
    </div>
  );
};

export default BoxScoreModal;
