import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import RedeemOutlinedIcon from "@mui/icons-material/RedeemOutlined";
import HouseSidingOutlinedIcon from "@mui/icons-material/HouseSidingOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";

export const transactions = [
  {
    date: "Sun Dec 11 2022 13:46:10 GMT+0100 (West Africa Standard Time)",
    category: "Business",
    type: "Income",
    amount: 73500,
    note: "Note",
  },
  {
    date: "Sun Dec 11 2022 13:46:10 GMT+0100 (West Africa Standard Time)",
    category: "Travel",
    type: "Expenses",
    amount: 73500,
    note: "Note",
  },
  {
    date: "Sun Dec 11 2022 13:46:10 GMT+0100 (West Africa Standard Time)",
    category: "Salary",
    type: "Income",
    amount: 250500,
    note: "Note",
  },
  {
    date: "Sun Dec 11 2022 13:46:10 GMT+0100 (West Africa Standard Time)",
    category: "Bills",
    type: "Expenses",
    amount: 150500,
    note: "Note",
  },
  {
    date: "Sun Dec 11 2022 13:46:10 GMT+0100 (West Africa Standard Time)",
    category: "Savings",
    type: "Income",
    amount: 120500,
    note: "Note",
  },
  {
    date: "Sun Dec 11 2022 13:46:10 GMT+0100 (West Africa Standard Time)",
    category: "Housing",
    type: "Income",
    amount: 220500,
    note: "Note",
  },
  {
    date: "Sun Dec 11 2022 13:46:10 GMT+0100 (West Africa Standard Time)",
    category: "Shopping",
    type: "Income",
    amount: 123500,
    note: "Note",
  },
];

export const incomeList = [
  { name: "Business", Icon: CorporateFareIcon, type: "Income" },
  { name: "Investments", Icon: StoreOutlinedIcon, type: "Income" },
  { name: "Extra Income", Icon: LocalAtmOutlinedIcon, type: "Income" },
  { name: "Deposits", Icon: CreditCardOutlinedIcon, type: "Income" },
  { name: "House", Icon: HomeOutlinedIcon, type: "Income" },
  { name: "Lottery", Icon: PaidOutlinedIcon, type: "Income" },
  { name: "Gifts", Icon: RedeemOutlinedIcon, type: "Income" },
  { name: "Salary", Icon: PaidOutlinedIcon, type: "Income" },
  { name: "Savings", Icon: PaidOutlinedIcon, type: "Income" },
  { name: "Rental", Icon: HouseSidingOutlinedIcon, type: "Income" },
  { name: "Others", Icon: CurrencyExchangeOutlinedIcon, type: "Income" },
];

export const expensesList = [
  { name: "Bills", Icon: ReceiptLongOutlinedIcon, type: "Expenses" },
  { name: "Car", Icon: DirectionsCarFilledOutlinedIcon, type: "Expenses" },
  { name: "Clothes", Icon: CheckroomOutlinedIcon, type: "Expenses" },
  { name: "Travel", Icon: FlightOutlinedIcon, type: "Expenses" },
  { name: "Food", Icon: LunchDiningOutlinedIcon, type: "Expenses" },
  { name: "Shopping", Icon: ShoppingBagOutlinedIcon, type: "Expenses" },
  { name: "Housing", Icon: HomeOutlinedIcon, type: "Expenses" },
  { name: "Entertainment", Icon: LiquorOutlinedIcon, type: "Expenses" },
  { name: "Phone", Icon: SmartphoneOutlinedIcon, type: "Expenses" },
  { name: "Pets", Icon: PetsOutlinedIcon, type: "Expenses" },
  { name: "Others", Icon: CurrencyExchangeOutlinedIcon, type: "Expenses" },
];

export const colors = [
  "#219ebc",
  "#9d0208",
  "#005f73",
  "#00afb9",
  "#3a86ff",
  "#8338ec",
  "#226f54",
  "#fee440",
  "#000075",
  "#800000",
  "#9A6324",
  "#808000",
  "#e6194B",
  "#f58231",
  "#ffe119",
  "#bfef45",
  "#3cb44b",
  "#469990",
  "#4363d8",
  "#911eb4",
  "#f032e6",
  "#dcbeff",
  "a9a9a9",
];

export const currencies = [
  { name: "Nigerian Naira", code: "NGN", symbol: "₦" },
  { name: "British Pound Sterling", code: "GBP", symbol: "£" },
  { name: "European Euro", code: "EUR", symbol: "€" },
  { name: "US Dollar", code: "USD", symbol: "$" },
];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
