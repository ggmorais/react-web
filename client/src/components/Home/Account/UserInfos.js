import React from 'react'
import config from '../../config'
import img_default from '../../assets/img_default.png'


export default props => {

  const inf = props.inf;

  return (
    <div>
      <div className="Account-UserInfos">
        <div className="UserInfos-left">
          <p>{props.something}</p>
          <p className="UserInfos-Fullname">{inf.firstName} {inf.lastName}</p>
          <div className="UserInfos-details">
            <p className="UserInfos-age">{inf.age ? inf.age : 'Age not informed'}</p>
            <p className="UserInfos-location">{inf.location ? inf.location.contry + ' ' + inf.location.uf : 'Contry not informed'}</p>
            <p className="UserInfos-desc">"About me about me about me about me about me About me about me about me about me about me About me about me about me about me about me about about about"</p>
          </div>
        </div>
        <div className="UserInfos-right">
          <div className="UserInfos-right-img">
            <img src={props.modifies.image ? URL.createObjectURL(props.modifies.image) : inf.image ? `${config.api}/public/user_images/${inf.image}` : img_default} />
            <label htmlFor="Input-changeImg" className="UserInfos-changeImg">Change</label>
          </div>
          <input name="image" type="file" id="Input-changeImg" onChange={props.storeChanges} />
          <p>{inf.username}</p>
        </div>
      </div>
      <p onClick={props.sendChanges} className={`UserInfos-warn ${props.warn.saved ? 'green' : 'red'}`}>{props.warn.text}</p>
    </div>
  )

}
