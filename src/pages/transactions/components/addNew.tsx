import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styles from "./styles.module.css";
import { expensesList, incomeList } from "../../../static";
import formatAmount from "../../../utils/formatAmount";
import InputNumberFormat from "../../../utils/InputNumberFormat";

interface AddTransactionProps {
  open: boolean;
  close: () => void;
}

interface CreateTransactionDto {
  date: Date | null;
  category: string;
  type: string;
  amount: string;
  note: string;
}

const AddTransaction = ({ open, close }: AddTransactionProps) => {
  const [values, setValues] = useState<CreateTransactionDto>({
    date: new Date(),
    category: "Income",
    type: "",
    amount: "",
    note: "",
  });

  const types = values.category === "Income" ? incomeList : expensesList;

  function handleChange(e: any) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <Dialog
      classes={{ paper: styles._dialog_paper }}
      open={open}
      onClose={close}
    >
      <header className={styles._dialog_header}>
        <div>Add Transaction</div>
        <div>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </div>
      </header>
      <div className={styles._dialog_body}>
        <div className={styles._input_field}>
          <label>
            Date: <span>*</span>
          </label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={values?.date}
              className={styles._input}
              onChange={(date) => {
                setValues((prev) => ({ ...prev, date }));
              }}
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className={styles._input_field}>
          <label>
            Category: <span>*</span>
          </label>
          <Select
            className={styles._input}
            value={values.category}
            fullWidth
            size="small"
            variant="outlined"
            name="category"
            onChange={handleChange}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expenses">Expenses</MenuItem>
          </Select>
        </div>
        <div className={styles._input_field}>
          <label>
            Type: <span>*</span>
          </label>
          <Select
            className={styles._input}
            value={values.type}
            fullWidth
            size="small"
            variant="outlined"
            name="type"
            onChange={handleChange}
          >
            {types?.map((item: string, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className={styles._input_field}>
          <label>
            Amount: <span>*</span>
          </label>
          <TextField
            className={styles._input}
            fullWidth
            value={values.amount}
            size="small"
            variant="outlined"
            name="amount"
            onChange={handleChange}
            InputProps={{
              inputComponent: InputNumberFormat,
            }}
          />
        </div>
        <div className={`${styles._input_field} ${styles._text_area}`}>
          <label>Note:</label>
          <TextField
            className={styles._input}
            fullWidth
            value={values.note}
            multiline
            rows={3}
            size="small"
            variant="outlined"
            name="note"
            onChange={handleChange}
          />
        </div>
        <div className={styles._btn_gp}>
          <button onClick={close}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddTransaction;
