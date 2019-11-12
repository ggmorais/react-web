import React from 'react'
import $ from 'jquery'

import Form from './Form'
import './master.css'


export default props => {

    const [form, setForm] = React.useState({})

    function handleForm(e) {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        $.post(`${props.api}/insertUser`, form, r => {
            console.log(r)
        })
    }

    return (
        <div className="Register">
            <Form handleSubmit={handleSubmit} handleForm={handleForm} warning={true} />
        </div>
    )

}