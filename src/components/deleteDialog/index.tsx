import Dialog from "@mui/material/Dialog";
import { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { GlobalData } from "../../context/globalData";
import transactionService from "../../service/transactionService";
import styles from "./styles.module.css";

interface DeleteTransactionProps {
  open: boolean;
  id: string | undefined;
  close: () => void;
}

const DeleteDialog = ({ open, id, close }: DeleteTransactionProps) => {
  const { refreshData } = useContext(GlobalData);
  const [loading, setLoading] = useState(false);

  async function deleteTransaction() {
    try {
      setLoading(true);
      await transactionService.deleteOne(id);
      refreshData();
      setLoading(false);
      close();
    } catch (ex) {
      setLoading(false);
    }
  }
  return (
    <Dialog
      classes={{ paper: styles._dialog_paper }}
      open={open}
      //   onClose={close}
    >
      <div>
        <div className={styles.content}>
          <h4>You're about to delete this transaction</h4>
          <p>
            This transaction will be permanently removed and you won't be able
            to see it again.
          </p>
        </div>
        <div className={styles.footer}>
          <button onClick={close}>Cancel</button>
          {loading ? (
            <BeatLoader color="#3f6ad8" />
          ) : (
            <button onClick={deleteTransaction}>Delete</button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
