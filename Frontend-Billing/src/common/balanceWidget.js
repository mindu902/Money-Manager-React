import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/dashboard.css";
import Card from "react-bootstrap/Card";
import ExpenseService from "../services/expense.service";
import IncomeService from "../services/income.service";

function BalanceWidget(props) {
  const [monthlybalance, setMonthlybalance] = useState(0);
  const [monthlyincome, setMonthlyincome] = useState(0);
  const [monthlyexpense, setMonthlyexpense] = useState(0);
  const username = useSelector((state) => {
    return state.auth.user.username;
  });
  useEffect(() => {
    IncomeService.getIncomeByMonth(username, props.year, props.month).then(
      (response) => {
        if (response[0].amounts) {
          setMonthlyincome(response[0].amounts);
        } else {
          setMonthlyincome(0);
        }
      }
    );

    ExpenseService.getExpenseByMonth(username, props.year, props.month).then(
      (response) => {
        if (response[0].amounts) {
          setMonthlyexpense(response[0].amounts);
          if (monthlyincome - monthlyexpense == 0) {
            setMonthlybalance(0);
          } else {
            setMonthlybalance((monthlyincome - monthlyexpense).toFixed(2));
          }
        } else {
          setMonthlybalance(monthlyincome);
        }
      }
    );
  }, [monthlyincome, monthlyexpense, props.month, props.year]);

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

export default BalanceWidget;
