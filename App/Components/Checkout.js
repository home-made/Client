import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import axios from "axios";
import { Container, Content, List, Header, Text, Button } from "native-base";
import CheckOutItem from "./CheckOutItem.js";

export default class Checkout extends Component {
  /*
      State inside Checkout.js is 
      cashTotal: 14
      chefId: "facebook|"
      customerId: "google-oauth2|"
      data: [array of dish documents]
      dishCounter: {obj}

      where cashTotal is the total dollar amt calculated in the checkout



      dishCounter obj has:
      {dishKey: {
        amount: 1
        cashDonation:7}
      }

      where amount is the number of times 
      the dish has been incremented

    */
  constructor(props) {
    super(props);
    this.state = {};
    this.incrementDishCount = this.incrementDishCount.bind(this);
    this.decrementDishCount = this.decrementDishCount.bind(this);
    this.deleteDish = this.deleteDish.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
  }

  componentWillMount() {
    this.calculateTotal();
  }

  incrementDishCount(key) {
    var newDishCounter = this.state.dishCounter;
    var newCount = newDishCounter[key].amount;
    newDishCounter[key].amount = newCount + 1;

    this.setState({
      dishCounter: newDishCounter
    });

    this.calculateTotal();
  }

  decrementDishCount(key) {
    var newDishCounter = this.state.dishCounter;
    var newCount = newDishCounter[key].amount;
    newCount = newCount - 1;

    if (newCount <= 0) {
      newDishCounter[key].amount = 0;
      this.setState({ dishCounter: newDishCounter });
      this.calculateTotal();
    } else {
      newDishCounter[key].amount = newCount;
      this.setState({ dishCounter: newDishCounter });
      this.calculateTotal();
    }
  }

  deleteDish(key) {
    var total = this.state.cashTotal;
    var subtract;
    var newData = this.state.data.filter(dish => {
      return dish._id !== key;
    });

      var newDishCounter = this.state.dishCounter;
      console.log("NEW DISH COUNTER", newDishCounter);
      subtract = newDishCounter[key].amount * newDishCounter[key].cashDonation;
      delete newDishCounter[key];
      console.log("NEW DISHCOUNTER AFTER DELETE", newDishCounter);
      this.setState({dishCounter: newDishCounter});
      total -= subtract;

    this.setState({
      data: newData,
      cashTotal: total
    });
  }

  calculateTotal() {
    var dishCounter = this.state.dishCounter;
    var total = 0;

    for (var dishID in dishCounter) {
      var amount = dishCounter[dishID].amount;
      amount *= dishCounter[dishID].cashDonation;

      total += amount;
      amount = 0;
    }

    this.setState({
      cashTotal: total
    });
  }

  submitOrder() {
    console.log('clicked')

    //where status: 0 means the order is pending approval
    var newOrder = {
      chefId: this.state.chefId,
      customerId: this.state.customerId,
      cart: this.state.dishCounter,
      status: 0,
      cashTotal: this.state.cashTotal
    };

    axios
      .post("http://localhost:3000/orders", newOrder)
      .then(function(response) {
        console.log("The success response inside checkout post is ", response);
      })
      .catch(function(error) {
        console.log("The error message inside checkout post is ", error);
      });
  }

  componentDidMount() {
    console.log("compont did mont start");
    let cart = this.props.fetchCart();
    let dishItems = {};
    let chefDishes = {};
    cart.data.map(dish => {
      dishItems[dish._id] = {
        dish: dish,
        amount: 1,
        cashDonation: dish.cashDonation
      };
      this.state.cashTotal += dish.cashDonation;
    });
    console.log("CART IS", cart);
    console.log("dishItems IS", dishItems);
    this.setState(cart);
    this.setState({
      dishCounter: dishItems
    });


  }

  render() {
    console.log("render start");
    console.log("the state inside the checkout is ", this.state);
    if (!this.state.data) {
      return (
        <Container>
          <Header><Text>Checkout</Text></Header>
          <Content>
            <Text>Your shopping cart is empty!</Text>
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Header><Text>Checkout</Text></Header>
          <Content>
            <List>
              {this.state.data.map(orderItem => {
                return (
                  <CheckOutItem
                    key={orderItem._id}
                    dishCounter={this.state.dishCounter}
                    deleteDish={this.deleteDish}
                    incrementDishCount={this.incrementDishCount}
                    decrementDishCount={this.decrementDishCount}
                    submitOrder={this.submitOrder}
                    orderItem={orderItem}
                  />
                );
              })}
            </List>
            <Header><Text>Total: ${this.state.cashTotal}</Text></Header>
            <Button onPress={this.submitOrder} light>
              <Text>Submit Order</Text>
            </Button>
          </Content>
        </Container>
      );
    }
  }
}
