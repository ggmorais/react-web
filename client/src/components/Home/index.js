import React from 'react'
import Header from '../Header'


export default props => {
  
  React.useEffect(() => {
    if (!localStorage.getItem('@react-web/auth')) {
      props.history.push('/login')
    }
  }, [])
  
  if (!localStorage.getItem('@react-web/auth')) return <div/>

  return (
    <div className="Home">
      <div className="Background bg_white"></div>
      <Header />
      <p>Home page!</p>
    </div>
  )

}