import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import Card from "react-bootstrap/Card";
import ExpenseService from "../services/expense.service";
import { useSelector } from "react-redux";

function ExpenseWidget(props) {
  const [monthlyexpense, setMonthlyexpense] = useState(0);
  const username = useSelector((state) => {
    return state.auth.user.username;
  });

  useEffect(() => {
    ExpenseService.getExpenseByMonth(username, props.year, props.month).then(
      (response) => {
        if (response[0].amounts) {
          setMonthlyexpense(response[0].amounts);
        } else {
          setMonthlyexpense(0);
        }
      }
    );
  }, [props.year, props.month]);

  return (
    <Card className={"expense-widget"}>
      <Card.Title>Monthly Expense</Card.Title>
      <Card.Text>{monthlyexpense}</Card.Text>
    </Card>
  );
}

export default ExpenseWidget;
