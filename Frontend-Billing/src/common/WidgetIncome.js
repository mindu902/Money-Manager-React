import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import Card from "react-bootstrap/Card";
import IncomeService from "../services/income.service";
import { useSelector } from "react-redux";

function WidgetIncome() {
  const [monthlyincome, setMonthlyincome] = useState(0);
  const username = useSelector((state) => {
    return state.auth.user.username;
  });
  const { month, year } = useSelector((state) => {
    return {
      month: state.date.month,
      year: state.date.year,
    };
  });

  const getTotalIncomeByMonth = (username, year, month) => {
    IncomeService.getIncomeByMonth(username, year, month).then((response) => {
      if (response[0].amounts) {
        setMonthlyincome(response[0].amounts);
      } else {
        setMonthlyincome(0);
      }
    });
  };

  useEffect(() => {
    getTotalIncomeByMonth(username, year, month);
  }, [year, month]);

  return (
    <Card className={"income-widget"}>
      <Card.Title>Monthly Income</Card.Title>
      <Card.Text>{monthlyincome}</Card.Text>
    </Card>
  );
}

export default WidgetIncome;
