import { expensesList, incomeList, colors } from "../static";

export default function (category: any = "") {
  let color = "";
  const categories = [...expensesList, ...incomeList];
  let categoryIndex = categories.indexOf(category);
  color = colors[categoryIndex];
  return color;
}
