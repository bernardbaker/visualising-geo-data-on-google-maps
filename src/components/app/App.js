import React, { Component } from 'react';
import './App.scss';

import Wrapper from '../map/ResourceMap';

class App extends Component {
  render() {
    return (
      <div key="app" className="app-container">
        <Wrapper key="resourceMap" />
      </div>
    );
  }
}

export default App;
