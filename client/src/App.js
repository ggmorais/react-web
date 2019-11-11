import React from 'react'
import Posts from './components/Posts'


export default props => {

    const [api, setApi] = React.useState('http://localhost:3001')

    return (
        <div className="App">
            <Posts api={api} />
        </div>
    )

}