import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  // console.log('daylist props.days: ', props.days);
  // console.log('daylist props: ', props);

  const daysArray = props.days.map(day => { 
    return (
      <ul>
        <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay} /> 
      </ul>
    );
  })
  return daysArray;
}
