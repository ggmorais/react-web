import React from 'react'
import $ from 'jquery'
import { Redirect } from 'react-router-dom'

import Form from './Form'
import './master.css'


export default props => {

  const [form, setForm] = React.useState({})
  const [warn, setWarn] = React.useState('')
  
  React.useEffect(() => {
    if (localStorage.getItem('@react-web/auth'))
        props.history.push('/home')
  }, [])

  if (localStorage.getItem('@react-web/auth')) return <div/>

  function handleForm(e) {
    const {name, value} = e.target

    setForm({
      ...form,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    $.post(`${props.api}/login`, form, r => {
      setWarn()
      if (r.e)
        return setWarn('Error. Please try again later.')
      if (r.r.length === 0)
        return setWarn('Username or password incorrect.')
      else {
        localStorage.setItem('@react-web/auth', true)
        props.history.push('/home')
      }
        
    })
  }

  return (
    <div className="Login main">
      <Form handleForm={handleForm} handleSubmit={handleSubmit} warning={warn}/>
    </div>
  )

}