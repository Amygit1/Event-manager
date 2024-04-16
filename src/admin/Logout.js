import React from "react";


class Logout extends React.Component {
    componentDidMount() {
        if (this.props.setIsAdmin) {
            this.props.setIsAdmin(false);
            localStorage.clear();
            alert("You have been logged out");
            
        } else if (this.props.setIsUser) {
            this.props.setIsUser(false);
            localStorage.clear();
            alert("You have been logged out");
        }
    }
    render() {
        return null;
    }
}
export default Logout;