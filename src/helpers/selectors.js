const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [2]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
  
};
export function getInterview(state, interview) {
  // returns an object with interview data
  if(interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  } else {
    return null;
  }
};
// console.log(getInterview(state, null));

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let result = [];
  const dayObj = state.days.find(obj => obj.name === day);
  if(dayObj){
     for(let num of dayObj.appointments) {
       result.push(state.appointments[num]);
     };
  } else {
    return result;
  }
  return result;
}
// console.log(getAppointmentsForDay(state, 'Tuesday'));

export function getInterviewersForDay(state, day) {
  //... returns an array of interviewers for that day
  let result = [];
  const dayObj = state.days.find(obj => obj.name === day);
  if(dayObj){
     for(let num of dayObj.interviewers) {
       result.push(state.interviewers[num]);
     };
  } else {
    return result;
  }
  return result;
};
// console.log(getInterviewersForDay(state, null));