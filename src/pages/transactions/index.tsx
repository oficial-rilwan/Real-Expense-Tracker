import {
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/layout";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SectionTitle from "../../components/sectionTitle";
import formatAmount from "../../utils/formatAmount";
import styles from "./styles/styles.module.css";
import AddTransaction from "./components/addNew";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import { GlobalData } from "../../context/globalData";
import { expensesList, incomeList } from "../../static";
import { SectionLoader } from "../../components/sectionLoader";
import EmptyData from "../../components/feedback/Empty";
import ActionMenu from "../../components/action-menu";
import Transaction from "../../interface/transaction";
import DeleteDialog from "../../components/deleteDialog";

// interface Transaction {
//   date: Date;
//   category: string;
//   type: string;
//   amount: number;
//   note: string;
// }

const Transactions = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const { refresh, loading, transactions, getTransactions } =
    useContext(GlobalData);
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [queries, setQueries] = useState({
    page: 1,
    type: "",
    category: "",
  });

  useEffect(() => {
    getTransactions(queries);
  }, [refresh, queries?.page, queries?.type, queries?.category]);

  const categories = queries?.type === "Income" ? incomeList : expensesList;

  function clearFields() {
    setQueries((prev) => ({
      ...prev,
      type: "",
      category: "",
    }));
  }

  return (
    <Layout>
      <main>
        <div className="section_title">
          <div className="icon_wrapper">
            <AccountBalanceWalletOutlinedIcon className="icon" />
          </div>
          {SectionTitle(path)}
        </div>
        <div style={{ padding: 16 }}>
          <Paper className={styles._paper}>
            <div className={styles._table_title}>
              <div className={styles.title}>
                <AccountBalanceWalletOutlinedIcon className={styles.icon} />
                <span>Transactions</span>
              </div>
              <div className={styles._header_actions}>
                <button onClick={clearFields}>Clear filters</button>
                <button onClick={() => setOpen(true)}>Add new</button>
              </div>
            </div>
            <div className={styles._filters}>
              <div className={styles.input_field}>
                <TextField
                  className={styles.input}
                  placeholder="search"
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={styles.input_field}>
                <Select
                  fullWidth
                  size="small"
                  displayEmpty
                  value={queries.type}
                  onChange={(e) =>
                    setQueries((prev) => ({ ...prev, type: e.target.value }))
                  }
                >
                  <MenuItem value="">type</MenuItem>
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expenses">Expenses</MenuItem>
                </Select>
              </div>
              <div className={styles.input_field}>
                <Select
                  fullWidth
                  displayEmpty
                  size="small"
                  value={queries.category}
                  onChange={(e) =>
                    setQueries((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="">category</MenuItem>
                  {categories?.map((item, index) => (
                    <MenuItem key={index} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className={styles.input_field}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={new Date()}
                    onChange={(event) => console.log(event)}
                    renderInput={(params) => (
                      <TextField fullWidth size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className={styles._categories_table}>
              <div className={styles.header}>
                <div>Category</div>
                <div>Type</div>
                <div>Date</div>
                <div>Amount</div>
                <div>Action</div>
              </div>
              {loading ? (
                <SectionLoader />
              ) : transactions && transactions?.data?.length > 0 ? (
                <React.Fragment>
                  {transactions?.data?.map((item: any, index: number) => (
                    <div
                      style={{
                        background: index % 2 === 0 ? "#f7f7f7" : "#fff",
                      }}
                      key={index}
                      className={styles.content}
                    >
                      <div>{item?.category}</div>
                      <div>
                        <div
                          style={{
                            background:
                              item?.type === "Income" ? "#3ac47d" : "#d92550",
                          }}
                        >
                          {item?.type}
                        </div>
                      </div>

                      <div>{moment(item?.date).format("MMM D, YYYY")}</div>
                      <div>{formatAmount(item?.amount)}</div>
                      <div>
                        <button
                          onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setSelected(item);
                          }}
                        >
                          <AppsIcon className={styles._icon} />
                        </button>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ) : (
                !loading &&
                transactions &&
                transactions?.data?.length === 0 && <EmptyData />
              )}
            </div>
            <div className={styles._footer}>
              <div>{`Showing 1 to ${transactions?.data.length} of ${transactions?.totalDocs} entries`}</div>
              <div>
                <Pagination
                  onChange={(e, value) =>
                    setQueries((prev) => ({ ...prev, page: value }))
                  }
                  count={transactions?.pageSize}
                  shape="rounded"
                  variant="outlined"
                  color="primary"
                />
              </div>
            </div>
          </Paper>
        </div>
        <AddTransaction
          open={open}
          selected={selected}
          close={() => {
            setOpen(false);
            setTimeout(() => {
              setSelected(null);
            }, 300);
          }}
        />
        <ActionMenu
          anchorEl={anchorEl}
          handleClose={() => setAnchorEl(null)}
          handleDelete={() => setOpenDelete(true)}
          edit={() => setOpen(true)}
        />
        <DeleteDialog
          open={openDelete}
          close={() => {
            setOpenDelete(false);
            setTimeout(() => {
              setSelected(null);
            }, 300);
          }}
          id={selected?._id}
        />
      </main>
    </Layout>
  );
};

export default Transactions;
