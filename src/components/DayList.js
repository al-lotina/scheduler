import React from "react";
import DayListItem from "components/DayListItem.js";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

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
