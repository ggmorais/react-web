import React from 'react';
import config from '../../config';

import Commentary from './Commentary';
import NewCommentary from './NewCommentary';

import './master.scss';

import like from '../../assets/img_like_blue.png';
import like_black from '../../assets/img_like_black.png';
import dislike from '../../assets/img_dislike_red.png';
import dislike_black from '../../assets/img_dislike_black.png';
import default_img from '../../assets/img_default.png';


export default props => {

  const [liked, setLiked] = React.useState(0);
  const [userImage, setUserImage] = React.useState(default_img);

  const userInfos = JSON.parse(localStorage.getItem('@react-web/userInfos'));

  // Format the date
  var date = props.date.split(' ');
  var date = date[4].substr(0, 5) + ' ' + date[0];

  React.useState(() => {
    console.log('Content updating');
    // Verify if the auth user has liked the post
    if (props.likeList) {
      if (props.likeList.includes(userInfos.username))
        setLiked(1);
    }

    if (props.dislikeList) {
      if (props.dislikeList.includes(userInfos.username))
        setLiked(-1);
    }

    fetch(`${config.api}/public/user_images/${props.username}.png`).then(r => {
      if (r.status === 200) {
        return r.blob();
      }
    }).then(r => {
      if (r)
        setUserImage(URL.createObjectURL(r)); 
    });
  }, []);
  
  

  return (
    <div className="Post">

      <div className="Post-userImage">
        <img src={userImage} />
      </div>

      <p style={{padding: '15px', fontSize: '15px', color: '#00000073'}}>
        <b style={{color: '#5c7ee9db'}}>{props.username}</b> posted at <b>{date}</b>

        {props.username === userInfos.username && 
          <a onClick={props.deletePost.bind(this, props._id)} style={{cursor: 'pointer', float: 'right'}}>
            Delete
          </a>}
      </p>


      <p className="Post-content">{props.body}</p>


      <div className="Post-image">
        {props.image ? <img src={`${config.api}/public/post_images/${props.image}`} /> : ''}
      </div>

      <div className="Post-actions">
        <div 
          onClick={() => { setLiked(liked > 0 ? 0 : 1); props.handleLike(props._id, liked > 0 ? 0 : 1) }} 
          className="actions" 
          style={{backgroundImage: liked > 0 ? `url("${like}")` : `url("${like_black}")`}}
        >
          <p>{props.likeList && props.likeList.length}</p>
        </div>

        <div 
          onClick={() => { setLiked(liked < 0 ? 0 : -1); props.handleLike(props._id, liked < 0 ? 0 : -1) }} 
          className="actions" 
          style={{backgroundImage: liked < 0 ? `url("${dislike}")` : `url("${dislike_black}")`}}
        >
          {<p>{props.dislikeList && props.dislikeList.length}</p>}
        </div>
      </div>
      

      <div className="Commentary-list">

        {props.commentaries && props.commentaries.map(r => (
          <Commentary
            key={r._id}
            _id={r._id}
            username={r.username}
            fullName={r.fullName}
            body={r.body}
            date={r.date}
          />
        ))}

      </div>

      <div className="NewCommentary">
        <NewCommentary
          _id={props._id}
          getPosts={props.getPosts}
        />
      </div>


    </div>
  )

}