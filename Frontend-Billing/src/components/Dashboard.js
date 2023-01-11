import React from "react";
import "../styles/dashboard.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WidgetExpense from "../common/WidgetExpense";
import WidgetBalance from "../common/WidgetBalance";
import WidgetIncome from "../common/WidgetIncome";
import ChartBar from "../common/ChartBar";
import ChartDoughnut from "../common/ChartDoughnut";
import CalenderTable from "../common/CalenderTable";
import AddButton from "../common/AddButton";

function Dashboard() {
  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={4}>
              <WidgetIncome></WidgetIncome>
            </Col>

            <Col md={4}>
              <WidgetExpense></WidgetExpense>
            </Col>

            <Col md={4}>
              <WidgetBalance></WidgetBalance>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <ChartBar></ChartBar>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <ChartDoughnut></ChartDoughnut>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <CalenderTable></CalenderTable>
        </Col>
      </Row>
      <AddButton></AddButton>
    </Container>
  );
}

export default Dashboard;
