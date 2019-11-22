import React from 'react'
import config from '../../config'
import img_default from '../../assets/img_default.png'


export default props => {

  var date = props.infos.date.split(' ');
  date = date[4].substr(0, 5) + ' ' + date[0]

  return (
    <div key={props.infos._id} className="Commentary">
      <div className="Comment-owner-box">
          <img className="img" src={props.infos.image ? `${config.api}/public/images/users/${props.infos.image}` : img_default} />
        <a className="infos">
          <span className="owner">{props.infos.fullName.split(' ')[0]}</span> commented at <span className="date">{date}</span>
        </a>
      </div>
      <p className="Comment-body">{props.infos.body}</p>
    </div>
  )

}