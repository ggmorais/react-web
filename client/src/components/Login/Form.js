import React from 'react'
import {NavLink} from 'react-router-dom'


export default props => {

    return (
        <div className="Form">
            <h1>Login</h1>
            <p style={{display: props.warning ? 'block' : 'none'}} className="Login-warning">
                {props.warning}
            </p>
            <label>Username</label>
            <input name="username" required="required" onChange={props.handleForm} className="Login-inputs" type="email"/>
            <label>Password</label>
            <input name="password" required="required" onChange={props.handleForm} className="Login-inputs" type="password"/>
            <div className="Login-button-center">
                <button>LOGIN</button>
            </div>
            <p className="Login-signup">Don't have an account? <a href="/register">Sign up</a> now for free</p>
        </div>
    )

}