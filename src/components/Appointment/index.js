import React, { Fragment, useState } from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"
// import useVisualMode from "../hooks/useVisualMode.js"

const useVisualMode = (initial) => {
  // console.log('inside useVisualMode')
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 
  function transition(newMode, replace = false) {
    const newHistory = [...history]
    if(replace) {
      newHistory.pop();
    }
    newHistory.push(newMode)
    setMode(newMode);
    setHistory(newHistory);
  };
  function back() {
    const newHistory = [...history]
    if(newHistory.length > 1) {
      newHistory.pop()
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
    // console.log('history: ', history); 
  };
  return { 
    mode: mode,
    transition: transition,
    back: back
   };
};

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {transition(SHOW)});
  };

  function onDelete() {
    transition(CONFIRM);
  };

  function onConfirmDelete() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => {transition(EMPTY)});  
  };

  return (
    // Show onDelete={onDelete}
    <Fragment>
      <Header time={props.time} />
      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={onDelete} />)} 
      {mode === CREATE && (
      <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save} bookInterview={props.bookInterview} />)}
      {mode === SAVING && (
      <Status message='Saving' />)}
      {mode === DELETING && (
      <Status message='Deleting' />)}
      {mode === CONFIRM && 
      <Confirm message='Delete the appointment?' onCancel={() => back(SHOW)} onConfirm={() => {onConfirmDelete()}} />}
    </Fragment>
  )
}