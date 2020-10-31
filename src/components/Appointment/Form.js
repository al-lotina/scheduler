import React, {useState} from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  // console.log("Form props are: ", props);
  const [name, setName] = useState(props.name || ""); 
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = function() { 
    setName("");
    setInterviewer(null)
  };
  const cancel = function() { 
    props.onCancel();
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
        /*
          This must be a controlled component
           // should reset function go in a Button below ?
        */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={(id) => setInterviewer(id)} /> 
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
        
          <Button confirm onClick={() => {props.onSave(name, interviewer)}} bookInterview={props.bookInterview} >Save</Button>
        </section>
      </section>
    </main>

  
  )
}