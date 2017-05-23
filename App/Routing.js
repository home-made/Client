import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Router, Scene, Modal } from "react-native-router-flux";
import { Provider } from 'react-redux';

// import store from '../Redux/Store';

import HomePage from './Containers/HomePage';
import NewPage from './Containers/NewPage';
import Cuisines from './Components/Cuisines';
import NavBar from  './Containers/NavBar';
import App from './Containers/App';

// const cstore = store();


const Routing = () => {
  return (
    <Router>
      <Scene key='modal' component={Modal}>
        <Scene key="root">

          <Scene key='homepage' component={HomePage} title='HomePage' direction='vertical' initial />
          <Scene key='app' component={App} title='App' direction='vertical' initial />
          
          <Scene key="navbar" component={NavBar} title='NavBar' style={styles.navbar} >
            <Scene key='newpage' component={NewPage} title='NewPage' direction='vertical' />
          </Scene>

        </Scene>
      </Scene>
    </Router>
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
  },
  navbar: {
    marginTop: 50
  }
});

export default Routing;




            // <Scene key='cuisines' component={Cuisines} title='Cuisines' />

            