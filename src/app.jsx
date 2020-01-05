class RandomApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: this.props.options
    };
    this.onSelectRandomly = this.onSelectRandomly.bind(this)
    this.onRemoveAll = this.onRemoveAll.bind(this)
    this.addOption = this.addOption.bind(this)
    this.removeOption = this.removeOption.bind(this)
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
      alert(
        this.state.options[randomNumber]
      );
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
  render() {
    const subTitle = "A random selection app.";
    return (
      <div>
        <Header subTitle={subTitle} />
        <Actions hasOptions={this.state.options.length > 0}
          onSelectRandomly={this.onSelectRandomly}
          onRemoveAll={this.onRemoveAll} />
        <Options options={this.state.options} removeOption={this.removeOption}/>
        <AddOption addOption={this.addOption}/>
      </div>
    );
  }
};

RandomApp.defaultProps = {
  options: []
};

const Header = (props) => {
    return (
      <div>
        <h1> {props.title} </h1>
        {props.subTitle && <p>{props.subTitle}</p>}
      </div>
    );
  };

Header.defaultProps = {
  title: 'Randomizer App'
};

const Actions = (props) => {
    return (
      <div>
        <button
          onClick={props.onSelectRandomly}
          disabled={!props.hasOptions}
        >
          Select Randomly
        </button>
        <button onClick={props.onRemoveAll}>Remove All</button>
      </div>
    );
  }

const Options = (props) => {
    if (props.options.length > 0) {
      return props.options.map(option => (
        <Option key={option} optionsText={option} removeOption={props. removeOption}/>
      ));
    }
    return <p>No items added.</p>;
  }

const Option = (props) => {
return (<div>
  {props.optionsText} 
  <button onClick={(e) => {
    props.removeOption(props.optionsText)
  }}>Remove</button>
</div>);
  }

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
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.addOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

const appRoot = document.getElementById("root");

function render() {
  const rootComponent = <RandomApp />;
  ReactDOM.render(rootComponent, appRoot);
}

render();
