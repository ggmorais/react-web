import React from 'react'
import $ from 'jquery'
import config from '../config'
import like from '../assets/img_like.png'
import dislike from '../assets/img_dislike.png'
import textareaAutoHeight from '../tools/textareaAutoHeight'


export default props => {

  const [commentaries, setCommentaries] = React.useState([])
  const [commentary, setCommentary] = React.useState('')

  var date = props.date.split(' ');
  // 0 = day in week
  // 1 = mouth
  // 2 = day in number
  // 3 = year
  // 4 = exact time
  // 5 = gmt stuff
  // var date = date[4].substr(0, 2) + 'h ' + date[4].substr(3, 2) + 'm '
  var date = date[4].substr(0, 5) + ' ' + date[0]
  var x = 'aabbc'
  //x.

  React.useEffect(() => {
    textareaAutoHeight('.NewCommentary')
    getCommentaries()
  }, [])

  function getCommentaries() {
    $.get(`${config.api}/getCommentaries`, {_id: props._id}, r => {

      setCommentaries(Object.values(r).map(x => (
        <div key={x._id} className="Commentary">{x.body}</div>
      )))
    })
  }

  function handleCommentary(e) {
    e.preventDefault()
    $.post(`${config.api}/insertCommentary`, {_id: props._id, userInfos: localStorage.getItem('@react-web/userInfos'), body: commentary, date: new Date()}, r => {
      setCommentary('')
      getCommentaries()
    })

  }

  return (
    <div className="Post">
      <p style={{padding: '15px', fontSize: '15px', color: '#00000073'}}>
        <b style={{color: '#5c7ee9db'}}>{props.owner}</b> posted at <b>{date}</b>
      </p>
      <p style={{marginLeft: '15px'}}>{props.body}</p>
      <div className="Post-image">{props.image ? <img src={`${config.api}/public/images/${props.image}`} /> : ''}</div>
      <div className="Post-actions">
        <label className="NewPost-likeLbl" htmlFor="NewPost-like">
          <img src={like} className="img_actions"/>
          <input type="file" id="NewPost-like"/>
        </label>
        <label className="NewPost-dislikeLbl" htmlFor="NewPost-dislike">
          <img src={dislike} className="img_actions"/>
          <input type="file" id="NewPost-dislike"/>
        </label>
      </div>
      <div className="Commentaries">
        <div className="Commentary-list">
          {commentaries}
        </div>
        <div className="NewCommentary">
          <form onSubmit={handleCommentary}>
            <input onChange={(e) => {
              setCommentary(e.target.value)
            }} type="text" placeholder="Make a commentary ..." value={commentary} />
            <input type="submit" style={{display: 'none'}} />
          </form>
        </div>
      </div>
    </div>
  )
}