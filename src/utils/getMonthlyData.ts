import { months } from "../static";

export default function (transations: any) {
  const data = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: months.map((item: any) => {
          const transaction: any = transations[0]?.transactions?.find(
            (f: any) => f?.date === item
          );
          return transaction?.amount || 0;
        }),
        borderColor: "#3ac47d",
        backgroundColor: "#3ac47d",
      },
      {
        label: "Expenses",
        data: months.map((item: any) => {
          const transaction: any = transations[1]?.transactions?.find(
            (f: any) => f?.date === item
          );
          return transaction?.amount || 0;
        }),
        borderColor: "#e6194B",
        backgroundColor: "#e6194B",
      },
    ],
  };
  return data;
}
