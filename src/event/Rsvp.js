import classes from './Rsvp.module.css';
import { useParams } from 'react-router-dom';
import React from 'react';



function Rsvp() {
    const { eventId } = useParams();
    

    const nameRef = React.useRef();
    const dobRef = React.useRef();
    const emailRef = React.useRef();
    const passwordRef = React.useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch("http://127.0.0.1:5000/user_signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nameRef.current.value,
            dob: dobRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            event_id: eventId,
        }),
        
    })
    if (res.status === 200) {
        alert("Success");
        
        
    } else {
        console.log(res.status);
        alert("Failed");
    }
}; 

  return (
        <div className={classes.form}>
        <h1>We just need a few details from you</h1>
            <form onSubmit={handleSubmit}>
                <div className={classes.actions}>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Name" id="name" name="name" ref={nameRef}/>
                </div>
                <div className={classes.actions}>
                    <label htmlFor="dob">D.O.B</label>
                    <input type="number" placeholder="Date of birth" id="dob" name="dob" ref={dobRef}/>
                </div>
                <div className={classes.actions}>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Email" id="email" name="email" ref={emailRef}/>
                </div>
                <div className={classes.actions}>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" id="password" name="password" ref={passwordRef}/>
                </div>
                <div className={classes.actions}>
                    <button type="submit">Reserve your spot</button>
                </div>
            </form>
        </div>
    );
}
export default Rsvp;
    


