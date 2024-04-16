import React from "react";
import classes from './Attendees.module.css';



class Attendees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: null,
            didLoad: false,
        }
    }

    componentDidMount() {
        fetch ("http://127.0.0.1:5000/get_users")
            .then((res) => res.json())
            .then((users) => {
                this.setState({
                    isLoaded: true,
                    users: users.data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error,
            });
        });
    }

    render () {
        const { users, error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div className={classes.container}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>{user.event_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }       
}
export default Attendees;