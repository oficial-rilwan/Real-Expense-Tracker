import React from "react";
import Layout from "../../components/layout";
import styles from "./styles/styles.module.css";
import { expensesList, incomeList } from "../../static";
import { Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import SectionTitle from "../../components/sectionTitle";

interface CategoryObject {
  name: string;
  type: string;
}

const Categories = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  const incomeCategories = incomeList.map((item) => ({
    name: item,
    type: "Income",
  }));
  const expenseCategories = expensesList.map((item) => ({
    name: item,
    type: "Expenses",
  }));
  let allCategories: CategoryObject[] = [
    ...incomeCategories,
    ...expenseCategories,
  ].sort((a: any, b: any) => {
    return a?.name > b?.name ? 1 : -1;
  });

  return (
    <Layout>
      <main style={{ padding: 16 }}>
        <div className={styles.sectionTitle}>{SectionTitle(path)}</div>
        <Paper className={styles._paper}>
          <div className={styles._categories_table}>
            <div className={styles.header}>
              <div>Category</div>
              <div>Type</div>
            </div>
            {allCategories?.map((item: CategoryObject, index) => (
              <div key={index} className={styles.content}>
                <div>{item?.name}</div>
                <div
                  style={{
                    background: item?.type === "Income" ? "#07df77" : "#fa2c2c",
                  }}
                >
                  {item?.type}
                </div>
              </div>
            ))}
          </div>
        </Paper>
      </main>
    </Layout>
  );
};

export default Categories;
