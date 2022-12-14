import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import styles from "./styles.module.css";
import SectionTitle from "../../../components/sectionTitle";
import Layout from "../../../components/layout";

interface SettingsLayoutProps {
  children: JSX.Element;
}
const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  return (
    <Layout>
      <div style={{ padding: 16 }} className={styles._layout}>
        <div className={styles.sectionTitle}>{SectionTitle(path)}</div>
        <div className={styles._aside}>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className={
              open
                ? styles._controls
                : `${styles._controls} ${styles._hide_border}`
            }
          >
            <p>General</p>
            {open ? (
              <CloseOutlinedIcon className={styles._icon} />
            ) : (
              <KeyboardArrowDownOutlinedIcon className={styles._icon} />
            )}
          </div>
          <ul className={open ? styles._active_list : ""}>
            <li>
              <Link
                to="/settings"
                className={pathname === "/settings" ? styles._active_link : ""}
              >
                <AccountBoxOutlinedIcon className={styles._icon} />{" "}
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings/account/edit"
                className={
                  pathname === "/settings/account/edit"
                    ? styles._active_link
                    : ""
                }
              >
                <EditOutlinedIcon className={styles._icon} />
                <span>Edit</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings/account/change-password"
                className={
                  pathname === "/settings/account/change-password"
                    ? styles._active_link
                    : ""
                }
              >
                <HttpsOutlinedIcon className={styles._icon} />
                <span>Change Password</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles._main}>{children}</div>
      </div>
    </Layout>
  );
};

export default SettingsLayout;
