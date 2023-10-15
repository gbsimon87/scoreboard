import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeTeamData, setHomeTeamData] = useState([]);
  const [awayTeamData, setAwayTeamData] = useState([]);

  const data = {
    homeTeam: [
      {
          "name": "LeBron James",
          "position": "SF",
          "fouls": 2,
          "number": 23,
          "points": 17,
          "assists": 2,
          "rebounds": 5,
          "steals": 5,
          "blocks": 3,
          "threePoints": 2,
          "turnovers": 5,
          "freethrows": 4,
          "id": "39xmuqkxk4clnqqs7ix"
      },
      {
          "name": "Stephen Curry",
          "position": "PG",
          "fouls": 2,
          "number": 30,
          "points": 23,
          "assists": 4,
          "rebounds": 6,
          "steals": 2,
          "blocks": 2,
          "threePoints": 0,
          "turnovers": 2,
          "freethrows": 1,
          "id": "gb7ydtigd4lnqqs7ix"
      },
      {
          "name": "Kevin Durant",
          "position": "SF",
          "fouls": 2,
          "number": 7,
          "points": 10,
          "assists": 5,
          "rebounds": 14,
          "steals": 2,
          "blocks": 1,
          "threePoints": 0,
          "turnovers": 5,
          "freethrows": 0,
          "id": "ymak992ltwrlnqqs7ix"
      },
      {
          "name": "Kawhi Leonard",
          "position": "SF",
          "fouls": 2,
          "number": 2,
          "points": 30,
          "assists": 4,
          "rebounds": 14,
          "steals": 1,
          "blocks": 4,
          "threePoints": 5,
          "turnovers": 1,
          "freethrows": 3,
          "id": "lz1g3t93jcmlnqqs7ix"
      },
      {
          "name": "Giannis Antetokounmpo",
          "position": "PF",
          "fouls": 2,
          "number": 34,
          "points": 12,
          "assists": 8,
          "rebounds": 11,
          "steals": 5,
          "blocks": 1,
          "threePoints": 2,
          "turnovers": 2,
          "freethrows": 1,
          "id": "cjl6qmx7b1llnqqs7ix"
      },
      {
          "name": "Joel Embiid",
          "position": "C",
          "fouls": 2,
          "number": 21,
          "points": 11,
          "assists": 9,
          "rebounds": 11,
          "steals": 2,
          "blocks": 3,
          "threePoints": 5,
          "turnovers": 2,
          "freethrows": 8,
          "id": "8vowaq04s5wlnqqs7ix"
      },
      {
          "name": "Luka Dončić",
          "position": "PG",
          "fouls": 2,
          "number": 77,
          "points": 29,
          "assists": 8,
          "rebounds": 9,
          "steals": 4,
          "blocks": 4,
          "threePoints": 4,
          "turnovers": 1,
          "freethrows": 10,
          "id": "drmeo6duvvllnqqs7ix"
      },
      {
          "name": "Damian Lillard",
          "position": "PG",
          "fouls": 2,
          "number": 0,
          "points": 24,
          "assists": 7,
          "rebounds": 14,
          "steals": 5,
          "blocks": 3,
          "threePoints": 1,
          "turnovers": 1,
          "freethrows": 9,
          "id": "uw822n4fhulnqqs7ix"
      },
      {
          "name": "Anthony Davis",
          "position": "PF",
          "fouls": 2,
          "number": 3,
          "points": 18,
          "assists": 6,
          "rebounds": 13,
          "steals": 1,
          "blocks": 3,
          "threePoints": 3,
          "turnovers": 1,
          "freethrows": 1,
          "id": "763ns4mfxqlnqqs7ix"
      },
      {
          "name": "Nikola Jokić",
          "position": "C",
          "fouls": 2,
          "number": 15,
          "points": 15,
          "assists": 3,
          "rebounds": 11,
          "steals": 4,
          "blocks": 3,
          "threePoints": 3,
          "turnovers": 4,
          "freethrows": 8,
          "id": "2ff56g22pjlnqqs7ix"
      }
    ],
    awayTeam: [
      {
          "name": "Michael Jordan",
          "position": "SG",
          "fouls": 2,
          "number": 23,
          "points": 20,
          "assists": 2,
          "rebounds": 12,
          "steals": 1,
          "blocks": 2,
          "threePoints": 2,
          "turnovers": 3,
          "freethrows": 8,
          "id": "3bb8fxm9bt4lnqqtn5t"
      },
      {
          "name": "Magic Johnson",
          "position": "PG",
          "fouls": 2,
          "number": 32,
          "points": 11,
          "assists": 9,
          "rebounds": 7,
          "steals": 2,
          "blocks": 2,
          "threePoints": 0,
          "turnovers": 5,
          "freethrows": 5,
          "id": "cdswbeatc6lnqqtn5t"
      },
      {
          "name": "Larry Bird",
          "position": "SF",
          "fouls": 2,
          "number": 33,
          "points": 24,
          "assists": 5,
          "rebounds": 10,
          "steals": 5,
          "blocks": 3,
          "threePoints": 0,
          "turnovers": 5,
          "freethrows": 6,
          "id": "6s76uq0598dlnqqtn5t"
      },
      {
          "name": "Kobe Bryant",
          "position": "SG",
          "fouls": 2,
          "number": 24,
          "points": 11,
          "assists": 9,
          "rebounds": 12,
          "steals": 5,
          "blocks": 3,
          "threePoints": 0,
          "turnovers": 3,
          "freethrows": 8,
          "id": "tjbl16xzkkclnqqtn5t"
      },
      {
          "name": "Tim Duncan",
          "position": "PF",
          "fouls": 2,
          "number": 21,
          "points": 25,
          "assists": 8,
          "rebounds": 7,
          "steals": 1,
          "blocks": 5,
          "threePoints": 0,
          "turnovers": 4,
          "freethrows": 3,
          "id": "alla44whb26lnqqtn5t"
      },
      {
          "name": "Hakeem Olajuwon",
          "position": "C",
          "fouls": 2,
          "number": 34,
          "points": 18,
          "assists": 10,
          "rebounds": 12,
          "steals": 2,
          "blocks": 4,
          "threePoints": 1,
          "turnovers": 3,
          "freethrows": 9,
          "id": "lk5gitw32qllnqqtn5t"
      },
      {
          "name": "Shaquille O'Neal",
          "position": "C",
          "fouls": 2,
          "number": 32,
          "points": 15,
          "assists": 8,
          "rebounds": 7,
          "steals": 5,
          "blocks": 2,
          "threePoints": 1,
          "turnovers": 5,
          "freethrows": 4,
          "id": "1aphn8q2ikmlnqqtn5t"
      },
      {
          "name": "Kareem Abdul-Jabbar",
          "position": "C",
          "fouls": 2,
          "number": 33,
          "points": 14,
          "assists": 3,
          "rebounds": 9,
          "steals": 4,
          "blocks": 1,
          "threePoints": 3,
          "turnovers": 4,
          "freethrows": 7,
          "id": "8gojp2ydp9llnqqtn5t"
      },
      {
          "name": "Charles Barkley",
          "position": "PF",
          "fouls": 2,
          "number": 34,
          "points": 18,
          "assists": 8,
          "rebounds": 15,
          "steals": 3,
          "blocks": 4,
          "threePoints": 1,
          "turnovers": 2,
          "freethrows": 10,
          "id": "5q1dlfb0cqxlnqqtn5t"
      },
      {
          "name": "Clyde Drexler",
          "position": "SG",
          "fouls": 2,
          "number": 22,
          "points": 12,
          "assists": 10,
          "rebounds": 5,
          "steals": 2,
          "blocks": 2,
          "threePoints": 2,
          "turnovers": 5,
          "freethrows": 2,
          "id": "vwnkm3lgzblnqqtn5t"
      }
    ]
  }

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

    const currentSelectedPlayerID = selectedPlayer.player.id;

    if (selectedPlayer.location === "home") {
      if (actionType === "twoPoints") {
        setHomeTeamData((homeTeamData) =>
          homeTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, points: player["points"] + 2 } : player
          )
        );
      }
      
      if (actionType === "assists") {
        setHomeTeamData((homeTeamData) =>
          homeTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, assists: player["assists"] + 1 } : player
          )
        );
      }
      
      if (actionType === "rebounds") {
        setHomeTeamData((homeTeamData) =>
          homeTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, rebounds: player["rebounds"] + 1 } : player
          )
        );
      }
      
      if (actionType === "steals") {
        setHomeTeamData((homeTeamData) =>
          homeTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, steals: player["steals"] + 1 } : player
          )
        );
      }
      
      if (actionType === "blocks") {
        setHomeTeamData((homeTeamData) =>
          homeTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, blocks: player["blocks"] + 1 } : player
          )
        );
      }
      
      if (actionType === "threePoints") {
        console.log('is three points')

        setHomeTeamData((homeTeamData) =>
          homeTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, threePoints: player["threePoints"] + 1, points: player["points"] + 3 } : player
          )
        );
      }
      
      if (actionType === "turnovers") {
        setHomeTeamData((homeTeamData) =>
          homeTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, turnovers: player["turnovers"] + 1 } : player
          )
        );
      }
      
      if (actionType === "freethrows") {
        setHomeTeamData((homeTeamData) =>
          homeTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, freethrows: player["freethrows"] + 1 } : player
          )
        );
      }
      
      if (actionType === "fouls") {
        setHomeTeamData((homeTeamData) =>
          homeTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, fouls: player["fouls"] + 1 } : player
          )
        );
      }

      setSelectedPlayer({});
    }
    
    if (selectedPlayer.location === "away") {

      if (actionType === "twoPoints") {
        setAwayTeamData((awayTeamData) =>
          awayTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, points: player.points + 2 } : player
          )
        );
      }

      if (actionType === "assists") {
        setAwayTeamData((awayTeamData) =>
          awayTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, assists: player["assists"] + 1 } : player
          )
        );
      }

      if (actionType === "rebounds") {
        setAwayTeamData((awayTeamData) =>
          awayTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, rebounds: player["rebounds"] + 1 } : player
          )
        );
      }

      if (actionType === "steals") {
        setAwayTeamData((awayTeamData) =>
          awayTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, steals: player["steals"] + 1 } : player
          )
        );
      }
      
      if (actionType === "blocks") {
        setAwayTeamData((awayTeamData) =>
          awayTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, blocks: player["blocks"] + 1 } : player
          )
        );
      }
      
      if (actionType === "threePoints") {
        console.log('is three points')
        setAwayTeamData((awayTeamData) =>
          awayTeamData.map((player) =>
          player.id === currentSelectedPlayerID ? { ...player, threePoints: player["threePoints"] + 1, points: player["points"] + 3 } : player
          )
        );
      }
      
      if (actionType === "turnovers") {
        setAwayTeamData((awayTeamData) =>
          awayTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, turnovers: player["turnovers"] + 1 } : player
          )
        );
      }
      
      if (actionType === "freethrows") {
        setAwayTeamData((awayTeamData) =>
          awayTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, points: player["freethrows"] + 1 } : player
          )
        );
      }

      if (actionType === "fouls") {
        setAwayTeamData((awayTeamData) =>
          awayTeamData.map((player) =>
            player.id === currentSelectedPlayerID ? { ...player, fouls: player["fouls"] + 1 } : player
          )
        );
      }

      setSelectedPlayer({});
    }
    
  };

  useEffect(() => {
    console.log(selectedPlayer);
  
    return () => {
      console.log('exiting selectedPlayer useEffect');
    }
  }, [selectedPlayer])

  useEffect(() => {
    setHomeTeamData(data.homeTeam);
    setAwayTeamData(data.awayTeam);
  
    return () => {
      console.log('exiting CDM')
    }
  }, [])
  
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
