import React, { Component } from "react";
import { StyleSheet, AsyncStorage,Image,TextInput, View, Alert } from "react-native";
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
  componentWillMount(){
    console.log('mounted big fella confirm big fella')
    this.setState({dish:this.props.fetchDish()},() =>console.log(this.state.dish))
    let userId, userName, userPic;
    async function getProfile() {
      try {
        const data = await AsyncStorage.getItem('profile');
        if (data !== null && data !== undefined) {
          // console.log('async data: ', data);
          data = JSON.parse(data);
          userId = data.identityId, userName = data.name, userPic = data.extraInfo.picture_large;
        }
      } catch (err) {
        console.log('Error getting data: ', err);
      }
    }

    getProfile()
      .then(() => {
        this.setState({ userId: userId, userName: userName, userPic: userPic })
      })
  }
  onSubmit() {
    let dish = this.state.dish;
    dish['chefId']= this.state.userId
    console.log(dish)
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
  }
  render() {
    const { container } = styles;
    const onButtonPress = () => {
      this.setState({ dishText: "freshly" });
    };
    console.log('dish state is ',this.state)
    return (
      <Container style={{marginTop: 80,alignItems: 'center'}}>
        <Image source={{ uri:this.state.dish.dishImages[0]}}  
        style={{width: 200, height: 200}}
          resizeMode={Image.resizeMode.center} />
          <Body>
            <Title>Name: {this.state.dish.name}</Title>
            <Text>Description: {this.state.dish.description}</Text>
            <Text>Donation: {this.state.dish.donation}</Text>
            <Text>Quantity: {this.state.dish.quantity}</Text>
            

          </Body>
          <Right />

        <Content padder>
           <Button onPress={() => this.handleSubmit()}>
              <Text>Confirm </Text>
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
