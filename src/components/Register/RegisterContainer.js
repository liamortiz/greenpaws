import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import {BASE_URL} from '../../App';

class RegisterContainer extends Component {

    errorElement = React.createRef();
    accountExistsElement = React.createRef();

    handleLogin = (state) => {
        fetch(BASE_URL + '/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'user': state})
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.status === 401) {
                this.errorElement.current.style="display:block";
            } else {
                console.log(data);
            }
        })
    }
    handleSignUp = (state) => {
        fetch(BASE_URL + '/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'user': state})
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.status === 401) {
                console.log(data);
                this.accountExistsElement.current.style="display:block";
            } else {
                console.log(data);
            }
        })
    }

    render() {
        return (
            <>
            <div className="register-hero">
            <h3>Thank you for becoming a member!</h3>
            </div>
            <div className="register-wrapper">
                <div className="sign-in">
                    <LoginForm handleLogin={this.handleLogin} />
                    <p ref={this.errorElement} className="error-messages">Incorrect Email or password.</p>
                </div>
                <div className="register">
                    <RegisterForm handleSignUp={this.handleSignUp} />
                    <p ref={this.accountExistsElement} className="error-messages">Email is already in use or password is too short.</p>
                </div>
            </div>
            </>
        )
    }
}
export default RegisterContainer;