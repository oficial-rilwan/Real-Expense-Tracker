import React from "react";

const titles = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Welcome! You are exploring your financial dashboard",
  },
  categories: {
    title: "Categories",
    subtitle: "Manage all transaction categories",
  },
  transactions: {
    title: "Transactions",
    subtitle: "You can manage all your income and expenses here.",
  },
  report: {
    title: "Report",
    subtitle: "Welcome delve into the details of your finances",
  },
  settings: {
    title: "Settings",
    subtitle: "Update your username and manage your account",
  },
};

function SectionTitle(path: string = "") {
  switch (path) {
    case "":
      return (
        <React.Fragment>
          <p>{titles["dashboard"].title}</p>
          <small>{titles["dashboard"].subtitle}</small>
        </React.Fragment>
      );
    case "categories":
      return (
        <React.Fragment>
          <p>{titles["categories"].title}</p>
          <small>{titles["categories"].subtitle}</small>
        </React.Fragment>
      );
    case "transactions":
      return (
        <React.Fragment>
          <p>{titles["transactions"].title}</p>
          <small>{titles["transactions"].subtitle}</small>
        </React.Fragment>
      );
    case "report":
      return (
        <React.Fragment>
          <p>{titles["report"].title}</p>
          <small>{titles["report"].subtitle}</small>
        </React.Fragment>
      );
    case "settings":
      return (
        <React.Fragment>
          <p>{titles["settings"].title}</p>
          <small>{titles["settings"].subtitle}</small>
        </React.Fragment>
      );
  }
}

export default SectionTitle;
