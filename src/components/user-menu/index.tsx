import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";

interface UserMenuProps {
  open: boolean;
}
const UserMenu = ({ open }: UserMenuProps) => {
  const { logoutUser, user } = useContext(AuthContext);

  return (
    <div
      id="user_menu"
      className={
        open ? `${styles.userMenu} ${styles.show}` : `${styles.userMenu}`
      }
    >
      <div className={styles.user_info}>
        <div className={styles.info}>
          <Avatar src="" alt="Rilwan" className="user_avatar">
            {user &&
              `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
          </Avatar>
          <div>
            <p>{user && `${user?.firstName} ${user?.lastName}`}</p>
            <small>{user && user?.email}</small>
          </div>
        </div>
        <button onClick={logoutUser}>Logout</button>
      </div>
      <div className={styles.links}>
        <div>My Account</div>
        <ul>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="*">Messages</Link>
          </li>
          <li>
            <Link to="*">Logs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
