import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import styles from "./NavBar.module.scss";
import { AuthContext } from "../../AuthContext";
import AboutModal from "./AboutModal"; // Import the modal

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* Logo */}
        <Link to="/" className={styles.navbarLogo}>
          <Zap className={styles.icon} />
          Tasktivate
        </Link>

        {/* Navigation Links */}
        <ul className={styles.navbarLinks}>
          <li>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`${styles.navbarLink} ${styles.aboutLink}`}
            >
              About
            </button>
          </li>
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

      {/* Render the modal if open */}
      {isModalOpen && <AboutModal onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
};

export default Navbar;