import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateRangePicker(props) {
  const changeDate = (type, date) => {
    props.updateDaterange(type, date);
  };

  return (
    <div>
      <DatePicker
        selected={props.startDate}
        onChange={(date) => changeDate("start", date)}
        selectsStart
        startDate={props.startDate}
        endDate={props.endDate}
        placeholderText="Start Date"
      />
      <DatePicker
        selected={props.endDate}
        onChange={(date) => changeDate("end", date)}
        selectsEnd
        startDate={props.startDate}
        endDate={props.endDate}
        minDate={props.startDate}
        placeholderText="End Date"
      />
    </div>
  );
}

export default DateRangePicker;
