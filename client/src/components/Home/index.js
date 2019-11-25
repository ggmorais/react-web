import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import Header from '../Header'
import Main from './Main'
import Account from './Account'
import './master.css'


export default props => {

  React.useEffect(() => {
    if (!localStorage.getItem('@react-web/auth')) {
      props.history.push('/login')
    }
    if (document.location.pathname.length > 1) {
      let name = document.location.pathname.substr(1)
      name = name[0].toUpperCase() + name.substr(1)
      if (pages[name]) setPage(name)
    }
  }, [])

  if (!localStorage.getItem('@react-web/auth')) return <div/>
  
  const [page, setPage] = React.useState('Main')
  const userInfos = JSON.parse(localStorage.getItem('@react-web/userInfos'))
  const pages = {
    Main: <Main userInfos={userInfos} />,
    Account: <Account />
  }

  return (
    <div className="Home">
      <div className="Background bg_home"></div>
      <Header userInfos={userInfos} setPage={setPage} />
      {pages[page]}
    </div>
  )
  
}