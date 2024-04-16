import classes from './Comments.module.css';
import React from 'react';


class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.commentRef = React.createRef();
        this.state = {
            userId: localStorage.getItem("user_id"),
            eventId: props.eventId,
            isUser: props.isUser,
            comments: [],
            error: null, 
            isLoaded: false,
            showAllComments: false, 
        };
    }
    
    addComment = async (event) => {
        event.preventDefault();

        if (this.state.isUser === true) {
            const res = await fetch("http://127.0.0.1:5000/save_comment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.state.userId,
                    event_id: this.state.eventId,
                    comment: this.commentRef.current.value,
                }),
                
            })
            
            if (res.status === 200) {
                alert("Comment Added");
            } else if (res.status === 201) {
                alert("Must be rsvpd to comment");
            } else {
                alert("Comment Failed");
            }

        } else {
            alert("You need to be logged in to leave a comment");
        }
    }

    componentDidMount() {
        try {
            fetch(`http://127.0.0.1:5000/get_comments/${this.state.eventId}`)
            .then((res) => res.json()
            .then(
                (comments) => {
                    this.setState({
                        isLoaded: true,
                        comments: comments.data,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    });
                }
            ));
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while trying to get comments');
        }
    }
    showMoreComments = () => {
        this.setState({showAllComments: true});
    }
    showLessComments = () => {
        this.setState({ showAllComments: false });
    }

    render() {
        const { error, isLoaded, comments, showAllComments } = this.state;
        const commentsToDisplay = showAllComments ? comments : comments.slice(0, 1);

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <div className={classes.comments}> 
                    <label htmlFor="comment"></label>
                    <input type="text" name="comment" id="comment" ref={this.commentRef} />
                    <button onClick={this.addComment}>Add Comment</button>
                </div>
                <div>
                    {commentsToDisplay.map(comment => (
                        <div key={comment.id} className={classes.comment}>
                            <p>{comment.email}: {comment.comment}</p>
                        </div>
                    ))}
                </div>
                {!showAllComments && comments.length > 1 && <button onClick={this.showMoreComments}>More Comments</button>}
                {showAllComments && <button onClick={this.showLessComments}>Less Comments</button>}
            </div>
        );
    }
}
export default Comments;