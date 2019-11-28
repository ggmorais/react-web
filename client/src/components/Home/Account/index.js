import React from 'react'
import $ from 'jquery'
import config from '../../config'
import UserInfos from './UserInfos'
import './master.css'


export default props => {

  const [profile, setProfile] = React.useState();
  const userInfos = JSON.parse(localStorage.getItem('@react-web/userInfos'));

  React.useEffect(() => {
    getProfile()
  }, [])

  const handleImageChange = (e) => {
    console.log('Changing the user image ...')
  }

  const getProfile = () => {
    $.post(config.api + '/getUsers', {username: userInfos.username}, r => {
      setProfile(r.r.map(data => <UserInfos key={data._id} inf={data} handleImageChange={handleImageChange} />))
    });
  }

  return (
    <div className="Account">
      {profile ? profile : null}
    </div>
  );

}