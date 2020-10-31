import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function() {
    if (props.spots === 0) {
      return 'no spots';
    } else if (props.spots === 1) {
      return '1 spot';
    } else {
      return `${props.spots} spots`; 
    }
  };

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{formatSpots()} remaining</h3>
    </li>
  );
}
