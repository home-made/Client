import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Router, Scene, Modal, Actions } from "react-native-router-flux";
import { Provider } from "react-redux";
import axios from "axios";

// import store from '../Redux/Store';

import HomePage from "./HomePage";
import Cuisines from "../Components/Cuisines";
import ChefList from "../Components/ChefList";
import ChefMap from "../Components/ChefMap";

// const cstore = store();

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.setCuisineType = this.setCuisineType.bind(this);
    this.fetchChefs = this.fetchChefs.bind(this);

  }
  
  setCuisineType(genre) {
    this.setState({cuisineType: genre}, () => {
      let url = `http://ec2-184-72-193-131.compute-1.amazonaws.com:3000/chef/style/${this.state.cuisineType}`;
      axios
        .get(url)
        .then(res => this.setState({chefs: res.data}, () => {
          Actions.chefList();
        }))
        .catch(err => {
          console.log("ERROR IS", err);
        })
    })
  }

  fetchChefs() {
    return this.state.chefs;
  }

  render() {
    return (
        <Router>

          <Scene key="root">
            <Scene key="cuisines" component={Cuisines} title="Cuisines" setCuisineType={this.setCuisineType} />
            <Scene key="chefList" component={ChefList} title="Chefs" fetchChefs={this.fetchChefs} chefs={this.state.chefs}/>
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

{
  /*<Scene key="tabbar" tabs tabBarStyle={{ backgroundColor: "#FFFFFF" }}>
            </Scene>*/
}
