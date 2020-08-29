import React, { Component } from 'react';
class RegisterContainer extends Component {
    render() {
        return (
            <>
            <div className="register-hero">
                    <h3>Thank you for becoming a member!</h3>
            </div>
            <div className="register-wrapper">
                <div classNam="sign-in">
                    <form>
                        <h2>Returning Customer</h2>
                        <input type="text" placeholder="Email Address" />
                        <input type="text" placeholder="Password" />
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className="register">
                    
                    <form>
                        <h2>Create an account</h2>
                        <input type="text" placeholder="Full Name"/>
                        <input type="text" placeholder="Email Address"/>
                        <input type="text" placeholder="Password"/>
                        <input type="text" placeholder="Confirm Password"/>
                        <button type="submit">Create Account</button>
                    </form>
                </div>
            </div>
            </>
        )
    }
}
export default RegisterContainer;