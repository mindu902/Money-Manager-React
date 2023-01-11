import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/dashboard.css";
import {
  Legend,
  Chart as ChartJS2,
  ArcElement,
  Tooltip,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Card from "react-bootstrap/Card";

import IncomeService from "../services/income.service";
import ExpenseService from "../services/expense.service";
import { Col, Row } from "react-bootstrap";

ChartJS2.register(ArcElement, Tooltip, Legend, Title);

function DoughnutChart(props) {
  const username = useSelector((state) => {
    return state.auth.user.username;
  });
  const [incomelabels, setIncomeLabels] = useState([]);
  const [incomecontent, setIncomeContent] = useState([]);
  const [expenselabels, setExpenseLabels] = useState([]);
  const [expensecontent, setExpenseContent] = useState([]);

  const Incomeoptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Income",
        align: "center",
        padding: {
          bottom: 10,
        },
      },
      legend: {
        position: "right",
      },
    },
  };

  const Expenseoptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Expense",
        align: "center",
        padding: {
          bottom: 10,
        },
      },
      legend: {
        position: "right",
      },
    },
  };

  let backgroundColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];
  const incomedata = {
    labels: incomelabels,
    datasets: [
      {
        data: incomecontent,
        backgroundColor: backgroundColor.slice(0, incomelabels.length),
        borderWidth: 1,
      },
    ],
  };

  const expensedata = {
    labels: expenselabels,
    datasets: [
      {
        data: expensecontent,
        backgroundColor: backgroundColor.slice(0, expenselabels.length),
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    IncomeService.getIncomeByMonthCat(username, props.year, props.month).then(
      (response) => {
        setIncomeLabels([]);
        setIncomeContent([]);
        // console.log(response.data.length);
        if (response.data.length !== 0) {
          for (let item of response.data) {
            setIncomeLabels((oldArray) => [...oldArray, item.category]);
            setIncomeContent((oldArray) => [...oldArray, item.amounts]);
          }
        }
      }
    );

    ExpenseService.getExpenseByMonthCat(username, props.year, props.month).then(
      (response) => {
        setExpenseLabels([]);
        setExpenseContent([]);
        // console.log(response.data.length);
        if (response.data.length !== 0) {
          for (let item of response.data) {
            setExpenseLabels((oldArray) => [...oldArray, item.category]);
            setExpenseContent((oldArray) => [...oldArray, item.amounts]);
          }
        }
      }
    );
  }, [props.year, props.month]);

  return (
    <div>
      <Row>
        <Col md={6}>
          <Card className="chart-doughnut">
            {" "}
            <Doughnut options={Incomeoptions} data={incomedata} />
          </Card>
        </Col>

        <Col md={6}>
          <Card className="chart-doughnut">
            {" "}
            <Doughnut options={Expenseoptions} data={expensedata} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DoughnutChart;
