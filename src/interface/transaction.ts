export default interface Transaction {
  _id?: string;
  date: Date;
  category: string;
  type: string;
  amount: number;
  note: string;
}
