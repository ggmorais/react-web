import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

import btn_options from '../assets/btn_options_white.png'
import btn_close from '../assets/btn_close.png'
import './master.css'


export default props => {

  const [menu, setMenu] = React.useState(false)

  function showMenu() {
    setMenu(menu ? false : true)
    if (!menu) {
      $('.Header-menu').animate({
        right: '+=300',
        //height: 'toggle'
      }, 200)
    } else {
      $('.Header-menu').animate({
        right: '-=300',
        // height: 'toggle'
      }, 200)
    }
    
  }

  function exit() {
    localStorage.removeItem('@react-web/auth')
    document.location.reload()
  }

  return (
    <div className="Header">
      <ul id="hmenu">
        <li><a onClick={() => props.setPage('Main')} id="title">React</a></li>
        <li><a className="items">Opt1</a></li>
        <li><a className="items">Opt2</a></li>
        <li><a className="items">Opt3</a></li>            
        <div className="Header-menu">
          <ul id="vmenu">
            {/* <li><Link to="/home/account">My account</Link></li> */}
            <li onClick={() => props.setPage('Account')}>Account</li>
            <li>Friends</li>
            <li onClick={exit}>Exit</li>
          </ul>
          <p id="vmenu-close"><span id="vmenu-title">{props.userInfos.firstName} {props.userInfos.lastName}</span><img className="btn_close" src={btn_close} onClick={showMenu} /></p>
        </div>
        <li>
          <img className="btn_options" src={btn_options} onClick={showMenu} />
        </li>
      </ul>
    </div>
  )

}
