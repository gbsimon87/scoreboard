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
    currentGame: [],
    user: null
  };

  const reducer = (state, action) => {
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
        const updatedGame = action.payload; // Updated game data

        // Find the index of the game with the matching ID in the games array
        const gameIndex = state.games.findIndex((game) => game.id === updatedGame.id);

        if (gameIndex !== -1) {
          // Update the game in the games array
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
        const currentGame = action.payload;

        return {
          ...state,
          currentGame,
        };

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
