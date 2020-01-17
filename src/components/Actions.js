import React from 'react';

const Actions = (props) => {
    return (
      <div>
        <button
          onClick={props.onSelectRandomly}
          disabled={!props.hasOptions}
          className="big-button"
        >
          Select Randomly
        </button>
      </div>
    );
  }
  
export default Actions;