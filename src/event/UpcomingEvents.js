import React from 'react';
import classes from './AllEvents.module.css';
import { useNavigate } from "react-router-dom";
import Countdown from '../ui/CountDown';




function UpcomingEvents({ events, error, isLoaded, isUser}) {
    const navigate = useNavigate();

    
    const handleRSVP = async (eventId) => {
        if (!isUser) {
            alert("You must be logged in to RSVP");
            navigate("/login");
        } else {
            var userId = localStorage.getItem("user_id");
            
            try {
                const res = await fetch("http://127.0.0.1:5000/rsvp", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            user_id: userId,
                            event_id: eventId
                        }
                    ),
                })
                console.log(localStorage.getItem("user_id"), eventId);
                
                if (res.status === 200) {
                    alert("RSVP Success");
                } else {
                    alert("RSVP Failed");
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while trying to RSVP');
            }
        }
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (events.length === 0) {
        return <p>No upcoming events</p>;
    }
    return (
        <div>
            {events.map((event) => (
                <div key={event.id} className={classes.event}>
                        <div>
                            <h2>{event.name}</h2>
                        </div>
                        <div>
                            <p>{event.date}</p>
                            <p>{event.location}</p>
                        </div>
                        <div>
                            <img src={event.image} alt={event.name} />
                        </div>
                        <div>
                            <button onClick={() => handleRSVP(event.id)}>
                                <Countdown date={event.countdown_date} />
                            </button>
                        </div>
                </div>
            ))}
        </div>
        
    )
}
export default UpcomingEvents;