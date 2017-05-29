import React, { Component } from "react";
import { StyleSheet, Image,TextInput, View, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Text,
  Content,
  Input,
  Item,
  Form,
  Button,
  Left,
  Header,
  Icon,
  Body,
  Title,
  Right
} from "native-base";
const axios = require("react-native-axios");

export default class DishConfirm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    this.setState({dish:this.props.fetchDish()}),() =>console.log(this.state.dish)
  }
  onSubmit() {
    axios.post("http://localhost:3000/dish/add", {
      cuisineType: "Chinese",
      name: this.state.name,
      description: this.state.dishDescriptionText,
      dishImages: [
        "https://media-cdn.tripadvisor.com/media/photo-s/02/39/2d/21/chinese-dumplings-with.jpg"
      ],
      chefId: "7564fjasdif",
      allergies: ["none"],
      cashDonation: 8,
      isActive: true,
      quantity: 1
    });
  }
  render() {
    const { container } = styles;
    const onButtonPress = () => {
      this.setState({ dishText: "freshly" });
    };
    return (
      <Container style={{marginTop: 80}}>
        <Image source={{ uri:'https://homemadedishes.s3.amazonaws.com/uploads%2Fimage.jpg'}}  
        style={{width: 200, height: 200}}
          resizeMode={Image.resizeMode.center} />
          <Body>
            <Title>Hello</Title>
            <Text>yrrrrrr</Text>
          </Body>
          <Right />

        <Content padder>
           <Button onPress={() => this.handleSubmit()}>
              <Text>Next </Text>
            </Button>
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
