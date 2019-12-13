import React from 'react';
import $ from 'jquery';

import config from '../../config';
import NewPost from '../NewPost';
import Posts from '../Posts';
import Warn from '../../Warn';
import './master.css';


export default props => {
  return (
    <div className="Home-Main">
      <div className="PostViewer">
        <NewPost />
        <Posts />
      </div>
    </div>
  )

}