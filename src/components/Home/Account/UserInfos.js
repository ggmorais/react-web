import React from 'react'
import config from '../../config'
import img_default from '../../assets/img_default.png'
import { transform } from '@babel/core';


export default props => {

  const inf = props.inf;

  inf.desc = 'Info info Info info Info info Info info Info info Info info Info info Info info Info info Info info Info info Info info ';
  inf.age = 18;

  return (
    <div>
      <div className="Account-UserInfos">
        <div className="UserInfos-left">
          <p>{props.something}</p>
          <p className="UserInfos-Fullname">{inf.firstName} {inf.lastName}</p>
          <div className="UserInfos-details">
            <p className="UserInfos-age">
              {inf.age ? inf.age : 'Age not informed'}
            </p>
            <p className="UserInfos-location">
              {inf.location ? inf.location.contry + ' ' + inf.location.uf : 'Contry not informed'}
            </p>
            <p className="UserInfos-desc">
              {inf.desc}
            </p>
          </div>
        </div>
        <div className="UserInfos-right">
          <div className="UserInfos-right-img">
            <img src={props.newImage ? URL.createObjectURL(props.newImage) : inf.image ? `${config.api}/public/user_images/${inf.image}` : img_default} />
            <label htmlFor="Input-changeImg" className="UserInfos-changeImg">Change</label>
          </div>
          <input name="image" type="file" accept=".png, .jpg, .jpeg, .gif, .svg" id="Input-changeImg" onChange={props.handleImageChange} />
          <p>{inf.username}</p>
        </div>
      </div>
      <p onClick={props.sendChanges} className={`UserInfos-warn ${props.warn.saved ? 'green' : 'red'}`}>{props.warn.text}</p>
    </div>
  );

}
