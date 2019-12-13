import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, HashRouter } from 'react-router-dom';

// import Post from './components/Home/Post';
// import NewPost from './components/Home/NewPost';
import App from './App';
import './master.css';


ReactDOM.render(
  <HashRouter basename="/">
    <Route path="/" component={App} />
  </HashRouter>,
  document.querySelector('#root')
);