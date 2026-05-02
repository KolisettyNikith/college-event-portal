import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import "../styles/login.css";

export default function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function handleSignup(e) {

    e.preventDefault();

    if (
      !email.endsWith("@gmail.com") &&
      !email.endsWith(
        "@chanakyauniversity.edu.in"
      )
    ) {

      alert("Use valid email");

      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        password,
      })
    );

    alert("Account Created");

    navigate("/login");
  }

  return (
    <div className="login-page">

      <div className="overlay"></div>

      <div className="login-box">

        <h1>Create Account</h1>

        <p>
          Join Chanakya University Events
        </p>

        <form onSubmit={handleSignup}>

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
            placeholder="Create Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            SIGNUP
          </button>

        </form>

        <div className="login-links">

          <Link to="/login">
            Already have account?
          </Link>

        </div>

      </div>

    </div>
  );
}