// import React from 'react';
import React from './vreact/react';

import './App.css';

function Test({name}) {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}


function App() {
  return (
    <div className="App">
       hello
       <div>world</div>
      <Test name="tom" />
    </div>
  );
}

export default App;
