import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Router, Scene, Modal } from "react-native-router-flux";
import { Provider } from 'react-redux';

// import store from '../Redux/Store';

import HomePage from './HomePage';
import Cuisines from '../Components/Cuisines';
import ChefMap from '../Components/ChefMap.js';

// const cstore = store();



const App = () => {
  return (
    <ChefMap />
   

    /*<Provider>
      <Router>
        <Scene key='modal' component={Modal}>
          <Scene key="root">

            <Scene key='cuisines' component={Cuisines} title='Cuisines' />


          </Scene>
        </Scene>
      </Router>
    </Provider>*/

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





            // <Scene key='homepage' component={HomePage} title='HomePage' direction='vertical' />
            
            {/*<Scene key="tabbar" tabs tabBarStyle={{ backgroundColor: "#FFFFFF" }}>
            </Scene>*/}