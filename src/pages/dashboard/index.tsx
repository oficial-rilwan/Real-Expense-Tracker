import React, { useContext, useEffect, useState } from "react";
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
import AddTransaction from "../transactions/components/addNew";
import { AuthContext } from "../../context/auth";
import useCurrencyFormat from "../../hooks/useCurrencyFormat";
import categoryColor from "../../utils/categoryColor";
import transactionService from "../../service/transactionService";
import CategoryIcon from "../../components/categoryIcon";
import getPercentageFromTotal from "../../utils/getPercentageFromTotal";
import Loader from "../../components/sectionLoader";
import getMonthlyData from "../../utils/getMonthlyData";
import { GlobalData } from "../../context/globalData";
import EmptyData from "../../components/feedback/Empty";

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
  const { refresh, loading, dashboardData, getDashboardData } =
    useContext(GlobalData);
  const { formatAmount } = useCurrencyFormat();
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getDashboardData([
      transactionService.getRecent(),
      transactionService.getExpByCategory(),
      transactionService.cashFlow(),
      transactionService.cashFlowMonthly(),
    ]);
  }, [refresh]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
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
        {loading && <Loader />}
        {!loading && (
          <React.Fragment>
            <div className={styles._stats}>
              {dashboardData.cashFlow.map((item: any, index: number) => (
                <Paper className={"paper"} key={index}>
                  <div className={styles.cat_gp}>
                    <div className={styles.title}>{item?.name}</div>
                    <h2
                      style={{
                        color:
                          item?.name === "Income"
                            ? "#3ac47d"
                            : item?.name === "Expenses"
                            ? "#d92550"
                            : "#3f6ad8",
                      }}
                      className={styles.amount}
                    >
                      {formatAmount(item?.amount)}
                    </h2>
                    <div
                      className={
                        item?.name === "Income"
                          ? `${styles._icon} ${styles.income}`
                          : item?.name === "Expenses"
                          ? `${styles._icon} ${styles.expenses}`
                          : `${styles._icon} ${styles.net}`
                      }
                    >
                      {item?.name === "Income" ? (
                        <TrendingUpIcon className={styles.icon} />
                      ) : item?.name === "Expenses" ? (
                        <TrendingDownIcon className={styles.icon} />
                      ) : (
                        <LocalAtmIcon className={styles.icon} />
                      )}
                    </div>
                  </div>
                </Paper>
              ))}
            </div>
            <section style={{ padding: "0 16px" }}>
              <Grid style={{ marginBottom: 16 }} container spacing={2}>
                <Grid item xs={12} sm={12} md={5}>
                  <Paper className={"paper"}>
                    <div className={styles._data_display}>
                      <div className={styles._data}>
                        <div className={styles.title}>Recent Transactions</div>

                        {dashboardData?.recent?.length === 0 ? (
                          <EmptyData />
                        ) : (
                          <React.Fragment>
                            <div className={styles._header}>
                              <div>Category</div>
                              <div>Type</div>

                              <div>Amount</div>
                            </div>
                            <div>
                              {dashboardData.recent.map(
                                (item: any, index: number) => (
                                  <div
                                    style={{
                                      background:
                                        index % 2 === 0 ? "#f7f7f7" : "#fff",
                                    }}
                                    key={index}
                                    className={styles._content}
                                  >
                                    <div>{item?.category}</div>
                                    <div
                                      style={{
                                        background:
                                          item?.type === "Income"
                                            ? "#3ac47d"
                                            : "#d92550",
                                      }}
                                    >
                                      {item?.type}
                                    </div>

                                    <div>{formatAmount(item?.amount)}</div>
                                  </div>
                                )
                              )}
                            </div>
                            <div className={styles._footer}>
                              <Link to="/transactions">View All</Link>
                              <button onClick={() => setOpen(true)}>
                                Add New Transaction
                              </button>
                            </div>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={7}>
                  <Paper className={"paper"}>
                    <div className={styles._chart}>
                      <div className={styles.title}> Income and Expenses</div>
                      <div className={styles.chart_wrapper}>
                        <Line
                          options={options}
                          data={getMonthlyData(dashboardData.cashFlowMonthly)}
                        />
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
                      {dashboardData?.expByCategories?.length === 0 ? (
                        <EmptyData />
                      ) : (
                        <div className={styles.exps}>
                          {dashboardData?.expByCategories.map(
                            (item: any, index: number) => (
                              <div
                                style={{
                                  background: `${categoryColor(item?.name)}16`,
                                }}
                                key={index}
                                className={styles.item}
                              >
                                <div className={styles.info}>
                                  <CategoryIcon name={item?.name} />
                                  <div>
                                    <small>{item?.name}</small>
                                    <p>{formatAmount(item?.amount)}</p>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    color: categoryColor(item?.name),
                                    fontWeight: 700,
                                  }}
                                >
                                  {getPercentageFromTotal(
                                    item?.amount,
                                    dashboardData?.expByCategories
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </Paper>
                </div>
              </div>
            </section>
          </React.Fragment>
        )}

        <AddTransaction open={open} close={() => setOpen(false)} />
      </main>
    </Layout>
  );
};

export default Dashboard;
