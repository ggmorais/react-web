import React from 'react'
import $ from 'jquery'

import Form from './Form'
import './master.css'
import background from '../assets/bg_react.png'


export default props => {

    const [form, setForm] = React.useState({})
    const [warn, setWarn] = React.useState('')

    function handleForm(e) {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setWarn()
        $.post(`${props.api}/insertUser`, form, r => {
            if (r.err)
                setWarn(r.err)
        })
    }

    return (
        <div className="Register">
            <div className="React-background"></div>
            <Form handleSubmit={handleSubmit} handleForm={handleForm} warning={warn} />
        </div>
    )

}