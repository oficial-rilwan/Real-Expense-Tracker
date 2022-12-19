import Layout from "../../components/layout";
import styles from "./styles/styles.module.css";
import { expensesList, incomeList } from "../../static";
import { Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

import SectionTitle from "../../components/sectionTitle";

interface CategoryObject {
  name: string;
  type: string;
  Icon: any;
}

const Categories = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  return (
    <Layout>
      <main>
        <div className="section_title">
          <div className="icon_wrapper">
            <CategoryOutlinedIcon className="icon" />
          </div>
          {SectionTitle(path)}
        </div>
        <div style={{ padding: 16 }} className={styles._categories_grid}>
          <Paper className={`paper ${styles._paper}`}>
            <div className={styles._categories_table}>
              <div className={styles.header}>
                <div>Category</div>
                <div>Type</div>
              </div>
              {incomeList?.map(({ name, type }: CategoryObject, index) => (
                <div key={index} className={styles.content}>
                  <div>{name}</div>
                  <div style={{ background: "#07df77" }}>{type}</div>
                </div>
              ))}
            </div>
          </Paper>
          <Paper className={`paper ${styles._paper}`}>
            <div className={styles._categories_table}>
              <div className={styles.header}>
                <div>Category</div>
                <div>Type</div>
              </div>
              {expensesList?.map(({ name, type }: CategoryObject, index) => (
                <div key={index} className={styles.content}>
                  <div>{name}</div>
                  <div style={{ background: "#fa2c2c" }}>{type}</div>
                </div>
              ))}
            </div>
          </Paper>
        </div>
      </main>
    </Layout>
  );
};

export default Categories;
