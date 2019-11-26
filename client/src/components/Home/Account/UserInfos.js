import React from 'react'
import config from '../../config'
import img_default from '../../assets/img_default.png'


export default props => {

  const inf = props.inf
  console.log(inf)
  return (
    <div className="Account-UserInfos">
        <div className="UserInfos-left">
          <p>{inf.firstName} {inf.lastName}</p>
        </div>
        <div className="UserInfos-right">
          <div className="UserInfos-right-img">
            <img src={inf.image ? `${config.api}/public/user_images/${inf.image}` : img_default} />
          </div>
          <p>{inf.username} </p>
        </div>
        
    </div>
  )

}