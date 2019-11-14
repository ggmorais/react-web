import React from 'react'
import Header from '../Header'


export default props => {
  
  if (!localStorage.getItem('@react-web/auth')) {
    props.history.push('/login')
  }

  return (
    <div className="Home">
      <div className="Background bg_white"></div>
      <Header />
      <p>Home page!</p>
    </div>
  )

}