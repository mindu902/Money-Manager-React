import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import "../styles/addmodal.css";
import { MdOutlineAdd } from "react-icons/md";

import AddIncome from "./AddIncome";
import AddExpense from "./AddExpense";

function AddButton() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant={"light"} onClick={handleShow} className={"closebutton"}>
        <MdOutlineAdd></MdOutlineAdd> <strong>Add</strong>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Tabs defaultActiveKey="addincome" id="uncontrolled-tab-example">
          <Tab eventKey="addincome" title="Income">
            <AddIncome handleClose={handleClose}></AddIncome>
          </Tab>
          <Tab eventKey="addexpense" title="Expense">
            <AddExpense handleClose={handleClose}></AddExpense>
          </Tab>
        </Tabs>
      </Modal>
    </>
  );
}

export default AddButton;
