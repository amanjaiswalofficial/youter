import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {AppContextProvider} from "context/appContext"

import "./fonts/nexa-light.otf"
import "./fonts/nexa-bold.otf"
import "./fonts/crimson-bold.ttf"
import "./fonts/crimson-regular.ttf"
import "./fonts/frutiger-neue-lt-light.ttf"
import "./fonts/frutiger-neue-lt-regular.ttf"


ReactDOM.render(
    <AppContextProvider><App /></AppContextProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
