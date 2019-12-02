import React from 'react'
import $ from 'jquery'

import config from '../../config'
import Post from './Post'
import NewPost from './NewPost'
import './master.css'


export default props => {
  
  const [newPost, setNewPost] = React.useState({body: '', image: ''})
  const [posts, setPosts] = React.useState([])
  const [postsData, setPostsData] = React.useState([])
  const userInfos = props.userInfos

  React.useEffect(() => {
    getPosts()
  }, [])

  function handleNewPost(e) {
    const {name, value} = e.target;

    setNewPost({
      ...newPost,
      [name]: e.target.files ? e.target.files[0] : value
    })
  }

  function handlePublish() {
    if (Object.keys(newPost).length > 0) {
      const form = new FormData()
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
      let clonedData = [...postsData]
      clonedData.push(r);
      setPostsData(clonedData[0])

      //let clonedData = [...postsData];
      //clonedData.push(r.r)

      // console.log(clonedData)
  
      
      
      //Merge if needed the old data with the new
      /*if (!oldData) oldData = r.r
      else Array.prototype.unshift.apply(oldData, r.r)
      
      // Remove duplicates
      oldData = [...new Set(oldData)]

      setPostsData(oldData)*/
    })
  }

  return (
    <div className="Home-Main">
      <div className="PostViewer">
        <NewPost 
          handleNewPost={handleNewPost} 
          newPost={newPost} 
          handlePublish={handlePublish} 
        />
        {postsData.length && postsData.map(post => (
          <Post 
            key={post._id} 
            _id={post._id} 
            username={post.username} 
            owner={post.owner} 
            body={post.body} 
            image={post.image} 
            date={post.date} 
          />
        ))}
      </div>
    </div>
  )

}