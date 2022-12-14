import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const NotFound = () => {
  return (
    <div className={styles.not_found}>
      <div className={styles.img}>
        <img src="/assets/404.svg" alt="Page not found" />
      </div>
      <div className={styles._info}>
        <h2>Error 404!</h2>
        <Link to="/">Return Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
