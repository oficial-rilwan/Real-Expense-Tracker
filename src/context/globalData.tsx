import { createContext, useState } from "react";
import Transaction from "../interface/transaction";
import transactionService from "../service/transactionService";

interface TransactionsData {
  data: Transaction[];
  page: number;
  totalDocs: number;
  pageSize: number;
}

interface GlobalDataDetails {
  refresh: boolean;
  loading: boolean;
  dashboardData: any;
  transactions: TransactionsData | null;
  refreshData: () => void;
  getDashboardData: (req: any) => void;
  getTransactions: (queries: any) => void;
}

interface GlobalDataContextProp {
  children: JSX.Element;
}

export const GlobalData = createContext({} as GlobalDataDetails);

export const GlobalDataProvider = ({ children }: GlobalDataContextProp) => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [transactions, setTransactions] = useState<TransactionsData | null>(
    null
  );
  const [dashboardData, setDashboardData] = useState({
    recent: [],
    expByCategories: [],
    cashFlow: [],
    cashFlowMonthly: [],
  });

  async function getDashboardData(req: any) {
    try {
      if (!dashboardData.recent.length) setLoading(true);
      const res: any = await Promise.all(req);
      setDashboardData((prev) => ({
        ...prev,
        recent: res[0].data,
        expByCategories: res[1].data,
        cashFlow: res[2].data,
        cashFlowMonthly: res[3].data,
      }));
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  }

  async function getTransactions(queries: any) {
    try {
      setLoading(true);
      const { data } = await transactionService.getTransactions(queries);
      setTransactions(data);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  }

  return (
    <GlobalData.Provider
      value={{
        loading,
        refresh,
        transactions,
        dashboardData,
        refreshData: () => setRefresh((prev) => !prev),
        getDashboardData,
        getTransactions,
      }}
    >
      {children}
    </GlobalData.Provider>
  );
};
