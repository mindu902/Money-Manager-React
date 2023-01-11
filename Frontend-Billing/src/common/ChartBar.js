import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

function ChartBar() {
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
  const [labels, setLabels] = useState([]);
  const [numofdays, setNumofDays] = useState(moment(date).daysInMonth());
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const display_month = moment(month, "MM").format("MMMM");

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Distribution of income and expenses in ${display_month} `,
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

  const getTotalIncomeByMonth = (username, year, month) => {
    let initialData = new Array(numofdays).fill(0);
    IncomeService.getSumIncomeByMon(username, year, month).then((response) => {
      response.forEach((item) => {
        initialData[moment(item.recorddate).date() - 1] = Number(item.amounts);
        setIncomes(initialData);
      });
    });
  };

  const getTotalExpenseByMonth = (username, year, month) => {
    let initialData2 = new Array(numofdays).fill(0);
    ExpenseService.getSumExpenseByMon(username, year, month).then(
      (response) => {
        response.forEach((item) => {
          initialData2[moment(item.recorddate).date() - 1] = Number(
            item.amounts
          );
          setExpenses(initialData2);
        });
      }
    );
  };

  useEffect(() => {
    setNumofDays(moment(date).daysInMonth());
    setLabels(generateLabels(numofdays));

    getTotalIncomeByMonth(username, year, month);
    getTotalExpenseByMonth(username, year, month);
  }, [month, year, numofdays]);

  return (
    <Card className="chart-bar">
      <Bar options={options} data={data} />
    </Card>
  );
}

export default ChartBar;
