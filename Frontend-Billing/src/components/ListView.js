import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import IncomeService from "../services/income.service";
import ExpenseService from "../services/expense.service";
import ListDateRangePicker from "../common/ListDateRangePicker";
import ListTypeCategoryDropdown from "../common/ListTypeCategoryDropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "../styles/listview.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearSearchTerms,
  updateKeyword,
  setinitialData,
  filterData,
} from "../store/listdataSlice";
import FormIncome from "../common/FormIncome";
import FormExpense from "../common/FormExpense";

function ListView() {
  const dispatch = useDispatch();
  const [records, setRecords] = useState([]);
  const { filteredrecords, keyword, username } = useSelector((state) => {
    return {
      filteredrecords: state.listdata.data,
      startDate: state.listdata.searchTerms.startDate,
      endDate: state.listdata.searchTerms.endDate,
      selecttype: state.listdata.searchTerms.selecttype,
      selectcategory: state.listdata.searchTerms.selectcategory,
      keyword: state.listdata.searchTerms.keyword,
      username: state.auth.user.username,
    };
  });
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

  const changeInput = (e) => {
    dispatch(updateKeyword(e.target.value));
  };

  const getAllRecords = async () => {
    const incomedata = await IncomeService.getAllIncome(username);
    const expensedata = await ExpenseService.getAllExpense(username);
    setRecords([...incomedata, ...expensedata]);
    dispatch(setinitialData([...incomedata, ...expensedata]));
  };

  useEffect(() => {
    getAllRecords();
  }, []);

  useEffect(() => {
    setCurrpageData(filteredrecords.slice(startIndex, endIndex));
  }, [filteredrecords, currpage]);

  const filterRecords = () => {
    dispatch(filterData());
    setCurrpage(1);
  };

  const clearFilters = () => {
    dispatch(setinitialData(records));
    dispatch(clearSearchTerms());
  };

  const changePageContent = (pag) => {
    setCurrpage(pag);
  };

  const [show, setShow] = useState(false);
  // const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDelete = async (record) => {
    if (record.datatype === "Income") {
      await IncomeService.deleteIncome(record.id);
    } else {
      await ExpenseService.deleteExpense(record.id);
    }
    window.location.reload();
  };

  const [selectData, setSelectData] = useState([]);

  const handleEdit = (record) => {
    setShow(true);
    console.log(record);
    setSelectData(record);
  };

  const editIncome = (formvalue) => {
    console.log(formvalue);
    IncomeService.updateIncome(formvalue)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editExpense = (formvalue) => {
    console.log(formvalue);
    ExpenseService.updateExpense(formvalue)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
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
            <ListTypeCategoryDropdown></ListTypeCategoryDropdown>
          </Col>

          <Col md={4}>
            <ListDateRangePicker></ListDateRangePicker>
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
                <th>Operation</th>
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
                      <td>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            handleEdit(record);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            handleDelete(record);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
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

      {show && (
        <Modal show={show} onHide={handleClose}>
          {selectData.datatype === "Income" ? (
            <FormIncome
              handleClose={handleClose}
              initialValues={selectData}
              handleSubmit={editIncome}
            ></FormIncome>
          ) : (
            <FormExpense
              handleClose={handleClose}
              initialValues={selectData}
              handleSubmit={editExpense}
            ></FormExpense>
          )}
        </Modal>
      )}
    </div>
  );
}

export default ListView;
