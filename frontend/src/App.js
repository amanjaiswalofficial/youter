import React from 'react';
import io from "socket.io-client"

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './containers/HomePage'

export let socket = io.connect("http://127.0.0.1:5000")


// socket.on("all_good", msg  => {
//     console.log(msg)
// })


function App() {
  return (
    <div>
    <HomePage/>
    </div>
  );
}

export default App;
