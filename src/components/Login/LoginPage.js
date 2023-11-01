import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const LoginPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const { state, signin } = useGlobalContext();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (state.user) {
      navigate('/');
    }
  });

  // Check if the user is already authenticated
  if (!!state.user) {
    navigate("/");
    return null; // Return null to avoid rendering the login page
  }

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("username");

    signin(username, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div className="page page--login">
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
