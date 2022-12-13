import React from "react";
import { useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import styles from "../styles/styles.module.css";
import SectionTitle from "../sectionTitle";

const Header = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  return (
    <header className={styles.header}>
      <nav className={styles.nav_bar}>
        <div className="logo header_logo">
          <AccountBalanceIcon className="icon" />
          <span>RealExp</span>
        </div>
        <div className={styles.header_titles}>{SectionTitle(path)}</div>
        <div className={styles.user_info}>
          <Avatar src="" alt="Rilwan" className="user_avatar">
            RA
          </Avatar>
          <span>Rilwan</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
