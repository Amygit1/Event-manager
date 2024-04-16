import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import classes from '../Head.module.css';
import CreateEvent from "../admin/NewEvent";
import Logout from "../admin/Logout";
import UpcomingEvents from "../event/UpcomingEvents";
import Attendees from "../admin/Attendees";


function AdminRoutes({ setIsAdmin, isAdmin, allEvents, error, isLoaded}) {
    return (
        <Router> 
            <div className={classes.head}>
                <div>
                    <ul>
                        <li><Link to="/attendees">Attendees</Link></li>
                        <li><Link to="/">Events</Link></li>
                        <li><Link to="/new_event">Create Event</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/attendees" element={<Attendees />} />
                <Route path="/" element={<UpcomingEvents setIsAdmin={setIsAdmin} isAdmin={isAdmin} events={allEvents} error={error} isLoaded={isLoaded}/>} />
                <Route path="/new_event" element={<CreateEvent />} />
                <Route path="/logout" element={<Logout setIsAdmin={setIsAdmin}/>} />
            </Routes>
        </Router>
    );
}
export default AdminRoutes;