import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";

export default class UserOrderPanel extends Component {

  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
       <Text>User order panel</Text>
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
