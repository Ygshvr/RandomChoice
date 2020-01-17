import React from 'react';
import ReactDOM from 'react-dom';
import RandomApp from './components/RandomApp';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
const appRoot = document.getElementById('root');
ReactDOM.render(<RandomApp />, appRoot);
