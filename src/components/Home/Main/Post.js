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

  var date = props.date.split(' ');
  var date = date[4].substr(0, 5) + ' ' + date[0]

  React.useEffect(() => {
    getCommentaries()
    
    if (props.likeList) {
      if (props.likeList.includes(props.userInfos.username))
        setLiked(1);
    }
    if (props.dislikeList) {
      if (props.dislikeList.includes(props.userInfos.username)) {
        setLiked(-1);
      }
    }
  }, [])

  const getCommentaries = () => {
    console.log('Getting commentaries ...')

    $.get(`${config.api}/getCommentaries`, {_id: props._id}, r => {
      setCommentData(r);
    })
  }

  return (
    <div className="Post" id={props._id}>
      <div className="Post-userImage">
        <img src={`${config.api}/public/user_images/${props.username}.png`} />
      </div>
      <p style={{padding: '15px', fontSize: '15px', color: '#00000073'}}>
        <b style={{color: '#5c7ee9db'}}>{props.owner}</b> posted at <b>{date}</b>
        {props.username === JSON.parse(localStorage.getItem('@react-web/userInfos')).username ? <a onClick={props.deletePost.bind(this, props._id)} style={{cursor: 'pointer', float: 'right'}}>Delete</a> : null}
      </p>
      <p className="Post-content">{props.body}</p>
      <div className="Post-image">
        {props.image ? <img src={`${config.api}/public/post_images/${props.image}`} /> : ''}
      </div>
      <div className="Post-actions">
        {/* <img src={like} className="img_actions"/>
        <img src={dislike} className="img_actions"/> */}
        <div onClick={props.handleLike.bind(this, props._id, liked > 0 ? 0 : 1)} className="actions" style={{backgroundImage: liked > 0 ? `url("${like}")` : `url("${like_black}")`}}>
          <p>{props.likeList ? props.likeList.length : 0}</p>
        </div>
        <div onClick={props.handleLike.bind(this, props._id, liked < 0 ? 0 : -1)} className="actions" style={{backgroundImage: liked < 0 ? `url("${dislike}")` : `url("${dislike_black}")`}}>
          <p>{props.dislikeList ? props.dislikeList.length : 0}</p>
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