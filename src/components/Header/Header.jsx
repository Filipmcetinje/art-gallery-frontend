import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ isLoggedIn, onLoginClick, onRegisterClick, onLogoutClick }) {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="header__title">
        <span className="header__title-art">Art</span>
        <span className="header__title-rest">Gallery Explorer</span>
      </Link>

      <nav className="header__nav">
        <Link
          to="/"
          className={`header__link ${
            location.pathname === "/" ? "header__link_active" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/collection"
          className={`header__link ${
            location.pathname === "/collection" ? "header__link_active" : ""
          }`}
        >
          Collection
        </Link>

        {isLoggedIn && (
          <>
            <Link
              to="/saved"
              className={`header__link ${
                location.pathname === "/saved" ? "header__link_active" : ""
              }`}
            >
              Saved
            </Link>

            <Link
              to="/profile"
              className={`header__link ${
                location.pathname === "/profile" ? "header__link_active" : ""
              }`}
            >
              Profile
            </Link>
          </>
        )}
      </nav>

      <div className="header__auth">
        {!isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__button"
              onClick={onLoginClick}
            >
              Log in
            </button>

            <button
              type="button"
              className="header__button"
              onClick={onRegisterClick}
            >
              Sign up
            </button>
          </>
        ) : (
          <button
            type="button"
            className="header__button"
            onClick={onLogoutClick}
          >
            Log out
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
