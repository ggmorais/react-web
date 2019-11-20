import React from 'react'
import $ from 'jquery'
import Header from '../Header'
import Post from './Post'
import NewPost from './NewPost'
import './master.css'
import Form from '../Login/Form'


export default props => {
  
  React.useEffect(() => {
    if (!localStorage.getItem('@react-web/auth')) {
      props.history.push('/login')
    }
  }, [])
  
  if (!localStorage.getItem('@react-web/auth')) return <div/>

  const [newPost, setNewPost] = React.useState({body: '', image: ''})

  function handleNewPost(e) {
    const {name, value} = e.target

    setNewPost({
      ...newPost,
      [name]: e.target.files ? e.target.files[0] : value
    })

  }

  function handlePublish() {
    if (Object.keys(newPost).length > 0) {
      var form = new FormData()
      form.append('image', newPost.image)
      form.append('body', newPost.body)

      $.ajax({
        url: `${props.api}/insertPost`,
        method: 'post',
        data: form,
        cache: false,
        contentType: false,
        processData: false,
        success: r => {
          console.log(r)
        }
      })
    }
  }

  return (
    <div className="Home">
      <div className="Background bg_white"></div>
      <Header />
      <div className="PostViewer">
        <NewPost handleNewPost={handleNewPost} newPost={newPost} handlePublish={handlePublish} />
        <Post />
      </div>
    </div>
  )

}