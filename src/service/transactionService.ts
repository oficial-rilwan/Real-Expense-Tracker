import httpService from "./httpService";

class TransactionService {
  create(data: any) {
    return httpService.post("/transaction", data);
  }
  getTransactions(queries: any) {
    return httpService.get(
      `transaction?page=${queries.page}&type=${queries.type}&category=${queries.category}`
    );
  }
  getRecent() {
    return httpService.get(`transaction/recent`);
  }
  getExpByCategory() {
    return httpService.get("/transaction/exp-by-category");
  }
  cashFlow() {
    return httpService.get("/transaction/cash-flow");
  }
  cashFlowMonthly() {
    return httpService.get("/transaction/cash-flow-monthly");
  }
  updateOne(id: string, data: any) {
    return httpService.put(`transaction/${id}`, data);
  }
  deleteOne(id: string) {
    return httpService.delete(`transaction/${id}`);
  }
}

export default new TransactionService();
