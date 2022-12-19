import React, { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Layout from "../../components/layout";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import styles from "./styles/styles.module.css";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { Link, Navigate, useLocation } from "react-router-dom";
import SectionTitle from "../../components/sectionTitle";
import { expensesList, transactions } from "../../static";
import CircularProgress from "@mui/material/CircularProgress";
import AddTransaction from "../transactions/components/addNew";
import { AuthContext } from "../../context/auth";
import useCurrencyFormat from "../../hooks/useCurrencyFormat";
import categoryColor from "../../utils/categoryColor";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const { formatAmount } = useCurrencyFormat();
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const [open, setOpen] = useState(false);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const data2 = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Expenses",
        data: [1000, 2000, 3000],
        borderColor: "#e6194B",
        backgroundColor: "#e6194B",
      },
      {
        label: "Income",
        data: [1700, 1600, 5000],
        borderColor: "#4363d8",
        backgroundColor: "#4363d8",
      },
    ],
  };
  if (!token) return <Navigate to="/" replace={true} />;

  return (
    <Layout>
      <main>
        <div className="section_title">
          <div className="icon_wrapper">
            <PieChartOutlineIcon className="icon" />
          </div>
          {SectionTitle(path)}
        </div>
        <div className={styles._stats}>
          <Paper className={"paper"}>
            <div className={styles.cat_gp}>
              <div className={styles.title}>Income</div>
              <h2 style={{ color: "#3ac47d" }} className={styles.amount}>
                {formatAmount(23000)}
              </h2>
              <div className={`${styles._icon} ${styles.income}`}>
                <TrendingUpIcon className={styles.icon} />
              </div>
            </div>
          </Paper>

          <Paper className={"paper"}>
            <div className={styles.cat_gp}>
              <div className={styles.title}>Expenses</div>
              <h2 style={{ color: "#d92550" }} className={styles.amount}>
                {formatAmount(43000)}
              </h2>
              <div className={`${styles._icon} ${styles.expenses}`}>
                <TrendingDownIcon className={styles.icon} />
              </div>
            </div>
          </Paper>

          <Paper className={"paper"}>
            <div className={styles.cat_gp}>
              <div className={styles.title}>Net income</div>
              <h2 style={{ color: "#3f6ad8" }} className={styles.amount}>
                {formatAmount(-20000)}
              </h2>
              <div className={`${styles._icon} ${styles.net}`}>
                <LocalAtmIcon className={styles.icon} />
              </div>
            </div>
          </Paper>
        </div>
        <section style={{ padding: "0 16px" }}>
          <Grid style={{ marginBottom: 16 }} container spacing={2}>
            <Grid item xs={12} sm={12} md={5}>
              <Paper className={"paper"}>
                <div className={styles._data_display}>
                  <div className={styles.title}>Recent Transactions</div>
                  <div className={styles._data}>
                    <div className={styles._header}>
                      <div>Category</div>
                      <div>Type</div>

                      <div>Amount</div>
                    </div>
                    {transactions.slice(0, 5).map((item, index) => (
                      <div
                        style={{
                          background: index % 2 === 0 ? "#f7f7f7" : "#fff",
                        }}
                        key={index}
                        className={styles._content}
                      >
                        <div>{item?.category}</div>
                        <div
                          style={{
                            background:
                              item?.type === "Income" ? "#3ac47d" : "#d92550",
                          }}
                        >
                          {item?.type}
                        </div>

                        <div>{formatAmount(item?.amount)}</div>
                      </div>
                    ))}
                    <div className={styles._footer}>
                      <Link to="/transactions">View All</Link>
                      <button onClick={() => setOpen(true)}>
                        Add New Transaction
                      </button>
                    </div>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Paper className={"paper"}>
                <div className={styles._chart}>
                  <div className={styles.title}> Income and Expenses</div>
                  <div className={styles.chart_wrapper}>
                    <Line options={options} data={data2} />
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </section>
        <section style={{ padding: "0 16px" }}>
          <div className={styles.exp_grid}>
            <div className={styles.exp_category}>
              <Paper className={"paper"}>
                <div className={styles.exp_categories}>
                  <div className={styles.title}>Expenses by category</div>
                  <div className={styles.exps}>
                    {expensesList.slice(0, 5).map(({ name, Icon }, index) => (
                      <div
                        style={{ background: `${categoryColor(name)}16` }}
                        key={index}
                        className={styles.item}
                      >
                        <div className={styles.info}>
                          <Icon style={{ color: categoryColor(name) }} />
                          <div>
                            <small>{name}</small>
                            <p>$120.00</p>
                          </div>
                        </div>
                        <div>40%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Paper>
            </div>
            <div></div>
          </div>
        </section>

        <AddTransaction open={open} close={() => setOpen(false)} />
      </main>
    </Layout>
  );
};

export default Dashboard;
