import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Router, Scene, Modal, ActionConst } from "react-native-router-flux";

// import store from '../Redux/Store';

import HomePage from './Containers/HomePage';
import NewPage from './Containers/NewPage';
import Cuisines from './Components/Cuisines';
import NavBar from  './Containers/NavBar';
import ActionMenu from './Containers/ActionMenu';
import NavigationDrawer from './Containers/Drawer';

// const cstore = store();


const Routing = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key='homepage' component={HomePage} direction='vertical' style={styles.navbar} initial />

        <Scene key="drawer" type={ActionConst.RESET} component={NavigationDrawer} open={false} >
          <Scene key="main" initial>
            <Scene key='cuisines' component={Cuisines} title='Cuisines' direction='vertical' />
            <Scene key='actionmenu' component={ActionMenu} title='ActionMenu' direction='vertical' />
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
    marginTop: 0
  }
});

export default Routing;





            