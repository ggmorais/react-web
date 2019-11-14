import React from 'react'
import { Link } from 'react-router-dom'


export default props => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div className="Form">
        <h1>Login</h1>
        <p style={{ display: props.warning ? 'block' : 'none' }} className="Warning">
          {props.warning}
        </p>
        <label>Username</label>
        <input name="username" required="required" onChange={props.handleForm} className="Login-inputs" type="text" />
        <label>Password</label>
        <input name="password" required="required" onChange={props.handleForm} className="Login-inputs" type="password" />
        <div className="Login-button-center">
          <button>LOGIN</button>
        </div>
        <p className="Login-signup">Don't have an account? <Link to="/register">Sign up</Link> now for free</p>
      </div>
    </form>
  )

}