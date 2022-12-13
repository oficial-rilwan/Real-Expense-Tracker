import React from "react";
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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import SectionTitle from "../../components/sectionTitle";
import { transactions } from "../../static";
import moment from "moment";
import formatAmount from "../../utils/formatAmount";
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

const Home = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const data = {
    labels: transactions?.map((item) => item?.category),
    datasets: [
      {
        // label: "# of Votes",
        data: transactions?.map((item) => item?.amount),
        backgroundColor: transactions?.map((item) =>
          categoryColor(item?.category)
        ),
        borderColor: transactions?.map((item) => categoryColor(item?.category)),
        borderWidth: 1,
      },
    ],
  };

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
  return (
    <Layout>
      <main>
        <div style={{ padding: "0 16px" }}>
          <div className={styles.sectionTitle}>{SectionTitle(path)}</div>
        </div>
        <div className={styles._stats}>
          <Paper className={styles.paper}>
            <div className={styles.cat_gp}>
              <div className={styles.title}>Income</div>
              <div className={styles.amount}>$23,000</div>
              <div className={`${styles._icon} ${styles.income}`}>
                <TrendingUpIcon className={styles.icon} />
              </div>
            </div>
          </Paper>

          <Paper className={styles.paper}>
            <div className={styles.cat_gp}>
              <div className={styles.title}>Expensed</div>
              <div className={styles.amount}>$23,000</div>
              <div className={`${styles._icon} ${styles.expenses}`}>
                <TrendingDownIcon className={styles.icon} />
              </div>
            </div>
          </Paper>

          <Paper className={styles.paper}>
            <div className={styles.cat_gp}>
              <div className={styles.title}>Net income</div>
              <div className={styles.amount}>$23,000</div>
              <div className={`${styles._icon} ${styles.net}`}>
                <LocalAtmIcon className={styles.icon} />
              </div>
            </div>
          </Paper>
        </div>
        <section style={{ padding: "0 16px" }}>
          <Grid style={{ marginBottom: 16 }} container spacing={2}>
            <Grid item xs={12} sm={12} md={5}>
              <Paper style={{ height: "100%" }}>
                <div className={styles._chart}>
                  <div className={styles.title}>Expense by categories</div>
                  <div className={styles.chart_wrapper}>
                    <Doughnut options={options} data={data} />
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Paper style={{ height: "100%" }}>
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
          <Grid style={{ marginBottom: 16 }} container spacing={2}>
            <Grid item xs={12} sm={12} md={7}>
              <Paper style={{ height: "100%" }}>
                <div className={styles._data_display}>
                  <div className={styles.title}>Recent Transactions</div>
                  <div className={styles._data}>
                    <div className={styles._header}>
                      <div>Category</div>
                      <div>Type</div>
                      <div>Date</div>
                      <div>Amount</div>
                    </div>
                    {transactions.map((item, index) => (
                      <div
                        style={{
                          borderLeft: `4px solid ${categoryColor(
                            item?.category
                          )}`,
                        }}
                        key={index}
                        className={styles._content}
                      >
                        <div>{item?.category}</div>
                        <div
                          style={{
                            background:
                              item?.type === "Income" ? "#07df77" : "#fa2c2c",
                          }}
                        >
                          {item?.type}
                        </div>
                        <div>{moment(item?.date).format("MMM D, YYYY")}</div>
                        <div>{formatAmount(item?.amount)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Paper style={{ height: "100%", display: "none" }}>
                <div className={styles._data_display}>Header</div>
              </Paper>
            </Grid>
          </Grid>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
