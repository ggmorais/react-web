import React from 'react';
import $ from 'jquery';


export default props => {

  React.useEffect(() => {
    $('.Warn').fadeIn('slow');
  }, []);

  return (
    <div className="Warn" style={{display: 'none'}}>
      <p className="Warn-message" style={{color: props.color}}>{props.message}</p>
    </div>
  );

}