import React from 'react'


export default props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>Your first name</label>
            <input name="firstName" onChange={props.handleForm} className="Register-inputs" type="text"/>
            <label>Your last name</label>
            <input name="lastName" onChange={props.handleForm} className="Register-inputs" type="text"/>
            <label>Username</label>
            <input name="email" onChange={props.handleForm} className="Register-inputs" type="text"/>
            <label>E-mail</label>
            <input name="password" onChange={props.handleForm} className="Register-inputs" type="email"/>
            <label>Password</label>
            <input name="password" onChange={props.handleForm} className="Register-inputs" type="password"/>
            <div className="Register-button-center">
                <button>DONE</button>
            </div>
        </form>
    )
}