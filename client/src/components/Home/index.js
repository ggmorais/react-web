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
    } else {
      getPosts()
    }

  }, [])
  
  if (!localStorage.getItem('@react-web/auth')) return <div/>

  const [userInfos, setUserInfos] = React.useState(JSON.parse(localStorage.getItem('@react-web/userInfos')))
  const [newPost, setNewPost] = React.useState({body: '', image: ''})
  const [posts, setPosts] = React.useState([])

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
        url: `${props.api}/insertPost`,
        method: 'post',
        data: form,
        cache: false,
        contentType: false,
        processData: false,
        success: r => {
          if (r.done) {
            setNewPost({body: '', image: ''})
            getPosts()
          }
        }
      })
    }
  }

  function getPosts(limit = null) {
    console.log('Getting posts ...')

    $.get(`${props.api}/getPosts`, r => {
      setPosts(r.r.map(post => (
        <Post key={post._id} _id={post._id} username={post.username} owner={post.owner} body={post.body} image={post.image} date={post.date} />
      )))
    })
  }

  return (
    <div className="Home">
      <div className="Background bg_home"></div>
      <Header userInfos={userInfos} />
      <div className="PostViewer">
        <NewPost handleNewPost={handleNewPost} newPost={newPost} handlePublish={handlePublish} />
        {posts}
      </div>
    </div>
  )

}