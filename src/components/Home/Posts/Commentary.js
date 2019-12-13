import React from 'react'
import config from '../../config'
import img_default from '../../assets/img_default.png'

import './master.scss';

export default props => {

  // Format the date
  var date = props.date.split(' ');
  date = date[4].substr(0, 5) + ' ' + date[0]

  return (
    <div key={props._id} className="Commentary">
      <div className="Comment-owner-box">
          <img className="img" src={`${config.api}/public/user_images/${props.username}.png`} />
        <a className="infos">
          <span className="owner Comment-ownername">{props.fullName.split(' ')[0]}</span> commented at <span className="date">{date}</span>
        </a>
      </div>
      <p className="Comment-body">{props.body}</p>
    </div>
  )

}