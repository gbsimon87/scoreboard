import React, { createContext, useContext, useReducer } from 'react';
import { fakeAuthProvider } from '../auth/fakeAuthProvider';

const GlobalContext = createContext();

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export const GlobalProvider = ({ children }) => {
  const initialState = {
    teams: [],
    players: [],
    games: [],
    currentGame: {},
    user: null
  };

  const reducer = (state, action) => {
    const currentGame = state.currentGame;

    switch (action.type) {
      case 'CREATE_GAME':
        const { id, homeTeam, awayTeam, completed } = action.payload;

        const gameData = {
          id,
          homeTeam,
          awayTeam,
          completed
        }

        return {
          ...state,
          games: [gameData, ...state.games],
          currentGame: gameData
        };

      case 'COMPLETE_GAME':
        const updatedGame = action.payload;

        const gameIndex = state.games.findIndex((game) => game.id === updatedGame.id);

        if (gameIndex !== -1) {
          const updatedGames = [...state.games];
          updatedGames[gameIndex] = updatedGame;

          return {
            ...state,
            currentGame: [],
            games: updatedGames,
          };
        }

        return state;

      case 'SET_CURRENT_GAME_DATA':
        const currentGameData = action.payload;

        return {
          ...state,
          currentGame: currentGameData
        };

      case 'UPDATE_PLAYER_STAT':
        const { actionType, selectedPlayer } = action.payload;

        if (currentGame) {
          const teamKey = selectedPlayer.location === 'home' ? 'homeTeam' : 'awayTeam';
          const teamToUpdate = currentGame[teamKey];

          if (teamToUpdate) {
            const updatedPlayers = teamToUpdate.players.map(player => {
              if (player.id === selectedPlayer.player.id) {
                let updatedPlayer = {
                  ...player,
                  [actionType]: player[actionType] + 1,
                };

                if (actionType === 'freeThrowsMade') {
                  updatedPlayer.points = updatedPlayer.points + 1;
                } else if (actionType === 'twoPointFieldGoalsMade') {
                  updatedPlayer.points = updatedPlayer.points + 2;
                } else if (actionType === 'threePointFieldGoalsMade') {
                  updatedPlayer.points = updatedPlayer.points + 3;
                }
                return updatedPlayer;
              } else {
                return player;
              }
            });

            const updatedTeam = { ...teamToUpdate, players: updatedPlayers };
            const updatedGame = {
              ...currentGame,
              [teamKey]: updatedTeam,
            };

            if (actionType === 'freeThrowsMade') {
              updatedGame[teamKey].score = updatedGame[teamKey].score + 1;
            }
            if (actionType === 'twoPointFieldGoalsMade') {
              updatedGame[teamKey].score = updatedGame[teamKey].score + 2;
            }
            if (actionType === 'threePointFieldGoalsMade') {
              updatedGame[teamKey].score = updatedGame[teamKey].score + 3;
            }

            return { ...state, currentGame: updatedGame };
          }
        }

        return state;

      // case 'RESET_CURRENT_GAME':
      //   return {
      //     ...state,
      //     currentGame: []
      //   };

      case 'SIGNIN':
        return {
          ...state,
          user: action.payload,
        };

      case 'SIGNOUT':
        return {
          teams: [],
          players: [],
          games: [],
          currentGame: [],
          user: null
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Authentication functions
  const signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      dispatch({ type: 'SIGNIN', payload: newUser });
      callback();
    });
  };

  const signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      dispatch({ type: 'SIGNOUT' });
      callback();
    });
  };

  return (
    <GlobalContext.Provider value={{ state, dispatch, signin, signout }}>
      {children}
    </GlobalContext.Provider>
  );
};
