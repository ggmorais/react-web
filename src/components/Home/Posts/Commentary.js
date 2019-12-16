import React from 'react'
import config from '../../config'
import img_default from '../../assets/img_default.png'

import './master.scss';

export default props => {

  const [userImage, setUserImage] = React.useState(img_default);

  // Format the date
  var date = props.date.split(' ');
  date = date[4].substr(0, 5) + ' ' + date[0]


  // Check if the user picture exists
  React.useEffect(() => {
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
    <div key={props._id} className="Commentary">
      <div className="Comment-owner-box">
          <img className="img" src={userImage} />
        <a className="infos">
          <span className="owner Comment-ownername">{props.username}</span> commented at <span className="date">{date}</span>
        </a>
      </div>
      <p className="Comment-body">{props.body}</p>
    </div>
  )

}