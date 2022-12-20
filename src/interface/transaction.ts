export default interface Transaction {
  date: Date;
  category: string;
  type: string;
  amount: number;
  note: string;
}
