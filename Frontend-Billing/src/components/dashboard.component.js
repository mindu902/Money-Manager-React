import React, { useState } from "react";
import "../styles/dashboard.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExpenseWidget from "../common/expenseWidget";
import BalanceWidget from "../common/balanceWidget";
import IncomeWidget from "../common/incomeWidget";
import BarChart from "../common/barChart";
import DoughnutChart from "../common/doughnutChart";
import CalenderTable from "../common/calenderTable";
import AddButton from "../common/addButton";
import moment from "moment";

function Dashboard() {
  const today = moment().format("YYYY-MM-DD");
  const [month, setMonth] = useState(moment(today).month() + 1);
  const [year, setYear] = useState(moment(today).year());
  const [selectdate, setSelectdate] = useState(today);

  const changeMonyear = (m, y, date) => {
    setMonth(m);
    setYear(y);
    setSelectdate(date);
  };

  return (
    <Container fluid>
      <Row>
        {/* left side of Dashboard */}
        <Col md={8}>
          <Row className={"widgets"}>
            <Col>
              <IncomeWidget month={month} year={year}></IncomeWidget>
            </Col>

            <Col>
              <ExpenseWidget month={month} year={year}></ExpenseWidget>
            </Col>

            <Col>
              <BalanceWidget month={month} year={year}></BalanceWidget>
            </Col>
          </Row>

          <Row>
            <BarChart
              month={month}
              year={year}
              selectdate={selectdate}
            ></BarChart>
          </Row>

          <Row>
            <DoughnutChart
              month={month}
              year={year}
              selectdate={selectdate}
            ></DoughnutChart>
          </Row>
        </Col>

        <Col md={{ span: 3 }}>
          <CalenderTable changeMonyear={changeMonyear}></CalenderTable>

          <AddButton></AddButton>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
