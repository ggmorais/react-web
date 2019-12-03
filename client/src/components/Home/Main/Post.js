import React from 'react'
import $ from 'jquery'
import config from '../../config'
import Commentary from './Commentary'
import NewCommentary from './NewCommentary'
import like from '../../assets/img_like.png'
import dislike from '../../assets/img_dislike.png'
import textareaAutoHeight from '../../tools/textareaAutoHeight'


export default props => {

  const [commentData, setCommentData] = React.useState([])

  var date = props.date.split(' ');
  var date = date[4].substr(0, 5) + ' ' + date[0]

  React.useEffect(() => {
    getCommentaries()
  }, [])

  function getCommentaries() {
    console.log('Getting commentaries ...')

    $.get(`${config.api}/getCommentaries`, {_id: props._id}, r => {
      setCommentData(r);
    })
  }

  return (
    <div className="Post" id={props._id}>
      <p style={{padding: '15px', fontSize: '15px', color: '#00000073'}}>
        <b style={{color: '#5c7ee9db'}}>{props.owner}</b> posted at <b>{date}</b>
        {props.username === JSON.parse(localStorage.getItem('@react-web/userInfos')).username ? <a onClick={props.deletePost.bind(this, props._id)} style={{cursor: 'pointer', float: 'right'}}>Delete</a> : null}
      </p>
      <p style={{marginLeft: '15px'}}>{props.body}</p>
      <div className="Post-image">
        {props.image ? <img src={`${config.api}/public/post_images/${props.image}`} /> : ''}
      </div>
      <div className="Post-actions">
        <img src={like} className="img_actions"/>
        <img src={dislike} className="img_actions"/>
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