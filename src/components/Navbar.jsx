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

      <div className="logo">
        Chanakya University
      </div>

      <input
        type="text"
        placeholder="Search events..."
        className="search-box"
      />

      <div className="nav-links">

        <a href="#events">
          Explore Events
        </a>

        <a href="#schools">
          Schools
        </a>

        <a href="#gallery">
          Gallery
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

