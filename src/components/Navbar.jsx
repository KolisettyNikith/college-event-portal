import "../styles/navbar.css";

import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const user =
    localStorage.getItem("isLoggedIn");

  function logout() {

    localStorage.setItem(
      "isLoggedIn",
      "false"
    );

    alert("Logged Out");

    navigate("/login");
  }

  return (
    <nav className="navbar">

      <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
        Chanakya University
      </Link>

      <input
        type="text"
        placeholder="Search events..."
        className="search-box"
      />

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <a href="/#events">
          Explore Events
        </a>

        <a href="/#schools">
          Schools
        </a>


        {user === "true" ? (

          <button
            className="login-btn"
            onClick={logout}
          >
            LOGOUT
          </button>

        ) : (

          <Link
            to="/login"
            className="login-btn"
          >
            LOGIN
          </Link>

        )}

      </div>

    </nav>
  );
}