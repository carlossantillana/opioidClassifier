import React, { Component, useState } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Welcome from './src/components/welcome.js';
import IsOpioid  from './src/components/isOpioid.js';
import IsNotOpioid  from './src/components/isNotOpioid.js';
import AddictionRisk  from './src/components/addictionRisk.js';
import RegressionModel  from './src/components/regressionModel.js';
import allReducers from './reducers/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(allReducers);
export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
      <Router hideNavBar= "true">
        <Scene key="root">
          <Scene key="Welcome" component={Welcome} title="Opioid Odds" initial={true} />

          <Scene
            key="isOpioid"
            component={IsOpioid}
            title="Opioid Found"
          />

          <Scene
            key="isNotOpioid"
            component={IsNotOpioid}
            title="Opioid Not Found"
          />

          <Scene
            key="addictionRisk"
            component={AddictionRisk}
            title="Addiction Risk"
          />
          <Scene
            key="regressionModel"
            component={RegressionModel}
            title="Regression Model"
          />
        </Scene>
      </Router>
      </Provider>
    );
  }
}
