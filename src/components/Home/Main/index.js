import React from 'react';
import $ from 'jquery';

import config from '../../config';
import NewPost from '../NewPost';
import Post from '../Post';
import Warn from '../../Warn';
import './master.css';


export default props => {
  return (
    <div className="Home-Main">
      <div className="PostViewer">
        <NewPost />
        <Post />
      </div>
    </div>
  )

}