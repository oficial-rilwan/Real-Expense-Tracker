import React from "react";
import { Link, useLocation } from "react-router-dom";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import styles from "../styles/styles.module.css";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_links}>
        <ul>
          <li className={pathname.includes("dashboard") ? styles.active : ""}>
            <Link to="/dashboard">
              <DashboardOutlinedIcon className={styles.sidebar_icon} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={pathname.includes("categories") ? styles.active : ""}>
            <Link to="/categories">
              <CategoryOutlinedIcon className={styles.sidebar_icon} />
              <span>Categories</span>
            </Link>
          </li>
          <li
            className={pathname.includes("transactions") ? styles.active : ""}
          >
            <Link to="/transactions">
              <AccountBalanceWalletOutlinedIcon
                className={styles.sidebar_icon}
              />
              <span>Transactions</span>
            </Link>
          </li>
          <li className={pathname.includes("report") ? styles.active : ""}>
            <Link to="/report">
              <AssessmentOutlinedIcon className={styles.sidebar_icon} />
              <span>Reports</span>
            </Link>
          </li>
          <li className={pathname.includes("settings") ? styles.active : ""}>
            <Link to="/settings">
              <SettingsOutlinedIcon className={styles.sidebar_icon} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
