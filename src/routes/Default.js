import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React from 'react';
import Login from '../admin/Login';
import classes from '../Head.module.css';
import UpcomingEvents from "../event/UpcomingEvents";
import PassedEvents from "../event/PassedEvents";


function Default({ setIsAdmin, setIsUser, upcomingEvents, pastEvents, error, isLoaded, isUser }) {
           
        return (
            <Router> 
                <div className={classes.head}>
                    <div>
                        <ul>
                            <li><Link to="/">Upcoming Events</Link></li>
                            <li><Link to="passed_events">Passed events</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={<UpcomingEvents setIsAdmin={setIsAdmin} setIsUser={setIsUser} events={upcomingEvents} error={error} isLoaded={isLoaded}/>} /> 
                    <Route path="/passed_events" element={<PassedEvents setIsAdmin={setIsAdmin} setIsUser={setIsUser} events={pastEvents} error={error} isLoaded={isLoaded} isUser={isUser}/>} />
                    <Route path="/login" element={<Login setIsAdmin={setIsAdmin} setIsUser={setIsUser}/>} />
                </Routes>
            </Router>
        )
}
export default Default;