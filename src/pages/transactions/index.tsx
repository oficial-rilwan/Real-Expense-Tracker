import {
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/layout";
import SectionTitle from "../../components/sectionTitle";
import { transactions } from "../../static";
import categoryColor from "../../utils/categoryColor";
import formatAmount from "../../utils/formatAmount";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import styles from "./styles/styles.module.css";
import AddTransaction from "./components/addNew";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import AppsIcon from "@mui/icons-material/Apps";

interface Transaction {
  date: Date;
  category: string;
  type: string;
  amount: number;
  note: string;
}

const Transactions = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const [open, setOpen] = useState(false);
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
              <button onClick={() => setOpen(true)}>Add new</button>
            </div>
            <div className={styles._filters}>
              <div className={styles.input_field}>
                <label>Show:</label>
                <Select style={{ width: 100 }} size="small" value="">
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="25">25</MenuItem>
                  <MenuItem value="50">50</MenuItem>
                  <MenuItem value="100">100</MenuItem>
                </Select>
              </div>
              <div className={styles.input_field}>
                <label>Search:</label>
                <TextField
                  className={styles.input}
                  style={{ width: 220 }}
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
            </div>
            <div className={styles._categories_table}>
              <div className={styles.header}>
                <div>#</div>
                <div>Type</div>
                <div>Category</div>
                <div>Date</div>
                <div>Amount</div>
                <div>Action</div>
              </div>
              {transactions?.map((item, index) => (
                <div
                  style={{
                    background: index % 2 === 0 ? "#f7f7f7" : "#fff",
                  }}
                  key={index}
                  className={styles.content}
                >
                  <div>#{index + 100}</div>
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
                  <div>{item?.category}</div>

                  <div>{moment(item?.date).format("MMM D, YYYY")}</div>
                  <div>{formatAmount(item?.amount)}</div>
                  <div>
                    <button>
                      <AppsIcon className={styles._icon} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles._footer}>
              <div>Showing 1 to 10 of 57 entries</div>
              <div>
                <Pagination
                  count={10}
                  shape="rounded"
                  variant="outlined"
                  color="primary"
                />
              </div>
            </div>
          </Paper>
        </div>
        <AddTransaction open={open} close={() => setOpen(false)} />
      </main>
    </Layout>
  );
};

export default Transactions;
