import styles from "../styles/Header.module.css";
import facade from "../utils/apiFacade.js";
import { NavLink, useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();

  const [username, roles] = facade.getUserNameAndRoles();
  const loggedIn = facade.loggedIn();

  const logout = () => {
    facade.logout();
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {loggedIn && roles === "user" && (
          <div className={styles.protectedLeftSide}>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/registertimelog"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Register Timelog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/timelogs"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Timelogs
              </NavLink>
            </li>
          </div>
        )}
        {loggedIn && roles === "admin" && (
          <div className={styles.protectedLeftSide}>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/registeremployee"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Register Employee
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employees"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Employees
              </NavLink>
            </li>
          </div>
        )}
      </div>
      <div className={styles.rightSide}>
        <h4>Username: {username}</h4>
        <h4>Role: {roles}</h4>
        {!loggedIn ? (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Login
          </NavLink>
        ) : (
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
