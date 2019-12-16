import React from 'react';
import $ from 'jquery';

import Content from './Content';
import config from '../../config';

import '../Main/master.css';


export default props => {

  const [values, setValues] = React.useState({body: '', image: ''});

  const userInfos = JSON.parse(localStorage.getItem('@react-web/userInfos'));

  const handleValues = (e) => {
    const {name, value} = e.target;
  
    setValues({
      ...values,
      [name]: e.target.files ? e.target.files[0] : value
    })
  }
  
  const handlePublish = () => {
    if (Object.keys(values).length > 0) {
      const form = new FormData()
      form.append('image', values.image)
      form.append('body', values.body)
      form.append('username', userInfos.username)
      form.append('owner', userInfos.firstName + ' ' + userInfos.lastName)
      form.append('date', new Date())
      
      $.ajax({
        url: `${config.api}/insertPost`,
        method: 'POST',
        data: form,
        cache: false,
        contentType: false,
        processData: false,
        success: r => {
          if (r.done) {
            setValues({body: '', image: ''});
            props.setRefresh(prev => prev + 1);
          }
        }
      })
    }
  }

  return (
    <Content 
      handleValues={handleValues}
      handlePublish={handlePublish}
      image={values.image}
      body={values.body}
    />
  );

}

