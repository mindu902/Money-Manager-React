import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/listview.css";
import { Form } from "react-bootstrap";

function DateRangePicker(props) {
  const changeDate = (type, date) => {
    props.updateDaterange(type, date);
  };

  return (
    <Row>
      <Col>
        <DatePicker
          className={"datepickcontainer"}
          selected={props.startDate}
          onChange={(date) => changeDate("start", date)}
          selectsStart
          startDate={props.startDate}
          endDate={props.endDate}
          placeholderText="Start Date"
        />
      </Col>

      <Col>
        <DatePicker
          className={"datepickcontainer"}
          selected={props.endDate}
          onChange={(date) => changeDate("end", date)}
          selectsEnd
          startDate={props.startDate}
          endDate={props.endDate}
          minDate={props.startDate}
          placeholderText="End Date"
        />
      </Col>
    </Row>
  );
}

export default DateRangePicker;
