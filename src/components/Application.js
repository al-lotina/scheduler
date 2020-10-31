import React, { useState, Fragment, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import axios from 'axios';
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "../helpers/selectors.js";

const localdays = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const localAppointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];
/* line 48 is the same as:
    <Appointment 
      key={app.id}
      id={app.id}
      time={app.time} 
      interview={app.interview} 
      />
*/      
export default function Application(props) {
  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      // [
      //   "1": {
      //     id: 1,
      //     time: "12pm",
      //   },
      //   "2": {
      //     id: 2,
      //     time: "1pm",
      //     interview: {
      //       student: "Lydia Miller-Jones",
      //       interviewer: {
      //         id: 1,
      //         name: "Sylvia Palmer",
      //         avatar: "https://i.imgur.com/LpaY82x.png",
      //       }
      //     }
      //   }
      // ]
    },
    interviewers: {}
  });
  const setDay = day => setState({...state, day });
  // const setDays = days => setState(prev => ({...prev, days })); // per compass
  const dailyAppointments = getAppointmentsForDay(state, state.day); //ex state.day (day 4 change)
  const interviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    console.log('1. bookInterview id, interview= ', id, interview);
    const appointment = { //replaces interview object in appointment object
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = { //then replaces appointment object in state
      ...state.appointments,
      [id]: appointment
    };
    // setState({...state, appointments: appointments});
    console.log('2. new state after bookInterview setState: ', state)
    console.log('3. appointment object after bookInterview setState: ', state.appointments[id])
    const promise = axios.put(`/api/appointments/${id}`, appointment)
    .then((res) => {
      // console.log(res);
      setState({...state, appointments: appointments}) 
    });
    return promise; //or return axios.put
  };
  
  // function cancelInterview(id, interview) {

  // };

  useEffect(() => {
    // axios.get('http://localhost:8001/api/days')
    // .then(res => {
    //   // setDays(res.data)
    // })
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers')),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);
  
  const appSchedule = dailyAppointments.map((app) => {
    const interview = getInterview(state, app.interview);
    return (
      <Appointment 
        key={app.id} // ex {...app}  
        id={app.id}
        time={app.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />   
    )
  });
  return (
    // Daylist props should be {state.days}, {state.day}, {setDay... ? }
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} /> 
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appSchedule}
        <Appointment key="last" time="5pm"/> 
      </section>
    </main>
  );
}

