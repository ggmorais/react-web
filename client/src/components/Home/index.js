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
  }, [])
  
  if (!localStorage.getItem('@react-web/auth')) return <div/>

  const [userInfos, setUserInfos] = React.useState(JSON.parse(localStorage.getItem('@react-web/userInfos')))
  const [page, setPage] = React.useState('Main')
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