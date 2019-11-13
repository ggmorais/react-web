import React from 'react'
import Posts from './components/Posts'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'


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
        console.log(e.target.name)
        setPage({
            ...page,
            actual: e.target.name
        })
    }

    return (
        <div className="App">
            <Header handlePages={handlePages} />
            {page.pages[page.actual]}
        </div>
    )

}