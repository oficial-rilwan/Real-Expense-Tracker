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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { expensesList, incomeList } from "../../../static";
import InputNumberFormat from "../../../utils/InputNumberFormat";
import { transactionSchema } from "../../../utils/validation";
import MessageFeedback from "../../../components/feedback";

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
  const [error, setError] = useState("");
  const {
    reset,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateTransactionDto>({
    resolver: yupResolver(transactionSchema),
    defaultValues: {
      date: new Date(),
      category: "",
      type: "",
      amount: "",
      note: "",
    },
  });

  async function onSubmit(data: any) {
    console.log(data);
  }

  const types = watch("category") === "Income" ? incomeList : expensesList;

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
      <form className={styles._dialog_body} onSubmit={handleSubmit(onSubmit)}>
        {error && <MessageFeedback message={error} severity="error" />}
        <div className={styles._input_field}>
          <label>
            Date: <span>*</span>
          </label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  className={styles._input}
                  {...field}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      error={Boolean(errors?.date)}
                      size="small"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />

          {errors?.date && (
            <span className={styles.validationMessage}>
              {errors.date.message}
            </span>
          )}
        </div>
        <div className={styles._input_field}>
          <label>
            Category: <span>*</span>
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                className={styles._input}
                fullWidth
                size="small"
                variant="outlined"
                displayEmpty
                {...field}
                error={Boolean(errors?.category)}
              >
                <MenuItem value="">--select category --</MenuItem>
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expenses">Expenses</MenuItem>
              </Select>
            )}
          />

          {errors?.category && (
            <span className={styles.validationMessage}>
              {errors.category.message}
            </span>
          )}
        </div>
        <div className={styles._input_field}>
          <label>
            Type: <span>*</span>
          </label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                className={styles._input}
                fullWidth
                size="small"
                variant="outlined"
                displayEmpty
                {...field}
                error={Boolean(errors?.type)}
              >
                <MenuItem value="">-- select type --</MenuItem>
                {types?.map((item, index) => (
                  <MenuItem key={index} value={item?.name}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />

          {errors?.type && (
            <span className={styles.validationMessage}>
              {errors.type.message}
            </span>
          )}
        </div>
        <div className={styles._input_field}>
          <label>
            Amount: <span>*</span>
          </label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                className={styles._input}
                fullWidth
                {...field}
                size="small"
                variant="outlined"
                error={Boolean(errors?.amount)}
                InputProps={{
                  inputComponent: InputNumberFormat,
                }}
              />
            )}
          />

          {errors?.amount && (
            <span className={styles.validationMessage}>
              {errors.amount.message}
            </span>
          )}
        </div>
        <div className={`${styles._input_field} ${styles._text_area}`}>
          <label>Note:</label>
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField
                className={styles._input}
                fullWidth
                {...field}
                multiline
                rows={3}
                size="small"
                variant="outlined"
                error={Boolean(errors?.note)}
              />
            )}
          />
        </div>
        <div className={styles._btn_gp}>
          <button type="submit">Save</button>
          <button type="button" onClick={close}>
            Cancel
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddTransaction;
