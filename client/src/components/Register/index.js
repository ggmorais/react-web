import React from 'react'
import $ from 'jquery'

import Form from './Form'
import './master.css'


export default props => {

    const [form, setForm] = React.useState({})

    function handleForm(e) {
        const {name, value} = e.target
    }

    function handleSubmit(e) {
        console.log('enviando ..')
    }

    return (
        <div className="Register">
            <Form />
        </div>
    )

}