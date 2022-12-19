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
    case "dashboard":
      return (
        <div className="content">
          <p>{titles["dashboard"].title}</p>
          <small>{titles["dashboard"].subtitle}</small>
        </div>
      );
    case "categories":
      return (
        <div className="content">
          <p>{titles["categories"].title}</p>
          <small>{titles["categories"].subtitle}</small>
        </div>
      );
    case "transactions":
      return (
        <div className="content">
          <p>{titles["transactions"].title}</p>
          <small>{titles["transactions"].subtitle}</small>
        </div>
      );
    case "report":
      return (
        <div className="content">
          <p>{titles["report"].title}</p>
          <small>{titles["report"].subtitle}</small>
        </div>
      );
    case "settings":
      return (
        <div className="content">
          <p>{titles["settings"].title}</p>
          <small>{titles["settings"].subtitle}</small>
        </div>
      );
  }
}

export default SectionTitle;
