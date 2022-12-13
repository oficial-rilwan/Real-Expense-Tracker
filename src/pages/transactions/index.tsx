import { Paper } from "@mui/material";
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
      <main style={{ padding: 16 }}>
        <div className={styles.sectionTitle}>{SectionTitle(path)}</div>
        <div className={styles._add_new}>
          <button onClick={() => setOpen(true)}>Add new transaction</button>
        </div>
        <Paper className={styles._paper}>
          <div className={styles._categories_table}>
            <div className={styles.header}>
              <div>Category</div>
              <div>Type</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Actions</div>
            </div>
            {transactions?.map((item, index) => (
              <div
                style={{
                  borderLeft: `4px solid ${categoryColor(item?.category)}`,
                }}
                key={index}
                className={styles.content}
              >
                <div>{item?.category}</div>
                <div
                  style={{
                    background: item?.type === "Income" ? "#07df77" : "#fa2c2c",
                  }}
                >
                  {item?.type}
                </div>
                <div>{moment(item?.date).format("MMM D, YYYY")}</div>
                <div>{formatAmount(item?.amount)}</div>
                <div>
                  <ModeEditOutlineOutlinedIcon
                    className={`${styles._icon} ${styles._edit}`}
                  />
                  <DeleteForeverOutlinedIcon
                    className={`${styles._icon} ${styles._delete}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Paper>
        <AddTransaction open={open} close={() => setOpen(false)} />
      </main>
    </Layout>
  );
};

export default Transactions;
