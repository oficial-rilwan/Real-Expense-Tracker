import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import styles from "./styles/styles.module.css";

const Home = () => {
  const navigate = useNavigate();
  const { token, user, fetchingUser } = useContext(AuthContext);

  useEffect(() => {
    if (!token) navigate("/auth");
    else if (user) navigate("/dashboard");
  }, [user, token]);
  return (
    <div className={styles.loader}>
      {fetchingUser && <BeatLoader color="#3f6ad8" />}
    </div>
  );
};

export default Home;
