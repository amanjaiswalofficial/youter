import React from 'react';
import io from "socket.io-client"

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './containers/HomePage'

export const backendURL = process.env.REACT_APP_BACKEND_URL

export let socket = io.connect(backendURL)


function App() {
  return (
    <div>
    <HomePage/>
    </div>
  );
}

export default App;
