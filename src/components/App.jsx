import React, {useState} from 'react';
import './App.css';

import Extractor from './Extractor.jsx'

export default () => {

  let [inputUrl, setinputUrl] = useState('')
    
    return (
      <div className="App">
        <h1>Insta Counter</h1>
        <label htmlFor="inputUrl">Instagram public post URL: </label>
        <input id="inputUrl" type="text" onChange={e => setinputUrl(e.target.value)}/>
        <Extractor url={inputUrl}/>
      </div>
    )
}