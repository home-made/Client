import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Row } from "react-native-easy-grid";
import { Button } from "native-base";
export default class DishView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: 120,
            height: 120,
            justifyContent: "center",
            alignItems: "center"
          }}
          source={{ uri: this.props.dish.dishImages[0] }}
        />
        <Text> {this.props.dish.name}</Text>
        <Text> ${this.props.dish.cashDonation}</Text>
        <Button onPress={() => this.props.addToCart(this.props.dish)}>
          <Text>Add to cart</Text>
        </Button>

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