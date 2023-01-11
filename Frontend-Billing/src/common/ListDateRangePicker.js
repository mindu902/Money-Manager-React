import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/listview.css";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateStartDate, updateEndDate } from "../store/listdataSlice";

function ListDateRangePicker() {
  const dispatch = useDispatch();
  const changeStartDate = (date) => {
    dispatch(updateStartDate(date.getTime()));
  };
  const changeEndDate = (date) => {
    dispatch(updateEndDate(date.getTime()));
  };
  const { startDate, endDate } = useSelector((state) => {
    return {
      startDate: state.listdata.searchTerms.startDate,
      endDate: state.listdata.searchTerms.endDate,
    };
  });

  return (
    <Row>
      <Col>
        <DatePicker
          className={"datepickcontainer"}
          selected={startDate}
          onChange={(date) => changeStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
      </Col>

      <Col>
        <DatePicker
          className={"datepickcontainer"}
          selected={endDate}
          onChange={(date) => changeEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
      </Col>
    </Row>
  );
}

export default ListDateRangePicker;
