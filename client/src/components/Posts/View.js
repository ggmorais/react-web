import React from 'react'


export default props => {

    return (
        <div className="View">
            <h2>{props.data.owner}</h2>
            <p>{props.data.title}</p>
            <p>{props.data.body}</p>
        </div>
    )

}