import { useState } from 'react';
import AllEvents from './event/AllEvents';


function Head({ upcomingEvents, pastEvents }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);

    return (
        <AllEvents 
            setIsAdmin={setIsAdmin} 
            isAdmin={isAdmin}
            upcomingEvents={upcomingEvents} 
            pastEvents={pastEvents} 
            setIsUser={setIsUser}
            isUser={isUser}
        />
    );
}
export default Head;
