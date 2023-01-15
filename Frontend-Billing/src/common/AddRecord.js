import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import moment from "moment";

import "../styles/addmodal.css";
import { MdOutlineAdd } from "react-icons/md";
import IncomeService from "../services/income.service";
import ExpenseService from "../services/expense.service";
import FormIncome from "./FormIncome";
import FormExpense from "./FormExpense";
import { useSelector } from "react-redux";

function AddRecord() {
  const username = useSelector((state) => {
    return state.auth.user.username;
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitIncome = (formvalue) => {
    let recordmonth = moment(formvalue.recorddate).month() + 1;
    let recordyear = moment(formvalue.recorddate).year();
    IncomeService.addIncome(
      username,
      formvalue.category,
      formvalue.recorddate,
      recordyear,
      recordmonth,
      formvalue.amount,
      formvalue.notes
    ).then((response) => {
      console.log(response);
      setShow(false);
      window.location.reload();
    });
  };

  const submitExpense = (formvalue) => {
    let recordmonth = moment(formvalue.recorddate).month() + 1;
    let recordyear = moment(formvalue.recorddate).year();
    ExpenseService.addExpense(
      username,
      formvalue.category,
      formvalue.recorddate,
      recordyear,
      recordmonth,
      formvalue.amount,
      formvalue.notes
    ).then((response) => {
      console.log(response);
      setShow(false);
      window.location.reload();
    });
  };

  return (
    <>
      <Button variant={"light"} onClick={handleShow} className={"closebutton"}>
        <MdOutlineAdd></MdOutlineAdd> <strong>Add</strong>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Tabs defaultActiveKey="addincome" id="uncontrolled-tab-example">
          <Tab eventKey="addincome" title="Income">
            <FormIncome
              handleClose={handleClose}
              handleSubmit={submitIncome}
            ></FormIncome>
          </Tab>
          <Tab eventKey="addexpense" title="Expense">
            <FormExpense
              handleClose={handleClose}
              handleSubmit={submitExpense}
            ></FormExpense>
          </Tab>
        </Tabs>
      </Modal>
    </>
  );
}

export default AddRecord;
