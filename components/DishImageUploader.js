import React, { Component } from "react";
import { StyleSheet, Text, TextInput, Button, View, Alert } from "react-native";
const axios = require("axios");

export default class DishView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishText: "",
      donationNumber: "",
      quantityNumber: "",
      dishDescriptionText: ""
    };
  }
  onSubmit(){
    axios.post('localhost:3000/dish/add',{
    cuisineType: "Chinese",
    name: "Dumplings",
    description: "Minced meat and chopped vegetables wrapped into a thin piece of dough skin.",
    dishImages: ["https://media-cdn.tripadvisor.com/media/photo-s/02/39/2d/21/chinese-dumplings-with.jpg"],
    chefId: "7564fjasdif",
    allergies: ["none"],
    cashDonation: 8,
    isActive: true,
    quantity: 1
  })
  }
  render() {
    const onButtonPress = () => {
      this.setState({ dishText: "freshly" });
    };
    return (
      <View>
        <Text>Enter Dish Name: </Text>
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
