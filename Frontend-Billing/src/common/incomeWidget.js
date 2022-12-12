import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import Card from "react-bootstrap/Card";
import IncomeService from "../services/income.service";

function IncomeWidget(props) {
  const [monthlyincome, setMonthlyincome] = useState(0);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user")).username;

    IncomeService.getIncomeByMonth(username, props.year, props.month).then(
      (response) => {
        if (response[0].amounts) {
          setMonthlyincome(response[0].amounts);
        } else {
          setMonthlyincome(0);
        }
      }
    );
  }, [props.year, props.month]);

  return (
    <Card className={"income-widget"}>
      <Card.Title>Monthly Income</Card.Title>
      <Card.Text>{monthlyincome}</Card.Text>
    </Card>
  );
}

export default IncomeWidget;
