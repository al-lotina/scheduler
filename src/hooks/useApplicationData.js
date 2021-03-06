import {useState, useEffect} from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day });
  
  function bookInterview(id, interview) {
    const appointment = { //replaces interview object in appointment object
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = { //then replaces appointment object in state
      ...state.appointments,
      [id]: appointment
    };
    const promise2 = axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      const promise1 = axios.get('/api/days')
      .then((res) => {
        setState({...state, days: res.data, appointments: appointments}) 
      })
      return promise1;
    });
    return promise2; 
  };

  function cancelInterview(id) {
    const appointment = { 
      ...state.appointments[id],
      interview: null
    };
    const appointments = { 
      ...state.appointments,
      [id]: appointment
    };
    const promise2 = axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const promise1 = axios.get('/api/days')
      .then((res) => {
        setState({...state, days: res.data, appointments: appointments}) 
      })
      return promise1;
    });
    return promise2;
  };

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers')),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  return { 
    state: state,
    setDay: setDay,
    bookInterview: bookInterview,
    cancelInterview: cancelInterview
   };
}

export default useApplicationData;