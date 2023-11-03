import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import React, { useEffect, useState } from 'react';

const Home = () => {
  let navigate = useNavigate();
  const { state, dispatch } = useGlobalContext();
  const [liveGames, setLiveGames] = useState([]);
  const [previousGames, setPreviousGames] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('games');

    if (storedData) {
      const games = JSON.parse(storedData);

      const liveGames = games?.filter(game => !game.completed);
      const completedGames = games?.filter(game => game.completed);

      setLiveGames(liveGames);
      setPreviousGames(completedGames);
    }
  }, []);

  const handleListItemClick = (game) => {
    dispatch({ type: 'SET_CURRENT_GAME_DATA', payload: game });
    navigate('/scoreboard');
  };

  if (!state.user) {
    return (
      <div className={`page--home ${state.user ? null : "center"}`}>
        <h3>Player Sports Network</h3>
      </div>
    );
  }

  return (
    <div className="page--home">
      <section className="games">
        <div className="games--live">
          <h3>Live Games</h3>
          {
            liveGames?.length > 0
              ? (<ul>
                {liveGames?.map((game, index) => (
                  <li
                    key={index}
                    onClick={() => handleListItemClick(game)}>
                    {game?.homeTeam?.name} {game?.homeTeam?.score} vs. {game?.awayTeam?.name} {game?.awayTeam?.score}
                  </li>
                ))}
              </ul>)
              : (<>
                <p>There are no live games being played.</p>
              </>)
          }
        </div>
        <div className="games--previous">
          <h3>Previous Games</h3>
          {
            previousGames?.length > 0
              ? (<ul>
                {previousGames?.map((game, index) => (
                  <li key={index}>{game?.homeTeam?.name} {game?.homeTeam?.score} vs. {game?.awayTeam?.name} {game?.awayTeam?.score}</li>
                ))}
              </ul>)
              : (<>
                <p>There are no previous games recorded.</p>
                <p>Click the New Game button to get tracking!</p>
              </>)
          }
        </div>
      </section>
    </div>
  );
};

export default Home;
