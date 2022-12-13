import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import SettingsLayout from "./components/Layout";
import styles from "./styles/styles.module.css";

const Settings = () => {
  return (
    <Layout>
      <SettingsLayout>
        <div>
          <div className={styles._title}>Account Overview</div>
          <div className={styles._details_wrapper}>
            <div className={styles._details}>
              <div>First name</div>
              <div>Rilwan</div>
            </div>
            <div className={styles._details}>
              <div>Last name</div>
              <div>Aribidesi</div>
            </div>
            <div className={styles._details}>
              <div>Email</div>
              <div>rilwan@mail.com</div>
            </div>
            <div className={styles._details}>
              <div>Gender</div>
              <div>Male</div>
            </div>
            <div className={styles._details}>
              <div>Date of birth</div>
              <div>10 May, 1923</div>
            </div>
            <div className={styles._details}>
              <div>Country of region</div>
              <div>Nigeria</div>
            </div>
            <div className={styles._details}>
              <div>Preferred currency</div>
              <div>US Dollar</div>
            </div>
          </div>
          <div>
            <Link className={styles._edit_btn} to="">
              Edit Profile
            </Link>
          </div>
        </div>
      </SettingsLayout>
    </Layout>
  );
};

export default Settings;
