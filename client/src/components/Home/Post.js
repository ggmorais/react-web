import React from 'react'
import like from '../assets/img_like.png'
import dislike from '../assets/img_dislike.png'


export default props => {

  return (
    <div className="Post">
      <p style={{padding: '15px'}}><b>{props.owner}</b> posted at {props.date}</p>
      <label className="NewPost-likeLbl" htmlFor="NewPost-like">
        <img src={like} className="img_actions"/>
        <input type="file" id="NewPost-like"/>
      </label>
      <label className="NewPost-dislikeLbl" htmlFor="NewPost-dislike">
        <img src={dislike} className="img_actions"/>
        <input type="file" id="NewPost-dislike"/>
      </label>
    </div>
  )
}