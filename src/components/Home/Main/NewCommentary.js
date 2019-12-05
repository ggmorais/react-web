import React from 'react'
import $ from 'jquery'
import config from '../../config'


export default props => {

  const [commentary, setCommentary] = React.useState('')

  function handleCommentary(e) {
    e.preventDefault()
    $.post(`${config.api}/insertCommentary`, {_id: props._id, userInfos: localStorage.getItem('@react-web/userInfos'), body: commentary, date: new Date()}, r => {
      setCommentary('')
      props.getCommentaries()
    })

  }

  return (
    <form onSubmit={handleCommentary}>
      <input onChange={(e) => {
        setCommentary(e.target.value)
      }} type="text" placeholder="Make a commentary ..." value={commentary} />
      <input type="submit" style={{display: 'none'}} />
    </form>
  )

}