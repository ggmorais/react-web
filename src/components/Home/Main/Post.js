import React from 'react'
import $ from 'jquery'
import config from '../../config'
import Commentary from './Commentary'
import NewCommentary from './NewCommentary'
import textareaAutoHeight from '../../tools/textareaAutoHeight'

import like from '../../assets/img_like_blue.png'
import dislike from '../../assets/img_dislike_red.png'
import like_black from '../../assets/img_like_black.png'
import dislike_black from '../../assets/img_dislike_black.png'


export default props => {

  const [commentData, setCommentData] = React.useState([])
  const [liked, setLiked] = React.useState(0);
  const [likesCount, setLikesCount] = React.useState({likes: 0, dislikes: 0});

  var date = props.date.split(' ');
  var date = date[4].substr(0, 5) + ' ' + date[0]

  React.useEffect(() => {
    getCommentaries()
    
    if (props.likeList) {
      // console.log(props.likeList, props.likeList.includes(props.userInfos.username), props.body)
      if (props.likeList.includes(props.userInfos.username)) {
        setLiked(1);
      }
    }
    if (props.dislikeList) {
      if (props.dislikeList.includes(props.userInfos.username)) {
        setLiked(-1);
      }
    }

    setLikesCount({likes: props.likesList ? props.likesList.length : 0, dislikes: props.dislikeList ? props.dislikeList.length : 0});
  }, [])

  const getCommentaries = () => {
    console.log('Getting commentaries ...')

    $.get(`${config.api}/getCommentaries`, {_id: props._id}, r => {
      setCommentData(r);
    })
  }

  const handleLike = (type) => {
    if (type === 1) {
      props.handleLike(props._id, liked > 0 ? 0 : 1);
      setLiked(liked > 0 ? 0 : 1);
    } else if (type === -1) {
      props.handleLike(props._id, liked < 0 ? 0 : -1);
      setLiked(liked < 0 ? 0 : -1);
    }
    
  }

  //console.log(likesCount, liked, props.body);

  return (
    <div className="Post" id={props._id}>
      <div className="Post-userImage">
        <img src={`${config.api}/public/user_images/${props.username}.png`} />
      </div>
      <p style={{padding: '15px', fontSize: '15px', color: '#00000073'}}>
        <b style={{color: '#5c7ee9db'}}>{props.owner}</b> posted at <b>{date}</b>
        {props.username === JSON.parse(localStorage.getItem('@react-web/userInfos')).username && 
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
          onClick={handleLike.bind(this, 1)} 
          className="actions" 
          style={{backgroundImage: liked > 0 ? `url("${like}")` : `url("${like_black}")`}}
        >
          <p>{props.likeList === true ? props.likeList.length : 0}</p>
        </div>
        <div 
          onClick={handleLike.bind(this, -1)} 
          className="actions" 
          style={{backgroundImage: liked < 0 ? `url("${dislike}")` : `url("${dislike_black}")`}}
        >
          <p>{props.dislikeList === true ? props.dislikeList.length : 0}</p>
        </div>
      </div>
      <div className="Commentaries">
        <div className="Commentary-list">
          {commentData && commentData.map(r => <Commentary key={r._id} infos={r} />)}
        </div>
        <div className="NewCommentary">
          <NewCommentary _id={props._id} getCommentaries={getCommentaries} />
        </div>
      </div>
    </div>
  )
}