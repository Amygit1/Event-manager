import classes from './PassedEvents.module.css';
import React from 'react';
import { useState } from 'react';
import Comments from './Comments';
import likeImage from '../like.jpg';



function EventCard({isUser, event, error, isLoaded}) {
    const [likes, setLikes] = useState(0);
    
    function AddLike() {
        setLikes(likes + 1);
    }

    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } 
    return (
        <div className={classes.event}>
            <div key={event.id} >
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
                    <div className={classes.likesContainer}>
                        <button onClick={AddLike}><img src={likeImage} alt="like"/></button>
                        <p>{likes}</p>
                    </div>
            </div>
            <Comments eventId={event.id} isUser={isUser}/>
        </div>
    );
}
function PassedEvents(props) {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const filteredEvents = props.events.filter(event =>
        event.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    const nextEvent = () => {
        setCurrentEventIndex((currentEventIndex + 1) % props.events.length);
    };

    if (filteredEvents.length > 0) {
        return (
            <div className={classes.topBar}>
                <div className={classes.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search for an event"
                        value={inputValue}
                        onChange={e => {
                            setInputValue(e.target.value)
                            setCurrentEventIndex(0)
                        }}
                    />
                    <span><button className="nextButton" onClick={nextEvent}>Next Event</button></span>
                    
                </div>
                    {filteredEvents.length > 0 && (
                        <EventCard key={filteredEvents[currentEventIndex].id} event={filteredEvents[currentEventIndex]} isUser={props.isUser} error={props.error} isLoaded={props.isLoaded}/>
                    )}
            </div>
        );
    } else {
        return (
            <div className={classes.topBar}>
                <div className={classes.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search for an event"
                        value={inputValue}
                        onChange={e => {
                            setInputValue(e.target.value)
                            setCurrentEventIndex(0)
                        }}
                    />
                    <span><button className="nextButton" onClick={nextEvent}>Next Event</button></span> 
                </div>
                <div>
                    <p>No events found</p>
                </div>
            </div>
                
        );
    } 
}

export default PassedEvents;