import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import IncomeService from "../services/income.service";
import ExpenseService from "../services/expense.service";

function ListView() {
  const [mergeddata, setMergeddata] = useState([]);

  //get all incomes given the username
  const getAllIncome = async () => {
    const incomedata = await IncomeService.getAllIncome("joydu123");
    const expensedata = await ExpenseService.getAllExpense("joydu123");
    setMergeddata([...incomedata, ...expensedata]);
  };

  useEffect(() => {
    getAllIncome();
  }, [mergeddata]);

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Notes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {mergeddata.map((record, indx) => (
            <tr key={indx}>
              <td>{record.datatype}</td>
              <td>{record.category}</td>
              <td>{record.amount}</td>
              <td>{record.notes}</td>
              <td>{record.recorddate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListView;
