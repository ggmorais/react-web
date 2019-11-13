import React from 'react'


export default props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <h1>Create new account</h1>
            <p style={{display: props.warning ? 'block' : 'none'}} className="Register-warning shake">
                {props.warning}
            </p>
            <label className="shake-slow">Your first name</label>
            <input name="firstName" required="required" onChange={props.handleForm} className="Register-inputs" type="text"/>
            <label>Your last name</label>
            <input name="lastName" required="required" onChange={props.handleForm} className="Register-inputs" type="text"/>
            <label>Username</label>
            <input name="username" required="required" onChange={props.handleForm} className="Register-inputs" type="text"/>
            <label>E-mail</label>
            <input name="email" required="required" onChange={props.handleForm} className="Register-inputs" type="email"/>
            <label>Password</label>
            <input name="password" required="required" onChange={props.handleForm} className="Register-inputs" type="password"/>
            <div className="Register-button-center">
                <button>CREATE</button>
            </div>
        </form>
    )
}