import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import IncomeService from "../services/income.service";
import { useSelector } from "react-redux";

function AddIncome(props) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [recorddate, setRecorddate] = useState("");
  const [notes, setNotes] = useState("");
  const username = useSelector((state) => {
    return state.auth.user.username;
  });
  const submitForm = () => {
    let recordmonth = moment(recorddate).month() + 1;
    let recordyear = moment(recorddate).year();
    IncomeService.addIncome(
      username,
      category,
      recorddate,
      recordyear,
      recordmonth,
      amount,
      notes
    ).then((response) => {
      console.log(response);
    });

    props.handleClose();
  };
  return (
    <div>
      <Modal.Body>
        <Form>
          {[
            ["Salary", "Refund"],
            ["Bonus", "Transfer"],
            ["Finance", "Other"],
          ].map(([name, nn]) => (
            <Row key={`${name}`} className="mb-3">
              <Col>
                <Form.Check
                  type={"radio"}
                  id={`${name}`}
                  label={`${name}`}
                  name={category}
                  value={`${name}`}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Check
                  type={"radio"}
                  id={`${nn}`}
                  label={`${nn}`}
                  name={category}
                  value={`${nn}`}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Col>
            </Row>
          ))}

          <Row>
            <Form.Group as={Col} md="5" controlId="amount">
              <Form.Label>Income Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                name={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="formGridAmount">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Select a Date"
                value={recorddate}
                onChange={(e) => setRecorddate(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="10" controlId="formGridAmount">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Notes"
                name={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submitForm}>
          Save
        </Button>
      </Modal.Footer>
    </div>
  );
}

export default AddIncome;
