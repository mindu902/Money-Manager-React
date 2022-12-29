import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import IncomeService from "../services/income.service";
import ExpenseService from "../services/expense.service";
import Card from "react-bootstrap/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generateLabels = (numofdays) => {
  let day = 1;
  let temp = [];
  for (day; day < numofdays + 1; day++) {
    temp.push(day);
  }
  return temp;
};

function BarChart(props) {
  const username = JSON.parse(localStorage.getItem("user")).username;
  const today = moment().format("YYYY-MM-DD");
  const month = moment(props.month, "MM").format("MMMM");
  const [labels, setLabels] = useState([]);
  const [numofdays, setNumofDays] = useState(moment(today).daysInMonth());
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Distribution of income and expenses in ${month} `,
        align: "center",
        padding: {
          bottom: 10,
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomes,
        backgroundColor: "#25b87a",
      },
      {
        label: "Expense",
        data: expenses,
        backgroundColor: "#eb595d",
      },
    ],
  };

  useEffect(() => {
    setNumofDays(moment(props.selectdate).daysInMonth());
    setLabels(generateLabels(numofdays));

    let initialData = new Array(numofdays).fill(0);
    IncomeService.getSumIncomeByMon(username, props.year, props.month).then(
      (response) => {
        response.forEach((item) => {
          initialData[moment(item.recorddate).date() - 1] = Number(
            item.amounts
          );
          setIncomes(initialData);
        });
      }
    );

    let initialData2 = new Array(numofdays).fill(0);
    ExpenseService.getSumExpenseByMon(username, props.year, props.month).then(
      (response) => {
        response.forEach((item) => {
          initialData2[moment(item.recorddate).date() - 1] = Number(
            item.amounts
          );
          setExpenses(initialData2);
        });
      }
    );
  }, [props.month, props.year, numofdays]);

  return (
    <Card className="chart-bar">
      <Bar options={options} data={data} />
    </Card>
  );
}

export default BarChart;
