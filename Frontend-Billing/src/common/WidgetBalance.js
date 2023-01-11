import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/dashboard.css";
import Card from "react-bootstrap/Card";
import ExpenseService from "../services/expense.service";
import IncomeService from "../services/income.service";

function WidgetBalance() {
  const username = useSelector((state) => {
    return state.auth.user.username;
  });
  const { month, year } = useSelector((state) => {
    return {
      month: state.date.month,
      year: state.date.year,
    };
  });
  const [monthlybalance, setMonthlybalance] = useState(0);
  const [monthlyincome, setMonthlyincome] = useState(0);
  const [monthlyexpense, setMonthlyexpense] = useState(0);

  const getTotalIncomeByMonth = (username, year, month) => {
    IncomeService.getIncomeByMonth(username, year, month).then((response) => {
      if (response[0].amounts) {
        setMonthlyincome(response[0].amounts);
      } else {
        setMonthlyincome(0);
      }
    });
  };

  const getTotalExpenseByMonth = (username, year, month) => {
    ExpenseService.getExpenseByMonth(username, year, month).then((response) => {
      if (response[0].amounts) {
        setMonthlyexpense(response[0].amounts);
      } else {
        setMonthlyexpense(0);
      }
    });
  };

  useEffect(() => {
    getTotalIncomeByMonth(username, year, month);
    getTotalExpenseByMonth(username, year, month);

    if (monthlyincome - monthlyexpense == 0) {
      setMonthlybalance(0);
    } else {
      setMonthlybalance((monthlyincome - monthlyexpense).toFixed(2));
    }
  }, [monthlyincome, monthlyexpense, month, year]);

  return (
    <Card className={"balance-widget"}>
      <Card.Title>Monthly Balance</Card.Title>
      {monthlybalance == 0 ? (
        <Card.Text>0</Card.Text>
      ) : (
        <Card.Text>{monthlybalance}</Card.Text>
      )}
    </Card>
  );
}

export default WidgetBalance;
