import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Router, Scene, Modal } from "react-native-router-flux";
import { Provider } from 'react-redux';

// import store from '../Redux/Store';

import HomePage from './HomePage';
import NewPage from './NewPage';
import Cuisines from '../Components/Cuisines';
import Sidebar from  './Sidebar';

// const cstore = store();


const App = () => {
  return (
    <View style={styles.navbar}>
      <Sidebar />
    </View>
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

export default App;




            // <Scene key='cuisines' component={Cuisines} title='Cuisines' />

            