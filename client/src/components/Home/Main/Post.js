import React from 'react'
import $ from 'jquery'
import config from '../../config'
import Commentary from './Commentary'
import NewCommentary from './NewCommentary'
import like from '../../assets/img_like.png'
import dislike from '../../assets/img_dislike.png'
import textareaAutoHeight from '../../tools/textareaAutoHeight'


export default props => {

  const [commentaries, setCommentaries] = React.useState([])
  const [deleted, setDeleted] = React.useState(false)

  var date = props.date.split(' ');
  // 0 = day in week
  // 1 = mouth
  // 2 = day in number
  // 3 = year
  // 4 = exact time
  // 5 = gmt stuff
  // var date = date[4].substr(0, 2) + 'h ' + date[4].substr(3, 2) + 'm '
  var date = date[4].substr(0, 5) + ' ' + date[0]

  React.useEffect(() => {
    // textareaAutoHeight('.NewCommentary')
    getCommentaries()
  }, [])

  function getCommentaries() {
    console.log('Getting commentaries ...')
    $.get(`${config.api}/getCommentaries`, {_id: props._id}, r => {
      console.log(r)
      setCommentaries(Object.values(r).map(r => (
        <Commentary key={r._id} infos={r} />
      )))
    })
  }

  function deletePost() {
    $.post(`${config.api}/deletePost`, {_id: props._id}, r => {
      //setDeleted(true)
      /*
      padding: 60px;
      text-align: center;
      color: #ef3447;
      font-size: 25px;
      */
      var id = '#' + props._id
      
      $(id).css('box-shadow', '0px 0px 4px #ef3447')
      $(id).empty()
      setDeleted(true)

      

    })
  }

  return (
    // <div className="Post" id={props._id} style={{display: deleted ? 'none' : 'block'}}>
    <div className="Post" id={props._id} >
      <p style={{padding: '15px', fontSize: '15px', color: '#00000073'}}>
        <b style={{color: '#5c7ee9db'}}>{props.owner}</b> posted at <b>{date}</b>
        {props.username === JSON.parse(localStorage.getItem('@react-web/userInfos')).username ? <p onClick={deletePost} style={{cursor: 'pointer', float: 'right'}}>Delete</p> : null}
      </p>
      <p style={{marginLeft: '15px'}}>{props.body}</p>
      <div className="Post-image">
        {props.image ? <img src={`${config.api}/public/images/${props.image}`} /> : ''}
      </div>
      <div className="Post-actions">
        <img src={like} className="img_actions"/>
        <img src={dislike} className="img_actions"/>
      </div>
      <div className="Commentaries">
        <div className="Commentary-list">
          {commentaries}
        </div>
        <div className="NewCommentary">
          <NewCommentary _id={props._id} getCommentaries={getCommentaries} />
        </div>
      </div>
      <p style={{
        padding: '60px',
        textAlign: 'center',
        color: '#ef3447',
        fontSize: '25px',
        display: deleted ? 'block' : 'none'
        }}>
        Deleted</p>
    </div>
  )
}