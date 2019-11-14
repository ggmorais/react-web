import React from 'react'

import btn_options from '../assets/btn_options_white.png'
import './master.css'


export default props => {

  const [menu, setMenu] = React.useState(false)

  function showMenu() {
    setMenu(menu ? false : true)
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
                <li>Opt1</li>
                <li>Opt2</li>
                <li>Opt3</li>
              </ul>
              {/* <div id="vmenu-close"></div> */}
            </div>
            <li><img className="btn_options" src={btn_options} onClick={showMenu} /></li>
          </ul>
      </div>
  )

}
