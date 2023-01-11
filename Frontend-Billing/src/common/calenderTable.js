import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/dashboard.css";
import "../styles/calendar.css";
import moment from "moment";
import IncomeService from "../services/income.service";
import ExpenseService from "../services/expense.service";
import { updateTime } from "../store/dateSlice";

function CalenderTable() {
  const dispatch = useDispatch();
  const username = useSelector((state) => {
    return state.auth.user.username;
  });
  const { date, month, year } = useSelector((state) => {
    return {
      date: state.date.date,
      month: state.date.month,
      year: state.date.year,
    };
  });

  const [incomes, setIncomes] = useState({ income: [] });
  const [expenses, setExpenses] = useState({ expense: [] });
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
    IncomeService.getIncomeByDate(username, date).then((response) => {
      setIncomes({ income: response });
    });

    ExpenseService.getExpenseByDate(username, date).then((response) => {
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
  }, [date]);

  const handleChange = (value) => {
    let selectDate = moment(value).format("YYYY-MM-DD");

    dispatch(
      updateTime({
        date: selectDate,
        month: moment(selectDate).month() + 1,
        year: moment(selectDate).year(),
      })
    );
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
                  {date} {weekdays[moment(date).weekday()]}
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
