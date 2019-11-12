import React from 'react'
import Posts from './components/Posts'
import Login from './components/Login'
import Register from './components/Register'


export default props => {

    const [api, setApi] = React.useState('http://localhost:3001')
    const [page, setPage] = React.useState({
        'actual': 'Register',
        'pages': {
            'Posts': <Posts api={api} />,
            'Login': <Login />,
            'Register': <Register />
    }})

    function handlePages(e) {
        setPage({
            ...page,
            actual: e.target.name
        })
    }

    return (
        <div className="App">
            <div style={{width: '100%', display: 'inline-block'}}>
                <button name="Posts" onClick={handlePages}>posts</button>
                <button name="Login" onClick={handlePages}>login</button>
                <button name="Register" onClick={handlePages}>register</button>
            </div>
            {page.pages[page.actual]}
        </div>
    )

}