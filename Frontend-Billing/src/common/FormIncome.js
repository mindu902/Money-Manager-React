import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

function FormIncome(props) {
  const [formValues, setFormValues] = useState(
    props.initialValues || {
      category: "",
      amount: 0,
      recorddate: "",
      notes: "",
    }
  );

  return (
    <div>
      <Modal.Body>
        <Form>
          {["Salary", "Refund", "Bonus", "Transfer", "Finance", "Other"].map(
            (name) => (
              <Form.Check
                key={name}
                type="radio"
                id={name}
                label={name}
                name="category"
                defaultChecked={formValues.category === `${name}`}
                onChange={(e) =>
                  setFormValues({ ...formValues, category: e.target.id })
                }
              />
            )
          )}

          <Row>
            <Form.Group as={Col} md="5" controlId="amount">
              <Form.Label>Income Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                name="amount"
                value={formValues.amount}
                onChange={(e) =>
                  setFormValues({ ...formValues, amount: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="formGridAmount">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Select a Date"
                value={formValues.recorddate}
                onChange={(e) =>
                  setFormValues({ ...formValues, recorddate: e.target.value })
                }
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="10" controlId="formGridAmount">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Notes"
                name="notes"
                value={formValues.notes}
                onChange={(e) =>
                  setFormValues({ ...formValues, notes: e.target.value })
                }
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            props.handleSubmit(formValues);
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </div>
  );
}

export default FormIncome;
