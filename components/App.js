import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Profile from "./Profile";
import OrderView from "./OrderView";
import DishView from "./DishView";
import Review from "./Review";
import MapView from "./MapView";
import History from "./History";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> App.js </Text>
        <Profile />
        <OrderView />
        <DishView />
        <Review />
        <History />
      </View>
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
