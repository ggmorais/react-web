import React from 'react'
import textareaAutoHeight from '../../tools/textareaAutoHeight'
import image from '../../assets/img_addimage.png'


export default props => {

  React.useEffect(() => {
    textareaAutoHeight('.NewPost-textdiv')
  }, [])

  return (
    <div className="NewPost">
      <form>
        <div id="NewPost-textdiv">
          <textarea value={props.body} onChange={props.handleValues} name="body" className="NewPost-text" placeholder="Tell us what are you thinking..." />
        </div>
        <div className="NewPost-viewImage" style={{display: props.image ? 'block' : 'none'}}>
          <img src={ props.image ? URL.createObjectURL(props.image) : null } />
        </div>
        <div id="NewPost-actions">
          <label className="NewPost-imageLbl" htmlFor="NewPost-addImage">
            <img src={image} className="img_actions"/>
            <input name="image" type="file" accept=".png, .jpg, .jpeg, .gif, .svg" id="NewPost-addImage" onChange={props.handleValues} />
          </label>
          <a onClick={props.handlePublish} style={{color: props.body || props.image ? 'black' : 'grey'}}>Publish</a>
        </div>
      </form>
    </div>
  )

}