import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Profile from "./Profile";
import OrderView from "./OrderView";
import DishView from "./DishView";
import Review from "./Review";
import History from "./History";
import Cuisines from "./Cuisines";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="cuisines"
            component={Cuisines}
            title="Cuisines"
            initial
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
  }
});
