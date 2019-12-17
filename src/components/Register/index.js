import React from 'react'
import $ from 'jquery'

import config from '../config'
import local from '../location'
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
        $.post(`${config.api}/insertUser`, form, r => {
            if (r.err)
                return setWarn(r.err)

            local.set('login')
            window.location.reload();

        })
    }

    React.useEffect(() => {
        if (localStorage.getItem('@react-web/auth'))
            //props.history.push('/home')
            local.set('main')
    }, [])

    if (localStorage.getItem('@react-web/auth')) return <div/>

    return (
        <div className="Register">
            <Form handleSubmit={handleSubmit} handleForm={handleForm} warning={warn} />
        </div>
    )

}