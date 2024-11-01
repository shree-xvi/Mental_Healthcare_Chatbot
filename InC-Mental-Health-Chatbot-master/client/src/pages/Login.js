import React, { useState, useContext } from "react";
import { loginData } from "../data/loginData";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Login() {
  const { state, dispatch } = useContext(UserContext);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const errors = {
    uname: "Invalid Username",
    pass: "Invalid Password"
  };
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = loginData.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        dispatch({ type: "USER", payload: true })
        setIsSubmitted(true);
        navigate("/newchatpage");
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="wrapper">
      {/* <div className="logo">
        <img src="https://images2.imgbox.com/e4/b4/H10WmipC_o.png" alt=""></img>
      </div> */}
      <div className="text-center mt-4 name">
        LOGIN
      </div>



      <form class="login" onSubmit={handleSubmit}>
        <div class="login__field">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
          <input type="text" class="login__input" placeholder="Username" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div class="login__field">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          </svg>
          <input type="password" class="login__input" placeholder="Password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <button className="btn mt-3">Login</button>
      </form>
    </div>
  );

  return (
    <div className="app">

      {renderForm}

    </div>
  );
}

export default Login;