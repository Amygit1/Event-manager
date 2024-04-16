import React from 'react';
import classes from './CountDown.module.css';

class Countdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            active: true
        };
    }

    componentDidMount() {
        this.updateCountdown();
        this.interval = setInterval(this.updateCountdown, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate() {
        if (this.state.days <= 0 && this.state.hours <= 0 && this.state.minutes <= 0 && this.state.seconds <= 0) {
            if (this.state.active) {
                this.setState({ active: false });
            }
        }
    }   

    updateCountdown = () => {
        const eventDate = new Date(this.props.date);
        const now = new Date();

        const diff = eventDate - now;

        this.setState({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        });
    };

    render() {
        if (this.state.active) {
            return (
                <div className={classes.countdown}>
                    Click to rsvp
                    <div>
                        <h1><days>{this.state.days}d</days> </h1>
                    </div>
                    <div>
                        <span><hours>{this.state.hours}h</hours> </span>
                        <span><minutes>{this.state.minutes}m</minutes> </span>
                        <span><seconds>{this.state.seconds}s</seconds> </span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={classes.countdown}>
                    Can no longer sign up
                </div>
            );
        }
    }
}
export default Countdown;