import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import FormNewTeam from "../components/FormNewTeam";
import NewScoreboard from "../components/NewScoreboard";
import FormNewGame from "../components/FormNewGame";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/create-game"
        element={<FormNewGame />}
      />
      <Route
        path="/create-team"
        element={<FormNewTeam />}
      />
      <Route
        path="/game/:id"
        element={
          <NewScoreboard />
        }
      />
    </Routes>
  )
}

export default AppRouter;
