import React from 'react'

import './master.css'


export default props => {

    return (
        <div className="Header">
            <header>
                <h2>RWeb</h2>
                <button name="Posts" onClick={props.handlePages}>posts</button>
                <button name="Login" onClick={props.handlePages}>login</button>
                <button name="Register" onClick={props.handlePages}>register</button>
            </header>
        </div>
    )

}
