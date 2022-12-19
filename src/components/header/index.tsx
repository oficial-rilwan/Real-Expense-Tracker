import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import styles from "../styles/styles.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UserMenu from "../user-menu";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { AuthContext } from "../../context/auth";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav_bar}>
        <Link to="/" className="logo header_logo">
          <AccountBalanceIcon className="icon" />
          <span>RealExp</span>
        </Link>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className={styles.user_info}
            role="button"
          >
            <Avatar src="" alt="Rilwan" className="user_avatar">
              {user &&
                `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
            </Avatar>
            <span>{user && user?.firstName}</span>
            <KeyboardArrowDownIcon />
            <UserMenu open={open} />
          </div>
        </ClickAwayListener>
      </nav>
    </header>
  );
};

export default Header;
