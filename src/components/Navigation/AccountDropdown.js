import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AccountDropdown = (props) => {
    function signOut() {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <>
            <div>
                {props.token &&
                <>
                    
                    <button className="btn" onClick={signOut}>Sign Out</button>
                </>
                }
                {!props.token &&
                    <>
                        <Link to="/register" className="btn">Log In</Link>
                        <Link to="/register" className="btn">Create Account</Link>
                    </>
                }
                
            </div>
        </>
    )
}
const mstp = state => {
    return {
      token: state.users.token
    }
  }
  export default connect(mstp, null)(AccountDropdown);