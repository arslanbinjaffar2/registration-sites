import React, { Component } from 'react';
import 'sass/app.scss';
import RouterOutlet from 'router/RouterOutlet'
import Header from "./components/layout/Header";
class App extends Component {
  render() {
    return (
      <div id="App">
        <Header />
        <RouterOutlet/>
      </div>
    );
  }
}

export default App;
