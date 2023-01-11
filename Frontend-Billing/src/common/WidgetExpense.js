import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import Card from "react-bootstrap/Card";
import ExpenseService from "../services/expense.service";
import { useSelector } from "react-redux";

function WidgetExpense() {
  const { month, year } = useSelector((state) => {
    return {
      month: state.date.month,
      year: state.date.year,
    };
  });
  const username = useSelector((state) => {
    return state.auth.user.username;
  });

  const [monthlyexpense, setMonthlyexpense] = useState(0);

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
    getTotalExpenseByMonth(username, year, month);
  }, [year, month]);

  return (
    <Card className={"expense-widget"}>
      <Card.Title>Monthly Expense</Card.Title>
      <Card.Text>{monthlyexpense}</Card.Text>
    </Card>
  );
}

export default WidgetExpense;
