import React from "react";
import classes from './Login.module.css';


function Login({ setIsAdmin, setIsUser }) {
    const [isSignup, setIsSignup] = React.useState(false);
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const ageRef = React.useRef();
    const nameRef = React.useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = isSignup ? "http://127.0.0.1:5000/user_signup" : "http://127.0.0.1:5000/user_authentication";
        const body = isSignup ? {
            name: nameRef.current.value,
            age: ageRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
        } : {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            if (res.status === 205) {
                alert(isSignup ? "Signup Success" : "Login success" );
                const data = await res.json();
                localStorage.setItem("user_id", data["user_id"]);
                setIsAdmin(true);
            

            } else if (res.status === 200) {
                alert(isSignup ? "Signup Success" : "Login success" );
                const data = await res.json();
                localStorage.setItem("user_id", data["user_id"]);
                setIsUser(true);
            }
            else {
                alert(isSignup ? "Signup Failed" : "Login Failed");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while trying to login/signup');
        }
    };

    return (
        <div className={classes.form}>
            <form onSubmit={handleSubmit}>
                <div className={classes.actions}>
                    <h1>{isSignup ? "Signup" : "Login"}</h1>
                </div>
                {isSignup && (
                    <div className={classes.actions}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" ref={nameRef} required/>
                    </div>
                )}
                {isSignup && (
                    <div className={classes.actions}>
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" name="age" ref={ageRef} required/>
                    </div>
                )}
                <div className={classes.actions}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" ref={emailRef} required/>
                </div>
                <div className={classes.actions}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" ref={passwordRef} required/>
                </div>
                <div className={classes.actions}>
                    <button type="submit">{isSignup ? "Signup" : "Login"}</button>
                </div>
            </form>
            <button onClick={() => setIsSignup(!isSignup)}>{isSignup ? "Already a member? Login" : "Not a member? Signup"}</button>
        </div>
    );
}

export default Login;