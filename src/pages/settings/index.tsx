import moment from "moment";
import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import SettingsLayout from "./components/Layout";
import styles from "./styles/styles.module.css";

const Settings = () => {
  const { token, user } = useContext(AuthContext);

  if (!token) return <Navigate to="/" replace={true} />;
  return (
    <SettingsLayout>
      <div>
        <div className={styles._title}>Account Overview</div>
        <div className={styles._details_wrapper}>
          <div className={styles._details}>
            <div>First name</div>
            <div>{user && user?.firstName}</div>
          </div>
          <div className={styles._details}>
            <div>Last name</div>
            <div>{user && user?.lastName}</div>
          </div>
          <div className={styles._details}>
            <div>Email</div>
            <div>{user && user?.email}</div>
          </div>
          <div className={styles._details}>
            <div>Gender</div>
            <div>{user && user?.gender}</div>
          </div>
          <div className={styles._details}>
            <div>Date of birth</div>
            <div>
              {user && moment(user?.dateOfBirth).format("DD MMM, YYYY")}
            </div>
          </div>
          <div className={styles._details}>
            <div>Country of region</div>
            <div>{user && user?.country}</div>
          </div>
          <div className={styles._details}>
            <div>Preferred currency</div>
            <div>{user && user?.currency}</div>
          </div>
        </div>
        <div>
          <Link className={styles._edit_btn} to="/settings/account/edit">
            Edit Profile
          </Link>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default Settings;
