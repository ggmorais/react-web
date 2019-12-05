import React from 'react'
import { Link } from 'react-router-dom'


export default props => {

  return (
    <form onSubmit={props.handleSubmit} >
      <input type="hidden" value="something" />
      <h1>Create new account</h1>
      <p style={{ display: props.warning ? 'block' : 'none' }} className="Warning">
        {props.warning}
      </p>
      <label className="shake-slow">Your first name</label>
      <input name="firstName" autoComplete="new-password" required="required" onChange={props.handleForm} className="Register-inputs" type="text" />
      <label>Your last name</label>
      <input name="lastName" autoComplete="new-password" required="required" onChange={props.handleForm} className="Register-inputs" type="text" />
      <label>Username</label>
      <input name="username" autoComplete="new-password" required="required" onChange={props.handleForm} className="Register-inputs" type="text" />
      <label>E-mail</label>
      <input name="email" autoComplete="off" required="required" onChange={props.handleForm} className="Register-inputs" type="email" />
      <label>Password</label>
      <input name="password" autoComplete="new-password" required="required" onChange={props.handleForm} className="Register-inputs" type="password" />
      <div className="Register-button-center">
        <button>CREATE</button>
      </div>
      <p className="Register-signup">Already have an account? <Link to="/login">Sign in</Link></p>
    </form>
  )
  
}