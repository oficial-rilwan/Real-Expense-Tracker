import React, { useContext } from "react";
import { AuthContext } from "../context/auth";

const useCurrencyFormat = () => {
  const { user } = useContext(AuthContext);
  function formatAmount(amount: number | string) {
    let formatted;
    if (user?.currency) {
      formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: `${user?.currency}`,
      }).format(Number(amount));
    } else {
      formatted = new Intl.NumberFormat().format(Number(amount));
    }

    return formatted;
  }

  return { formatAmount };
};

export default useCurrencyFormat;
