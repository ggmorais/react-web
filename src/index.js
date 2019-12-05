import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter } from 'react-router-dom'

import App from './App'
import './master.css'


ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>,
  document.querySelector('#root')
)