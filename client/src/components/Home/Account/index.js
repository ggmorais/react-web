import React from 'react'
import $ from 'jquery'
import config from '../../config'
import UserInfos from './UserInfos'
import './master.css'


export default props => {

  const [profile, setProfile] = React.useState();
  const [newImage, setNewImage] = React.useState();
  // const [modifies, setModifies] = React.useState({age: null, contry: '', infos: ''});
  const [modifies, setModifies] = React.useState({});
  const [warn, setWarn] = React.useState({});
  const userInfos = JSON.parse(localStorage.getItem('@react-web/userInfos'));

  React.useEffect(() => {
    getProfile();
  }, []);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
    setWarn({text: 'Save changes'})
  }

  const storeChanges = e => {
    if (e.target.files[0]) {
      setModifies({
        ...modifies,
        image: e.target.files[0]
      });
    } else {
      const {name, value} = e.target;
      setModifies({
        ...modifies,
        [name]: value
      });
    }
    
    setWarn({text: 'Save changes'});
  }

  const sendChanges = e => {
    let data = new FormData();
    data.append('image', modifies.image);
    data.append('age', modifies.age);
    data.append('location', modifies.contry);
    data.append('desc', modifies.desc);
    $.ajax({
      url: config.api + '/modifyUser',
      data: data,
      method: 'POST',
      processData: false,
      contentType: false,
      cache: false,
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
        modifies={modifies}
        storeChanges={storeChanges}
        sendChanges={sendChanges}
        inf={profile}
        warn={warn}
      />}
    </div>
  );

}