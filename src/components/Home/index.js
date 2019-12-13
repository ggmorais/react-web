import React from 'react'
import Header from '../Header'
import Main from './Main'
import Profile from './Profile'
import local from '../location'
import './master.css'


export default props => {

  const [page, setPage] = React.useState();
  const userInfos = JSON.parse(localStorage.getItem('@react-web/userInfos'));

  const pages = {
    Main: <Main userInfos={userInfos} />,
    Profile: <Profile />
  }

  React.useEffect(() => {
    if (!localStorage.getItem('@react-web/auth')) {
      local.set('login')
    }

    if (local.name()) {
      if (pages[local.name()]) setPage(local.name())
    } else {
      local.set('main')
    }
  }, [])

  if (!localStorage.getItem('@react-web/auth')) return <div/>

  // Change the URL without reloading the page
  React.useEffect(() => {
    if (pages[page]) local.set(page)
  }, [page])

  return (
    <div className="Home">
      <div className="Background bg_home"></div>
      <Header userInfos={userInfos} setPage={setPage} />
      {pages[page]}
    </div>
  )
  
}