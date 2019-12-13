import React from 'react';
import $ from 'jquery';
import config from '../../config';
import Content from './Content';
import Warn from '../../Warn';
import '../Main/master.css';


export default props => {

  const [postsData, setPostsData] = React.useState();

  const userInfos = JSON.parse(localStorage.getItem('@react-web/userInfos'));

  const getPosts = (where = null) => {
    $.get(`${config.api}/getPosts`, r => {
      setPostsData(r);
    })
  }

  const handleLike = (id, type) => {
    $.post(`${config.api}/insertLikes`, {_id: id, username: userInfos.username, type: type});
  }

  const deletePost = (id) => {
    $.post(`${config.api}/deletePost`, {_id: id}, r => {
      // Find the deleted and remove from postsData
      let data = [...postsData];
      for (let i in data) {
        if (data[i]._id === id) {
          data.splice(i, id);
        }
      }

      setPostsData(data);
    })
  }

  React.useEffect(() => {
    getPosts();
  })
  
  return (
    <div className="Post" id={props._id}>
      {postsData && postsData.map(r => (
        <Content 
          key={r._id}
          _id={r._id}
          username={r.username}
          body={r.body}
          date={r.date}
          commentaries={r.commentaries}
          image={r.image}
          likeList={r.likeList}
          dislikeList={r.dislikeList}
          handleLike={handleLike}
          deletePost={deletePost}            
        />
      ))}
      <Warn color="#444444" message="We don't have any post to show now. Change it by adding some friends!"/>
    </div>
  )
}