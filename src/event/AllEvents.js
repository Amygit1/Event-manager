import React from "react";
import Default from "../routes/Default";
import AdminRoutes from "../routes/AdminRoutes";
import UserRoutes from "../routes/UserRoutes";


class AllEvents extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            upcomingEvents: [],
            pastEvents: [],
            isAdmin: false,
            isUser: false,
        };
    }

    componentDidMount() {
        try {
            fetch("http://127.0.0.1:5000/get_events") 
                .then((res) => res.json())
                .then((event) => {
                    const now = new Date();
                    const upcomingEvents = event.data.filter(event => new Date(event.countdown_date) > now);
                    const pastEvents = event.data.filter(event => new Date(event.countdown_date) < now);
                    this.setState({
                        isLoaded: true,
                        upcomingEvents: upcomingEvents,
                        pastEvents: pastEvents,
                    });
                }, 
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    });
                });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while trying to fetch events');
        }
    }

    render() {
        const { error, isLoaded, upcomingEvents, pastEvents } = this.state;
        const { setIsAdmin, isAdmin, setIsUser, isUser } = this.props;
        const allEvents = [...upcomingEvents, ...pastEvents];

            if (isAdmin === true) {
                return <AdminRoutes allEvents={allEvents} error={error} isLoaded={isLoaded} setIsAdmin={setIsAdmin} isAdmin={isAdmin}/>;
            } else if (isUser === true) {
                return <UserRoutes upcomingEvents={upcomingEvents} pastEvents={pastEvents} error={error} isLoaded={isLoaded} setIsUser={setIsUser} isUser={isUser}/>;
            } else {
                return <Default upcomingEvents={upcomingEvents} pastEvents={pastEvents} error={error} isLoaded={isLoaded} setIsAdmin={setIsAdmin} setIsUser={setIsUser} isUser={isUser}/>;
            }
        }
    }

export default AllEvents;