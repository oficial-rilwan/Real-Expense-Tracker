import { expensesList, incomeList, colors } from "../static";

export default function (category: any = "") {
  let color = "";
  const expenses = expensesList.map((item) => item?.name);
  const income = incomeList.map((item) => item?.name);
  const categories = [...expenses, ...income];
  let categoryIndex = categories.indexOf(category);
  color = colors[categoryIndex];
  return color;
}
