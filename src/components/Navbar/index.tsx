import React from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faBars, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav className={styles.pageHeader}>
      <div className={styles.headerLogo}>
        <img src="images/carma-logo.svg" />
      </div>
      <div className={styles.headerMenu}>
        <button className={styles.searchButton}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button className={styles.heartButton}>
          <FontAwesomeIcon icon={faHeart} className="text-blue-600" />
        </button>
        <button className={styles.userMenu}>
          <FontAwesomeIcon icon={faBars} className="text-blue-600" />
          <FontAwesomeIcon icon={faCar} className="text-blue-600" />
        </button>
      </div>
    </nav>
  );
}
