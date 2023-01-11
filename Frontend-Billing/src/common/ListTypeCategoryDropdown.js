import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/listview.css";
import { useSelector, useDispatch } from "react-redux";
import { updateType, updateCategory } from "../store/listdataSlice";

function ListTypeCategoryDropdown() {
  const dispatch = useDispatch();
  const { selecttype, selectcategory } = useSelector((state) => {
    return {
      selecttype: state.listdata.searchTerms.selecttype,
      selectcategory: state.listdata.searchTerms.selectcategory,
    };
  });

  const changeType = (value) => {
    dispatch(updateType(value));
  };
  const changeCategory = (value) => {
    dispatch(updateCategory(value));
  };
  const incomeCatArr = [
    "Salary",
    "Refund",
    "Bonus",
    "Transfer",
    "Finance",
    "Other",
  ];
  const expenseCatArr = [
    "Accommodations",
    "Advertising",
    "Meals",
    "Mileage",
    "Office supplies",
    "Others",
    "Postages",
    "Repairs",
    "Stationery",
    "Other",
  ];

  const typeDropdown = (
    <Dropdown
      onSelect={(value) => {
        changeType(value);
      }}
    >
      <Dropdown.Toggle id="dropdown-basic" className={"dropdownbutton"}>
        {selecttype ? selecttype : "Data Type"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item key="Income" eventKey="Income">
          Income
        </Dropdown.Item>
        <Dropdown.Item key="Expense" eventKey="Expense">
          Expense
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const incomecategoryDropdown = (arr) => (
    <Dropdown
      onSelect={(value) => {
        changeCategory(value);
      }}
    >
      <Dropdown.Toggle id="dropdown-basic" className={"dropdownbutton"}>
        {selectcategory ? selectcategory : "Category"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {arr.map((cat) => (
          <Dropdown.Item key={cat} eventKey={cat}>
            {cat}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div>
      <Row>
        <Col>{typeDropdown}</Col>

        <Col>
          {selecttype === "Income"
            ? incomecategoryDropdown(incomeCatArr)
            : incomecategoryDropdown(expenseCatArr)}
        </Col>
      </Row>
    </div>
  );
}

export default ListTypeCategoryDropdown;
