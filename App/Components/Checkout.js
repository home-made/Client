import React, { Component } from 'react';
import { View,AsyncStorage } from 'react-native';
import axios from 'axios';
import { Container, Content, List, Header, Text, Button } from 'native-base';
import CheckOutItem from './CheckOutItem.js';

export default class Checkout extends Component {
    /*
      Will need the following for Checkout to work
        -Array of dishes from a cook
        -An object that keeps track of the count for each dish
        -chefId?
    */
    constructor(props){
      super(props);
      this.state = {

      }
      this.incrementDishCount = this.incrementDishCount.bind(this);
      this.decrementDishCount = this.decrementDishCount.bind(this);
      this.deleteDish = this.deleteDish.bind(this);
      this.calculateTotal = this.calculateTotal.bind(this);
      this.submitOrder = this.submitOrder.bind(this);

    }

    incrementDishCount(key){
      var newDishCounter = this.state.dishCounter;
      var newCount = newDishCounter[key].amount;
      newDishCounter[key].amount = newCount + 1;

      this.setState({
        dishCounter: newDishCounter
      });

      this.calculateTotal();
    }

    decrementDishCount(key){
      var newDishCounter = this.state.dishCounter;
      var newCount = newDishCounter[key].amount;
      newCount = newCount - 1;

      if (newCount <= 0) {
        newDishCounter[key].amount = 0;
        this.setState({ dishCounter: newDishCounter});
        this.calculateTotal();

      } else {
        newDishCounter[key].amount = newCount;
        this.setState({ dishCounter: newDishCounter});
        this.calculateTotal();
      }
    }

    deleteDish(key){
      var newData = this.state.data.filter(dish => {
        return dish._id !== key;
      });

      this.setState({
        data: newData
      });
    }

    calculateTotal(){
      var dishCounter = this.state.dishCounter;
      var total = 0;

      for (var dishID in dishCounter) {
        var amount = dishCounter[dishID].amount;
        amount *= dishCounter[dishID].cashDonation;

        total+=amount;
        amount = 0;
      }

      this.setState({
        cashTotal: total
      });

    }

    submitOrder(){
      //will need the customerId && chefId to submit order to DB
      //hardcoded info for demo purposes

      /*
      Note: I think we should set the state.dishCounter obj as
      the cart property on an Order because that dishCounter obj
      has the quantity per dish that was placed in an order. just 
      not sure what the ID for a dish is in the DB.
      */

      
      var chefId = "7564fjasdif"; //Luke Skywalker 
      var customerId = "axncmufid745"; //Darth Vader
      var cashTotal = this.state.cashTotal;

      var newOrder = {
        chefId: chefId,
        customerId: customerId,
        cart: [12],
        status: 12,
        cashTotal: cashTotal,
      }

      axios.post('http://localhost:3000/orders', newOrder)
        .then(function (response) {
          console.log("The success response inside checkout post is ", response);
        })
        .catch(function (error) {
          console.log("The error message inside checkout post is ", error);
        });

    }
    
    /* code inside componentDidMount doesn't reflect actual 
       workflow. performing axios requests to mimic functionality.
       actual data will be retrieved once components are actually
       hooked together properly. */

    componentDidMount(){
     console.log('compont did mont start')
      let cart = this.props.fetchCart()
      let dishItems ={}
      let chefDishes ={}
      cart.data.map(dish => {
        dishItems[dish._id] = {
          amount: 0,
          cashDonation: dish.cashDonation
        }
      });
      console.log(cart)
      this.setState(cart)
      this.setState({
         dishCounter: dishItems
    })


    // var chefDishes = response.data[1];
    // var dishItems = {};

    // console.log("the chefDishes are ", chefDishes);
    
    // chefDishes.map(dish => {
    //   dishItems[dish._id] = {
    //     amount: 0,
    //     cashDonation: dish.cashDonation
    //   }
    // });

    // context.setState({
    //   data: chefDishes,
    //   chefId: chefId,
    //   dishCounter: dishItems
    // });    
        
    console.log('compont did mont end')

   }

    render() {
      console.log('render start')
      console.log("the state is ", this.state);
      if (!this.state.data) {
        return( 
          <Container>
              <Header><Text>Checkout</Text></Header>
              <Content>
                  <Text>Your shopping cart is empty!</Text>
              </Content>
          </Container>
        )
        
      } else {
        return (
          
          <Container>
            <Header><Text>Checkout</Text></Header>
            <Content>
              <List>
                  {this.state.data.map((orderItem) => {
                    return <CheckOutItem 
                             key={orderItem._id}
                             dishCounter={this.state.dishCounter}
                             deleteDish={this.deleteDish}
                             incrementDishCount={this.incrementDishCount} 
                             decrementDishCount={this.decrementDishCount}
                             submitOrder={this.submitOrder}
                             orderItem={orderItem} />
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



/*

  I need to account for 

  var OrderSchema = new Schema({
    chefId: String,
    customerId: String,
    cart: [Number],
    status: Number,
    date: { type: Date, default: Date.now },
    cashTotal: Number
  });


[
          {url: "https://s3-media1.fl.yelpcdn.com/bphoto/EYXge_0jGM7RNgS2rsmVxw/o.jpg", title: "Shrimp, Napa & Pork Dumplings Photo"},
          {url: "https://s3-media2.fl.yelpcdn.com/bphoto/iAPfeRggRDUJhaKJhL5ZHw/o.jpg", title: "Juicy Pork Dumplings"},
          {url: "https://s3-media3.fl.yelpcdn.com/bphoto/483cLj4_WzDcnET0MRuv4g/o.jpg", title: "Garlic pea sprouts"},
          {url: "https://s3-media3.fl.yelpcdn.com/bphoto/hJ-H82bNFdUJQvruDbwz-w/o.jpg", title: "Beef Chow Fun"},
          {url: "https://s3-media3.fl.yelpcdn.com/bphoto/byMHqLIEmua_8RsRupPWhg/o.jpg", title: "Beef Wrap Close-Up"}
        ]




*/