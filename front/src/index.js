import React from 'react';
import  {render} from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from './store'
import {history} from "./helpers/history";
import {Router} from "react-router-dom";


render(
    <Provider store={store}>
        <Router history={history} >
        <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
