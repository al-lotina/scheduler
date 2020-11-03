import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem.js";
import PropTypes from 'prop-types';
// const classNames = require('classnames');

// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => { 
    return (
        
          <InterviewerListItem 
            key={interviewer.id}
            name={interviewer.name} 
            avatar={interviewer.avatar} 
            selected={interviewer.id === props.interviewer} // ex props.value
            setInterviewer={event => props.onChange(interviewer.id)} // ex props.serInterviewer
          />
            
    );
  })
  return (
    <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          {interviewers}
        </ul>
    </section>
  )
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};