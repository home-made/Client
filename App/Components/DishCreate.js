import React, { Component } from "react";
import { StyleSheet, TextInput, View, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Text,
  Content,
  Input,
  Item,
  Form,
  Button,
  Label
} from "native-base";
const axios = require("react-native-axios");
export default class DishView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      donation: 0,
      quantity: 0,
      description: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    console.log(this.state)
    // axios.post("http://localhost:3000/dish/add", {
    //   cuisineType: "Chinese",
    //   name: this.state.name,
    //   description: this.state.dishDescriptionText,
    //   dishImages: [
    //     "https://media-cdn.tripadvisor.com/media/photo-s/02/39/2d/21/chinese-dumplings-with.jpg"
    //   ],
    //   chefId: "7564fjasdif",
    //   allergies: ["none"],
    //   cashDonation: 8,
    //   isActive: true,
    //   quantity: 1
    // });
    this.props.setDish(this.state)
    Actions.uploaddishimage()
  }
  render() {
    const price = '$'+this.state.donation;
    const { container } = styles;
    const onButtonPress = () => {
      this.setState({ dishText: "freshly" });
    };
    return (
      <Container   style={{
          flex: 1,
          flexDirection: "column",


        }}>
        <Content >
          <Form style={{ marginTop: 200 }}>
            <Item>
              <Input
                placeholder="Name"
                onChangeText={name => this.setState({ name: name })}
                value={this.state.name}
              />
            </Item>
            <Item>
              <Input
                placeholder="Description"
                onChangeText={description =>
                  this.setState({ description })}
                value={this.state.description}
              />
            </Item>
            <Item stackedLabel>
              <Label>$</Label>
              <Input 
                placeholder="Donation Amount"
                keyboardType={"number-pad"}
                onChangeText={donation => {
                    let result = donation.split('')
                    result.shift()
                    result.shift()
                    this.setState({ donation})
                  }
                  }
              
                value={this.state.donation}
              />
            </Item>
            <Item>
              <Input
                placeholder="Quantity"
                keyboardType={"number-pad"}
                onChangeText={quantity =>
                  this.setState({ quantity })}
                value={this.state.quantity}
              />
            </Item>
            <Button style={{ marginTop: 70}} onPress={() => this.handleSubmit()}>
              <Text>Next </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff"
  }
});
