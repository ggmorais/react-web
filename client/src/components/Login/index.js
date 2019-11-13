import React from 'react'
import $ from 'jquery'

import Form from './Form'
import './master.css'


export default props => {

    return (
        <div className="Login">
            <div className="React-background"></div>
            <Form redirect={props.redirect}/>
        </div>
    )

}