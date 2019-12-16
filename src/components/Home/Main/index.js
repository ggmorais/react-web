import React from 'react';
import $ from 'jquery';

import config from '../../config';
import NewPost from '../NewPost';
import Posts from '../Posts';
import Warn from '../../Warn';
import './master.css';


export default props => {

  const [refreshPosts, setRefreshPosts] = React.useState(0);

  return (
    <div className="Home-Main">
      <div className="PostViewer">
        <NewPost setRefresh={setRefreshPosts} />
        <Posts refresh={refreshPosts} />
      </div>
    </div>
  )

}