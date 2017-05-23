import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class OrderView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> OrderView.js </Text>
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
  }
});
