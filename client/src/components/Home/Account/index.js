import React from 'react'
import $ from 'jquery'
import config from '../../config'
import UserInfos from './UserInfos'
import './master.css'


export default props => {

  const [profile, setProfile] = React.useState();
  const [newImage, setNewImage] = React.useState();
  const [modifies, setModifies] = React.useState();
  const userInfos = JSON.parse(localStorage.getItem('@react-web/userInfos'));

  React.useEffect(() => {
    getProfile();
  }, []);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  }

  const storeChanges = e => {
    const {name, value} = e.target;
    setModifies({[name]: value});
  }

  const saveChanges = e => {
    $.post(config.api + '/modifyUser', {});
  }

  const getProfile = () => {
    $.post(config.api + '/getUsers', {username: userInfos.username}, r => {
      setProfile(r.r[0]);
    });
  }

  return (
    <div className="Account">
      {profile &&
      <UserInfos  
        newImage={newImage} 
        inf={profile}
        handleImageChange={handleImageChange} 
      />}
    </div>
  );

}