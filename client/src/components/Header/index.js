import React from 'react'

import btn_options from '../assets/btn_options_white.png'
import btn_close from '../assets/btn_close.png'
import './master.css'


export default props => {

  const [menu, setMenu] = React.useState(false)

  function showMenu() {
    setMenu(menu ? false : true)
  }

  function exit() {
    localStorage.removeItem('@react-web/auth', false)
    document.location.reload()
  }


  return (
      <div className="Header">
          <ul id="hmenu">
            <li><a id="title">React</a></li>
            <li><a className="items">Opt1</a></li>
            <li><a className="items">Opt2</a></li>
            <li><a className="items">Opt3</a></li>            
           
            <div className="Header-menu" style={menu ? {display: 'inline-block'} : {display: 'none'}}>
              <ul id="vmenu">
                <li>My account</li>
                <li>Friends</li>
                <li onClick={exit}>Exit</li>
              </ul>
              <p id="vmenu-close"><span id="vmenu-title">MENU</span><img className="btn_close" src={btn_close} onClick={showMenu} /></p>
            </div>
            <li><img className="btn_options" src={btn_options} onClick={showMenu} /></li>
          </ul>
      </div>
  )

}
