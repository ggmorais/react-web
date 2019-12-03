import React from 'react'
import Header from '../Header'
import Main from './Main'
import Account from './Account'
import './master.css'


export default props => {

  if (!localStorage.getItem('@react-web/auth')) return <div/>
  
  const [page, setPage] = React.useState();
  const userInfos = JSON.parse(localStorage.getItem('@react-web/userInfos'));

  React.useEffect(() => {
    if (!localStorage.getItem('@react-web/auth')) {
      props.history.push('/login')
    }
    if (document.location.pathname.length > 1) {
      let name = document.location.pathname.substr(1)
      name = name[0].toUpperCase() + name.substr(1)
      if (pages[name]) setPage(name)
    }
  }, [])

  // Change the URL without reloading the page
  React.useEffect(() => {
    window.history.pushState(page, page, page);
  }, [page])

  const pages = {
    Main: <Main userInfos={userInfos} />,
    Account: <Account />
  }

  return (
    <div className="Home">
      <div className="Background bg_home"></div>
      <Header userInfos={userInfos} setPage={setPage} />
      {pages[page]}
    </div>
  )
  
}