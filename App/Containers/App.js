import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Router, Scene, Modal } from "react-native-router-flux";
import { Provider } from 'react-redux';

// import store from '../Redux/Store';

import HomePage from './HomePage';
import NewPage from './NewPage';
import AnotherPage from './AnotherPage';

// const cstore = store();


const App = () => {
  return (
    <Provider>
      <Router>
        <Scene key='modal' component={Modal}>
          <Scene key="root">

            <Scene key='homepage' component={HomePage} title='HomePage' direction='vertical' />
            <Scene key='newpage' component={NewPage} title='NewPage' />
            <Scene key='anotherpage' component={AnotherPage} title='AnotherPage' />

            <Scene key="tabbar" tabs tabBarStyle={{ backgroundColor: "#FFFFFF" }}>
            </Scene>

          </Scene>
        </Scene>
      </Router>
    </Provider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default App;
