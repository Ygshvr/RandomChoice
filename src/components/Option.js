import React from "react";
const Option = (props) => {
    return (<div className='option'>
      <p className='option__text'>{props.optionsText}</p> 
      <button onClick={(e) => {
        props.removeOption(props.optionsText)
      }}
      className='button'
      >Remove</button>
    </div>);
      }

export default Option;