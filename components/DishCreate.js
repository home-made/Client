import React, { Component } from "react";
import { StyleSheet, Text,TextInput, Button, View, Alert } from "react-native";
const axios = require("react-native-axios");

export default class DishView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      dishText: '', 
      donationNumber: '',
      quantityNumber: '', 
      dishDescriptionText: '', 
    };
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(){
    axios.post('http://localhost:3000/dish/add',{
    cuisineType: "Chinese",
    name: this.state.name,
    description: this.state.dishDescriptionText,
    dishImages: ["https://media-cdn.tripadvisor.com/media/photo-s/02/39/2d/21/chinese-dumplings-with.jpg"],
    chefId: "7564fjasdif",
    allergies: ["none"],
    cashDonation: 8,
    isActive: true,
    quantity: 1
  })
  }
  render() {
    const {container} = styles
    const onButtonPress = () => {
      this.setState({dishText: "freshly"})
    };
    return (
      <View style={container}>
        <Text>Enter Dish Name: </Text>
        <TextInput
          style={{height: 30, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(dishText) => this.setState({dishText})}
          value={this.state.dishText}
        />
         <Text>Enter Donation Amount: </Text>
        <TextInput
          style={{height: 30, borderColor: 'gray', borderWidth: 1}}
          keyboardType={'number-pad'}
          onChangeText={(donationNumber) => this.setState({donationNumber})}
          value={this.state.donationNumber}
        />
       <Text>Enter Quantity Amount: </Text>
        <TextInput
          style={{height: 30, borderColor: 'gray', borderWidth: 1}}
          keyboardType={'number-pad'}
          onChangeText={(quantityNumber) => this.setState({quantityNumber})}
          value={this.state.quantityNumber}
        />
        <Text>Describe Dish: </Text>
        <TextInput
          style={{height: 50, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(dishDescriptionText) => this.setState({dishDescriptionText})}
          value={this.state.dishDescriptionText}
        />
         <Button
          title="Next"
          onPress={this.onSubmit}
          accessibilityLabel="See an informative alert"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});
