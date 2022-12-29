import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/listview.css";

function TypeCategoryDropDown(props) {
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
        props.updateType(value);
      }}
    >
      <Dropdown.Toggle id="dropdown-basic" className={"dropdownbutton"}>
        {props.selecttype ? props.selecttype : "Data Type"}
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
        props.updateCategory(value);
      }}
    >
      <Dropdown.Toggle id="dropdown-basic" className={"dropdownbutton"}>
        {props.selectcategory ? props.selectcategory : "Category"}
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
          {props.selecttype === "Income"
            ? incomecategoryDropdown(incomeCatArr)
            : incomecategoryDropdown(expenseCatArr)}
        </Col>
      </Row>
    </div>
  );
}

export default TypeCategoryDropDown;
