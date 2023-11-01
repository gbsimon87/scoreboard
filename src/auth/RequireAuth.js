import { Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const RequireAuth = ({ children }) => {
  const { state } = useGlobalContext();
  let location = useLocation();

  if (!state.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
