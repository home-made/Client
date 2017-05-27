import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";

export default class OrderView extends Component {

  component
  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Text>Order</Text>
        {this.props.status === 0 ? (<Container><Button><Text>Decline</Text></Button> <Button><Text>Accept</Text></Button></Container>): <Text></Text>}
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
