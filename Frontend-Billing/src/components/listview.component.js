import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import IncomeService from "../services/income.service";
import ExpenseService from "../services/expense.service";
import moment from "moment";
import DateRangePicker from "../common/daterangepicker";
import TypeCategoryDropDown from "../common/typecategoryDropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "react-bootstrap/Pagination";

function ListView() {
  const [records, setRecords] = useState([]);
  const [filteredrecords, setFilteredrecords] = useState([]);

  //for filter data by date range
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //for filter data by type
  const [selecttype, setSelecttype] = useState("");
  const [selectcategory, setSelectcategory] = useState("");

  //for filter certain keywords
  const [keyword, setKeyword] = useState("");

  const updateDaterange = (type, date) => {
    if (type === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const updateType = (selecttype) => {
    setSelecttype(selecttype);
  };

  const updateCategory = (selectcat) => {
    setSelectcategory(selectcat);
  };

  const changeInput = (e) => {
    setKeyword(e.target.value);
  };

  const getAllRecords = async () => {
    const incomedata = await IncomeService.getAllIncome("joydu123");
    const expensedata = await ExpenseService.getAllExpense("joydu123");
    setRecords([...incomedata, ...expensedata]);
    setFilteredrecords([...incomedata, ...expensedata]);
  };

  useEffect(() => {
    getAllRecords();
  }, []);

  const filterRecords = () => {
    let formatStart = moment(startDate).format("YYYY-MM-DD");
    let formatEnd = moment(endDate).format("YYYY-MM-DD");
    let cleanedKeyword = keyword
      .split(/[^\w\s]/gi)
      .join("")
      .toLowerCase();

    const filteredData = records.filter((item) => {
      return (
        (!isNaN(formatStart) || item.recorddate >= formatStart) &&
        (!isNaN(formatEnd) || item.recorddate <= formatEnd) &&
        (selecttype === "" || item.datatype === selecttype) &&
        (selectcategory === "" || item.category === selectcategory) &&
        item.notes
          .split(/[^\w\s]/gi)
          .join("")
          .toLowerCase()
          .includes(cleanedKeyword)
      );
    });
    setFilteredrecords(filteredData);
  };

  const clearFilters = () => {
    setFilteredrecords(records);
    setStartDate(new Date());
    setEndDate(new Date());
    setSelecttype("");
    setSelectcategory("");
    setKeyword("");
  };

  return (
    <div>
      <TypeCategoryDropDown
        selecttype={selecttype}
        selectcategory={selectcategory}
        updateType={updateType}
        updateCategory={updateCategory}
      ></TypeCategoryDropDown>

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        updateDaterange={updateDaterange}
      ></DateRangePicker>

      <InputGroup>
        <Form.Control
          type="text"
          value={keyword}
          onChange={changeInput}
          placeholder="Enter keyword to search in notes"
        />
      </InputGroup>

      <button onClick={filterRecords}>Search</button>
      <button onClick={clearFilters}>Clear</button>
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
          {filteredrecords
            ? filteredrecords.map((record, indx) => (
                <tr key={indx}>
                  <td>{record.datatype}</td>
                  <td>{record.category}</td>
                  <td>{record.amount}</td>
                  <td>{record.notes}</td>
                  <td>{record.recorddate}</td>
                </tr>
              ))
            : ["No Data"]}
        </tbody>
      </Table>
    </div>
  );
}

export default ListView;
