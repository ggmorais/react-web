import React from 'react'


export default props => {

    return (
        <div className="Insert">
            <form>
                <p><input type="text" name="title" placeholder="Title" onChange={props.handleForm}/></p>
                <p><input type="text" name="owner" placeholder="Owner" onChange={props.handleForm}/></p>
                <p><textarea name="body" placeholder="Body" onChange={props.handleForm}/></p>
                <p><button onClick={props.insertPost}>SEND</button></p>
            </form>
        </div>
    )

}
