import React from "react";
import Moment from "react-moment";

const Date = props => {
  return <Moment format={props.format}>{props.date}</Moment>;
};

export default Date;
