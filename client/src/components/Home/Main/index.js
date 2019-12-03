import React from 'react'
import $ from 'jquery'

import config from '../../config'
import Post from './Post'
import NewPost from './NewPost'
import Warn from '../../Warn'
import './master.css'


export default props => {
  
  const [newPost, setNewPost] = React.useState({body: '', image: ''});
  const [warn, setWarn] = React.useState();
  const [postsData, setPostsData] = React.useState([]);
  const userInfos = props.userInfos;

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

      setWarn();

      if (!r.length) {
        setWarn('We don\'t have any post to show. Try adding some friends!');
        return;
      }

      let oldData = postsData;

      //Merge if needed the old data with the new
      if (!oldData) oldData = r
      else Array.prototype.unshift.apply(oldData, r)
      
      // Remove duplicates
      oldData = [...new Set(oldData)]

      setPostsData(oldData)
    })
  }

  function deletePost(id) {
    $.post(`${config.api}/deletePost`, {_id: id}, r => {
      let target = '#' + id
      let data = [...postsData];

      for (let i in data) {
        if (data[i]._id === id) {
          data.splice(i, 1);
        }
      }

      $(target).css('overflow-y', 'hidden');
      $(target).animate({
        height: 0,
        marginTop: '-70px'
      }, 700);
      setTimeout(() => {
        setPostsData(data);
      }, 1000);
      
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
        {!postsData.length && 
        <Warn color="#444444" message="We don't have any post to show now. Change it by adding some friends!"/>}
        {postsData && postsData.map(post => (
          <Post
            key={post._id} 
            _id={post._id}
            deletePost={deletePost}
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