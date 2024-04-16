import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import classes from '../Head.module.css';
import Logout from "../admin/Logout";
import UpcomingEvents from "../event/UpcomingEvents";
import PassedEvents from "../event/PassedEvents";


function UserRoutes({ setIsUser, isUser, upcomingEvents, pastEvents, error, isLoaded }) {
   
    return (
        <Router> 
            <div className={classes.head}>
                <div>
                    <ul>
                        <li><Link to="/passed_events">Past Events</Link></li>
                        <li><Link to="/">Upcoming Events</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/passed_events" element={<PassedEvents setIsUser={setIsUser} isUser={isUser} events={pastEvents} error={error} isLoaded={isLoaded}/>} />
                <Route path="/" element={<UpcomingEvents setIsUser={setIsUser} isUser={isUser} events={upcomingEvents} error={error} isLoaded={isLoaded} />} />
                <Route path="/logout" element={<Logout setIsUser={setIsUser}/>} />
            </Routes>
        </Router>
    );
}
export default UserRoutes;