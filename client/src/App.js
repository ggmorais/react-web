import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import Posts from './components/Posts'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import Error from './components/Error'


export default props => {

    const [api, setApi] = React.useState('http://localhost:3001')
    const [page, setPage] = React.useState({
        'actual': 'Login',
        'pages': {
            'Posts': <Posts api={api} />,
            'Login': <Login api={api} redirect={handlePages}/>,
            'Register': <Register api={api} />
    }})

    function handlePages(e) {
        setPage({
            ...page,
            actual: e.target.name
        })
    }

    return (
         <BrowserRouter>
            <TransitionGroup>
                <CSSTransition timeout="300" classNames="fade">
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route component={Error} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
         </BrowserRouter>

    )

}