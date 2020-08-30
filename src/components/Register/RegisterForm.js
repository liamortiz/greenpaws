import React, { Component } from 'react';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: "",
            password: "",
            confirmPassword: "",
            email: ""
        }
        this.passwordMisMatch = React.createRef();
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const target = event.target;
        if (target.password.value !== target.confirmPassword.value) {
            this.passwordMisMatch.current.style="display: block";
            return;
        }
        this.props.handleSignUp(this.state);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Create an account</h2>
                <input onChange={this.handleChange} name="name" required type="text" placeholder="Full Name"/>
                <input onChange={this.handleChange} name="email" required type="email" placeholder="Email Address"/>
                <input onChange={this.handleChange} name="password" required type="password" placeholder="Password"/>
                <input onChange={this.handleChange} name="confirmPassword" required type="password" placeholder="Confirm Password"/>
                <p ref={this.passwordMisMatch} className="error-messages">Password and Confirm Password Don't Match</p>
                <button type="submit">Create Account</button>
            </form>
        )
    }
}
export default RegisterForm;