import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    state={
        email: "",
        password: ""
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const target = event.target;

        if (target.email.value &&  target.password.value) {
            this.props.handleLogin(this.state);
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Returning Customer</h2>
                <input required name="email" onChange={this.handleChange} type="email" placeholder="Email Address" />
                <input required name="password" onChange={this.handleChange} type="password" placeholder="Password" />
                <button type="submit">Sign In</button>
                <Link to="">Forgot password?</Link>
            </form>
        )
    }
}
export default LoginForm;