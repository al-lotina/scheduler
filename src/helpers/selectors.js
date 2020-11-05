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

export function getAppointmentsForDay(state, day) {
  // returns an array of appointments for that day, or empty array if no appointments
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
};

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
