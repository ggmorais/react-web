import React from 'react'


export default props => {

    return (
        <div className="Insert">
            <form>
                <p><input type="text" name="user" placeholder="User" onChange={props.handleForm}/></p>
                <p><textarea name="body" placeholder="Body" onChange={props.handleForm}/></p>
                <p><button onClick={props.insertPost}>SEND</button></p>
            </form>
        </div>
    )

}
