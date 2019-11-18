import React from 'react'
import textareaAutoHeight from '../tools/textareaAutoHeight'
import image from '../assets/img_addimage.png'


export default props => {

  React.useEffect(() => {
    textareaAutoHeight('.NewPost-textdiv')
  }, [])

  return (
    <div className="NewPost">
      <form>
        <div id="NewPost-textdiv">
          <textarea value={props.newPost.body} onChange={props.handleNewPost} name="body" className="NewPost-text" placeholder="Tell us what are you thinking..." />
        </div>
        <div className="NewPost-viewImage" style={{display: props.newPost.image ? 'block' : 'none'}}>
          <img src={ props.newPost.image ? URL.createObjectURL(props.newPost.image) : null } />
        </div>
        <div id="NewPost-actions">
          <label className="NewPost-imageLbl" htmlFor="NewPost-addImage">
            <img src={image} className="img_actions"/>
            <input name="image" type="file" accept=".png, .jpg, .jpeg, .gif, .svg" id="NewPost-addImage" onChange={props.handleNewPost} />
          </label>
          <a onClick={props.handlePublish} style={{opacity: props.newPost.body || props.newPost.image ? '1' : '.3'}}>Publish</a>
        </div>
      </form>
    </div>
  )

}