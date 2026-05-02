import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import "../styles/login.css";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function handleLogin(e) {

    e.preventDefault();

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (
      user &&
      user.email === email &&
      user.password === password
    ) {

      alert("Login Successful");

      navigate("/");

    } else {

      alert("Invalid Credentials");
    }
  }

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>Chanakya University</h1>

        <p>
          Login to continue exploring events
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            LOGIN
          </button>

        </form>

        <div className="login-links">

          <Link to="/signup">
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}