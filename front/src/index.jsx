import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App/App';
import reportWebVitals from './reportWebVitals';

// setup fake backend
import { configureFakeBackend } from './helpers/fake-back';
configureFakeBackend();

render(
  <App />,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
