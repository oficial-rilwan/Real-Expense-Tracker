import styles from "./styles.module.css";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

interface ActionMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  handleDelete: () => void;
  edit: () => void;
}

const ActionMenu = ({
  anchorEl,
  handleClose,
  edit,
  handleDelete,
}: ActionMenuProps) => {
  return (
    <Paper className="paper">
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            edit();
          }}
          className={styles.menuItem}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleDelete();
          }}
          className={styles.menuItem2}
        >
          Delete
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default ActionMenu;
