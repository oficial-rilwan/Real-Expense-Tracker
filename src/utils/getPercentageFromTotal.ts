export default function (amount: number, data: any) {
  const total = data.reduce((acc: number, curr: any) => acc + curr.amount, 0);
  let percentage = (amount / total) * 100;
  return `${Math.round(percentage)}%`;
}
