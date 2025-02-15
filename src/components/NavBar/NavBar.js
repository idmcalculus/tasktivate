import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import styles from "./NavBar.module.scss";
import { AuthContext } from "../../AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.navbarLogo}>
          <Zap className={styles.icon} />
          Tasktivate
        </Link>
        <ul className={styles.navbarLinks}>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/tasks" className={styles.navbarLink}>
                  Tasks
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className={`${styles.navbarLink} ${styles.btn}`}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={styles.navbarLink}>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`${styles.navbarLink} ${styles.btn}`}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
