import React from 'react';
import Header from './Header';
import Actions from './Actions';
import Options from './Options';
import AddOption from './AddOption';
import OptionModel from './OptionModal';

class RandomApp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        options: this.props.options,
        selectedOption: undefined
      };
      this.onSelectRandomly = this.onSelectRandomly.bind(this)
      this.onRemoveAll = this.onRemoveAll.bind(this)
      this.addOption = this.addOption.bind(this)
      this.removeOption = this.removeOption.bind(this)
      this.closeModel = this.closeModel.bind(this)
    };
    componentDidMount() {
      try {
        let storedOptions = localStorage.getItem('options') && JSON.parse(localStorage.getItem('options'))
        if(storedOptions && storedOptions !== []) {
          console.log('Updating the state from local storage.')
          this.setState(() => ({options:storedOptions}))
        }
      } catch (error) {
        // do nothing
      }
    }
    componentDidUpdate(prevProps, prevState) {
      if(prevState.options.length !== this.state.options.length) {
        console.log('Updating the localStorage')
        localStorage.setItem('options', JSON.stringify(this.state.options))
      }
    }
    componentWillMount() {
      console.log('componentWillMount')
    }
  
    onSelectRandomly() {
      if (this.state.options.length > 0) {
        let randomNumber = Math.floor(Math.random() * this.state.options.length)
        this.setState(() => {
          return {
            selectedOption: this.state.options[randomNumber]
          }
        });
      }
      //render();
    };
    onRemoveAll() {
      this.setState(() => ({ options: [] }))
    };
    addOption(newOption){
      if(!newOption){
        return 'Enter a valid value to add item.'
      } else if (this.state.options.indexOf(newOption) > -1) {
        return 'This option already exists.'
      }
      this.setState((prevState) => ({ 
        options: prevState.options.concat(newOption)
      }))
    };
    removeOption(optionToBeRemoved){
      if (this.state.options.indexOf(optionToBeRemoved) === -1) {
        return `Oops something went wrong. Can not find the option ${optionToBeRemoved}.`
      }
      this.setState((prevState) => ({ 
        options:  prevState.options.filter(item => item !== optionToBeRemoved)
      }))
    };
    closeModel(){
      this.setState(() => {
        return {
          selectedOption: undefined
        }
      })
    }
    render() {
      const subTitle = 'A random selection app.';
      return (
        <div>
          <Header subTitle={subTitle} />
          <div className="container">
            <Actions hasOptions={this.state.options.length > 0}
              onSelectRandomly={this.onSelectRandomly}/>
            <Options options={this.state.options} removeOption={this.removeOption} onRemoveAll={this.onRemoveAll}/>
            <AddOption addOption={this.addOption}/>
          </div>
          <OptionModel selectedOption={this.state.selectedOption} closeModel={this.closeModel}/>
        </div>
      );
    }
  };
  
  RandomApp.defaultProps = {
    options: []
  };
  
  

  export default  RandomApp;