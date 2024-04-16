import { useRef } from 'react';
import classes from './NewEvent.module.css';

function NewEvent() {
    const event_name = useRef();
    const event_location = useRef();
    const event_date = useRef();
    const event_image = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch("http://127.0.0.1:5000/new_event", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: event_name.current.value,
                location: event_location.current.value,
                date: event_date.current.value,
                image: event_image.current.value,
            }),
        })

        if (res.status === 200) {
            alert("Success");
        } else {
            alert("Failed");
        }
    }

    return (
        <div className={classes.form}>
            <form onSubmit={handleSubmit}>
                <div className={classes.actions}>
                    <h1>Create Event</h1>
                </div>
                <div className={classes.actions}>
                    <label htmlFor="event_name">Name</label>
                    <input type="text" id="event_name" name="event_name" ref={event_name} required/>
                </div>
                <div className={classes.actions}>
                    <label htmlFor="event_location">Location</label>
                    <input type="text" id="event_location" name="event_location" ref={event_location} required/>
                </div>
                <div className={classes.actions}>
                    <label htmlFor="event_date">Date</label>
                    <input type="date" id="event_date" name="event_date" ref={event_date} required/>
                </div>
                <div className={classes.actions}>
                    <label htmlFor="event_image">Image</label>
                    <input type="text" id="event_image" name="event_image" ref={event_image} required/>
                </div>
                <div className={classes.actions}>
                    <button type="submit">Create Event</button>
                </div>
            </form>
        </div>
    )
    
}
export default NewEvent;

