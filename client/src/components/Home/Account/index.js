import React from 'react'
import $ from 'jquery'
import config from '../../config'
import UserInfos from './UserInfos'
import './master.css'


export default props => {

  const [profile, setProfile] = React.useState();
  const [newImage, setNewImage] = React.useState();
  const [warn, setWarn] = React.useState({});
  const userInfos = JSON.parse(localStorage.getItem('@react-web/userInfos'));

  React.useEffect(() => {
    getProfile();
  }, []);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
    setWarn({text: 'Save changes'})
  }

  const sendChanges = e => {
    let data = new FormData();
    data.append('image', newImage);
    data.append('username', userInfos.username);
    $.ajax({
      url: `${config.api}/modifyUserImage`,
      method: 'POST',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      success: r => {
        console.log(r)
      }
    })
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
        handleImageChange={handleImageChange}
        newImage={newImage}
        sendChanges={sendChanges}
        inf={profile}
        warn={warn}
      />}
    </div>
  );

}