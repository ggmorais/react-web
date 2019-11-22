import React from 'react'
import $ from 'jquery'

import config from '../../config'
import Post from './Post'
import NewPost from './NewPost'
import './master.css'


export default props => {
  
  const [newPost, setNewPost] = React.useState({body: '', image: ''})
  const [posts, setPosts] = React.useState([])
  const userInfos = props.userInfos

  React.useEffect(() => {
    getPosts()
  }, [])

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
      form.append('username', userInfos.username)
      form.append('owner', userInfos.firstName + ' ' + userInfos.lastName)
      form.append('date', new Date())
      
      $.ajax({
        url: `${config.api}/insertPost`,
        method: 'post',
        data: form,
        cache: false,
        contentType: false,
        processData: false,
        success: r => {
          if (r.done) {
            setNewPost({body: '', image: ''})
            getPosts(1)
          }
        }
      })
    }
  }

  function getPosts(limit = 50, find = {}) {
    console.log('Getting posts ...')

    $.get(`${config.api}/getPosts`, {limit: limit, find: find}, r => {
      var data = r.r.map(post => (
        <Post key={post._id} _id={post._id} username={post.username} owner={post.owner} body={post.body} image={post.image} date={post.date} />
      ))
      setPosts(data)
    })
  }

  return (
    <div className="Home-Main">
      <div className="PostViewer">
        <NewPost handleNewPost={handleNewPost} newPost={newPost} handlePublish={handlePublish} />
        {Array(posts)}
      </div>
    </div>
  )

}