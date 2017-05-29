import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Container, Text } from "native-base";

//Using StyleSheet.create doesn't work. Have to explicitly give styling

export default class OrderView extends Component {
  //component
  render() {
    if (this.props.status === 0){
      return (
        <Container style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5FCFF"}}>
          <Button><Text>Decline</Text></Button> 
          <Button><Text>Accept</Text></Button>
        </Container>
      )
    } else {
      return (
        <Container style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5FCFF"}}>
          <Text></Text>
        </Container>
      )
    } 
  }
}

