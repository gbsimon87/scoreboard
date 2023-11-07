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
      <form className="form form--login" onSubmit={handleSubmit}>
        <input className="form__input" placeholder="Username" name="username" type="text" required />
        <div className="form__button-wrapper"> {/* Added BEM-style class here */}
          <button className="button form__button" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
