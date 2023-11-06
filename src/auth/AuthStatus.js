import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const useAuth = () => {
  return React.useContext(AuthContext);
}

const AuthStatus = () => {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    // return <p>You are not logged in.</p>;
    return null;
  }

  // FOR THE MOMENT, RETUNING NULL UNTIL AUTH IS IMPLEMENTED
  return null;

  // return (
  //   <p>
  //     {console.log(auth)}
  //     Welcome {auth.user}!{" "}
  //     <button
  //       onClick={() => {
  //         auth.signout(() => navigate("/"));
  //       }}
  //     >
  //       Sign out
  //     </button>
  //   </p>
  // );
}

export default AuthStatus;
