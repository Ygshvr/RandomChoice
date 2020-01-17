import React from 'react';

class AddOption extends React.Component {
    constructor(props){
      super(props)
      this.addOption = this.addOption.bind(this)
      this.state = {
        error: undefined
      }
    }
    addOption(e) {
      e.preventDefault();
      let inputValue = e.target.elements.option.value;
      let error = this.props.addOption(inputValue)
      if(error)
      {
        this.setState(() => ({error}))
      } else {
        e.target.elements.option.value = '';
      }
    }
    render() {
      return (
        <div className="add-option">
         {this.state.error && <div className="add-option-error">{this.state.error}</div>}
          <form onSubmit={this.addOption}>
            <input type='text' name='option' className="add-option__input"/>
            <button className='button'>Add Option</button>
          </form>
        </div>
      );
    }
  }

export default AddOption;