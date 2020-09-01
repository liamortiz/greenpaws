import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { loginUserAsync, registerUserAsync } from '../../redux/user';

class RegisterContainer extends Component {

    errorElement = React.createRef();
    accountExistsElement = React.createRef();

    handleLogin = (state) => {
        this.props.loginUserAsync(state)
        .catch(() => {
            this.errorElement.current.style="display:block";
        })
    }
    handleSignUp = (state) => {
        this.props.registerUserAsync(state)
        .catch(() => {
            this.accountExistsElement.current.style="display:block"
        });
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
export default connect(null, { loginUserAsync, registerUserAsync })(RegisterContainer);