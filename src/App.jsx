import { Route, Routes } from 'react-router-dom';
import RequireAuth from './auth/RequireAuth';
import Layout from './components/Layout/Layout';
import LoginPage from './components/Login/LoginPage';
import FormNewGame from './components/Forms/FormNewGame';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import './App.css';
import { GlobalProvider } from './context/GlobalContext';
import Scoreboard from './components/Scoreboard';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />              
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="scoreboard"
              element={
                <RequireAuth>
                  <Scoreboard />
                </RequireAuth>
              }
            />
            <Route
              path="new-game"
              element={
                <RequireAuth>
                  <FormNewGame />
                </RequireAuth>
              }
            />
          <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </GlobalProvider>
    </div>
  );
}

export default App;
