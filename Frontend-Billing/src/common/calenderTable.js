import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";

import "../styles/dashboard.css";
import "../styles/calendar.css";
import moment from "moment";
import IncomeService from "../services/income.service";
import ExpenseService from "../services/expense.service";

function CalenderTable(props) {
  const today = moment().format("YYYY-MM-DD");
  const [incomes, setIncomes] = useState({ income: [] });
  const [expenses, setExpenses] = useState({ expense: [] });
  const [currdate, setCurrdate] = useState(today);
  const [marks, setMarks] = useState(new Set());

  const weekdays = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    0: "Sunday",
  };

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user")).username;

    IncomeService.getIncomeByDate(username, currdate).then((response) => {
      setIncomes({ income: response });
    });

    ExpenseService.getExpenseByDate(username, currdate).then((response) => {
      setExpenses({ expense: response });
    });

    IncomeService.getAllIncome(username).then((response) => {
      response.forEach((element) => {
        setMarks(
          (previousState) => new Set([...previousState, element.recorddate])
        );
      });
    });

    ExpenseService.getAllExpense(username).then((response) => {
      response.forEach((element) => {
        setMarks(
          (previousState) => new Set([...previousState, element.recorddate])
        );
      });
    });
  }, [currdate]);

  const handleChange = (value) => {
    let selectDate = moment(value).format("YYYY-MM-DD");
    let selectMonth = moment(selectDate).month() + 1;
    let selectYear = moment(selectDate).year();
    setCurrdate(selectDate);
    props.changeMonyear(selectMonth, selectYear, selectDate);
  };

  return (
    <div>
      <Col>
        <Row>
          <Calendar
            onChange={handleChange}
            tileClassName={({ date, view }) => {
              if (marks.has(moment(date).format("YYYY-MM-DD"))) {
                return "highlight-days";
              }
            }}
          />
        </Row>

        <Row>
          <Table hover className={"calendertable"}>
            <thead>
              <tr>
                <th>
                  {currdate} {weekdays[moment(currdate).weekday()]}
                </th>
              </tr>
            </thead>
            <tbody>
              {incomes.income &&
                incomes.income.map((item) => (
                  <tr key={item.id}>
                    <td>{item.category}</td>
                    <td style={{ color: "blue" }}>+{item.amount}</td>
                  </tr>
                ))}
              {expenses.expense &&
                expenses.expense.map((item) => (
                  <tr key={item.id}>
                    <td>{item.category}</td>
                    <td style={{ color: "red" }}>-{item.amount}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
      </Col>
    </div>
  );
}

export default CalenderTable;
