import React from 'react';

import styles from './loading.scss';
import loading_image from '../assets/loading-blue-200px.svg';


const View = props => (
  <div className="Loading-view">
    <img src={loading_image} />
  </div>
);

export default View;