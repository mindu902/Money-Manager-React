import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import IncomeService from "../services/income.service";
import ExpenseService from "../services/expense.service";
import moment from "moment";
import ListDateRangePicker from "../common/ListDateRangePicker";
import ListTypeCategoryDropdown from "../common/ListTypeCategoryDropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Navbar, FormControl, Button } from "react-bootstrap";
import "../styles/listview.css";

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

  //pagination
  const [pagesize, setPagesize] = useState(4);
  const [currpage, setCurrpage] = useState(1);
  let endIndex = currpage * pagesize;
  let startIndex = endIndex - pagesize;
  let totalPages = filteredrecords
    ? Math.ceil(filteredrecords.length / pagesize)
    : Math.ceil(records.length / pagesize);
  let pagesArr = [];
  for (let number = 1; number <= totalPages; number++) {
    pagesArr.push(number);
  }
  const [currpageData, setCurrpageData] = useState([]);

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

  useEffect(() => {
    setCurrpageData(filteredrecords.slice(startIndex, endIndex));
  }, [filteredrecords, currpage]);

  const filterRecords = () => {
    let formatStart = moment(startDate).format("YYYY-MM-DD");
    let formatEnd = moment(endDate).format("YYYY-MM-DD");
    let cleanedKeyword = keyword
      .split(/[^\w\s]/gi)
      .join("")
      .toLowerCase();

    const filteredData = records.filter((item) => {
      return (
        (item.recorddate >= formatStart || !isNaN(formatStart)) &&
        (item.recorddate <= formatEnd || !isNaN(formatEnd)) &&
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
    setCurrpage(1);
  };

  const clearFilters = () => {
    setFilteredrecords(records);
    setStartDate(new Date());
    setEndDate(new Date());
    setSelecttype("");
    setSelectcategory("");
    setKeyword("");
  };

  const changePageContent = (pag) => {
    setCurrpage(pag);
  };

  //create pagination items
  let PaginationItems = [];
  if (currpage > 1) {
    PaginationItems.push(
      <Pagination.Prev
        key="prev"
        onClick={() => {
          changePageContent(currpage - 1);
        }}
      />
    );
  }
  for (let page = 1; page <= totalPages; page++) {
    PaginationItems.push(
      <Pagination.Item
        key={page}
        active={page === currpage}
        onClick={() => {
          changePageContent(page);
        }}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (currpage < totalPages) {
    PaginationItems.push(
      <Pagination.Next
        key="next"
        onClick={() => {
          changePageContent(currpage + 1);
        }}
      />
    );
  }

  return (
    <div className={"listviewbox"}>
      <Card className={"filterbox"}>
        <Row>
          <b className={"totalbox"}>Total: {filteredrecords.length}</b>
        </Row>
        <Row>
          <Col md={3}>
            <ListTypeCategoryDropdown
              selecttype={selecttype}
              selectcategory={selectcategory}
              updateType={updateType}
              updateCategory={updateCategory}
            ></ListTypeCategoryDropdown>
          </Col>

          <Col md={4}>
            <ListDateRangePicker
              startDate={startDate}
              endDate={endDate}
              updateDaterange={updateDaterange}
            ></ListDateRangePicker>
          </Col>

          <Col md={3}>
            <InputGroup>
              <Form.Control
                className={"inputbox"}
                type="text"
                value={keyword}
                onChange={changeInput}
                placeholder="Keywords in Notes"
              />
            </InputGroup>
          </Col>

          <Col>
            <Button className={"searchbox"} onClick={filterRecords}>
              Search
            </Button>

            <Button className={"searchbox"} onClick={clearFilters}>
              Clear
            </Button>
          </Col>
        </Row>
      </Card>

      <Card className={"tablebox"}>
        <Row>
          <Table striped responsive>
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
              {currpageData
                ? currpageData.map((record, indx) => (
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
        </Row>
      </Card>

      <Row>
        <Pagination className={"totalbox"}>{PaginationItems}</Pagination>
      </Row>
    </div>
  );
}

export default ListView;
