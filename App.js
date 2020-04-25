import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Welcome from './src/components/welcome.js';
import CheckDrug from './src/components/checkDrug.js';

export default class App extends Component{
  render(){
    return(
      <Router hideNavBar= "true">
        <Scene key="root">
          <Scene key="Welcome" component={Welcome} title="Welcome" initial={true} />
          <Scene
            key="checkDrug"
            component={CheckDrug}
            title="Check Drug"
          />
        </Scene>
      </Router>
    );
  }
}
