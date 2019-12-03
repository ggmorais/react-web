import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import config from './components/config'
import Login from './components/Login'
import Register from './components/Register'
import Error from './components/Error'
import Home from './components/Home'


export default props => {

  const [page, setPage] = React.useState(document.location.pathname)

  React.useEffect(() => {
    setPage(document.location.pathname.substr(1).toUpperCase())
  }, [document.location.pathname])

  const BG = {
    '/login': 'bg_react',
    '/register': 'bg_react',
    '/account': 'bg_home',
    '/home': 'bg_home',
    '/main': 'bg_home'
  }

  document.title = page

  return (
    <div className="App">
      <div className={'Background ' + BG[document.location.pathname]}></div>
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={450} 
            classNames="fade"
          >
            <Switch location={location}>
              <Route exact path="/" render={props => <Home {...props} />} />
              
              <Route path="/account" render={props => <Home {...props} />} />
              <Route path="/main" render={props => <Home {...props} />} />
              <Route path="/login" render={props => <Login {...props} />} />
              <Route path="/register" render={props => <Register {...props} />} />
              <Route path="*" render={props => <Home {...props} />} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    </div>
  )

}