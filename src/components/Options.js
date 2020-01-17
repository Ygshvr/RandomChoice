import React from "react";
import Option from './Option';

const Options = (props) => {
    return (<div>
      <div className='widget-header'>
        <h3 className='widget-header__title'>Your Options</h3>
        <button className='button button--link' onClick={props.onRemoveAll}>Remove All</button>
      </div>

      {props.options.length===0 && <p className='widget__message'>No items added.</p>}
      {
        props.options.map(option => (
          <Option key={option} optionsText={option} removeOption={props.removeOption}/>
        ))
      }
    </div>)}

export default Options;