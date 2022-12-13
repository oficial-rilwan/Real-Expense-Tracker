export default function (amount: number = 0) {
  let formatted = new Intl.NumberFormat().format(amount);
  return formatted;
}
