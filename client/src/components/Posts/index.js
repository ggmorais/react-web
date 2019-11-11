import React from 'react'
import $ from 'jquery'
import View from './View'
import Insert from './Insert'
import './master.css'


export default props => {

    const [posts, setPosts] = React.useState()
    const [form, setForm] = React.useState()

    function getPosts() {
        $.get(`${props.api}/getPosts`, r => {
            setPosts(r.map(post => (<View key={post.id} data={post} />)))
        })
    }

    function insertPost(e) {
        e.preventDefault()
        $.post(`${props.api}/insertPost`, form, r => {
            console.log(r)
        })
    }

    function handleForm(e) {
        const {name, value} = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    React.useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="Posts">
            <Insert handleForm={handleForm} insertPost={insertPost}/>
            {posts}
        </div>
    )

}