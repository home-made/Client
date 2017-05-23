import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Profile from "./Profile";
import OrderView from "./OrderView";
import DishView from "./DishView";
import DishCreate from "./DishCreate";
import Review from "./Review";
import MapView from "./MapView";
import History from "./History";
import Header from "../containers/Header"
import {Router, Scene} from 'react-native-router-flux'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene 
            key ='createDish'
            component={DishCreate}
            title='createDish'
            
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
