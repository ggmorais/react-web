import React from 'react'
import $ from 'jquery'
import config from '../../config'
import UserInfos from './UserInfos'
import './master.css'


export default props => {

  const [profile, setProfile] = React.useState();
  const [newImage, setNewImage] = React.useState();
  const [something, setSomething] = React.useState('zzz');
  const userInfos = JSON.parse(localStorage.getItem('@react-web/userInfos'));

  React.useEffect(() => {
    getProfile();
  }, []);

  const handleImageChange = (e) => {
    setSomething('eeeeeeeee')
    console.log('switching ...')
    setNewImage(e.target.files[0]);
  }

  const change = e => {
    setSomething('new stuff');
  }

  const getProfile = () => {
    $.post(config.api + '/getUsers', {username: userInfos.username}, r => {
      let data = r.r[0];
      setProfile(<UserInfos key={data._id} newImage={newImage} inf={data} handleImageChange={handleImageChange} />);
      // setProfile(<UserInfos change={change} something={something} key={data._id} newImage={newImage} inf={data} handleImageChange={handleImageChange} />)
    });
  }

  return (
    <div className="Account">
      {profile ? profile : null }
      {/* <UserInfos change={change} something={something} /> */}
    </div>
  );

}