import React, { Component } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { Container, Content, List, Header, Text, Button } from 'native-base';
import CheckOutItem from './CheckOutItem.js';

export default class Checkout extends Component {
    /*
      Will need the following for Checkout to work
        -Array of dishes from a cook
        -An object that keeps track of the count for each dish
        -chefID?
    */
    constructor(props){
      super(props);
      this.state = {
        data: [],
        chefID: '',
        dishCounter: {}
      }
      this.incrementDishCount = this.incrementDishCount.bind(this);
      this.decrementDishCount = this.decrementDishCount.bind(this);
      this.deleteDish = this.deleteDish.bind(this);

    }

    incrementDishCount(key){
      
      var newCounter = this.state.dishCounter;
      newCounter[key]++;

      this.setState({
        dishCounter: newCounter
      });
    }

    decrementDishCount(key){
      console.log("the key is ", key);
      var newCounter = this.state.dishCounter;
      
      console.log("the old state is ", this.state.dishCounter);
      var count = newCounter[key];
      count-=1;

      if (count <= 0) {
        newCounter[key] = 0;
        this.setState({ dishCounter: newCounter});

      } else {
        newCounter[key] -=1;
        this.setState({ dishCounter: newCounter});
      }
  
      console.log("the new state is ", this.state.dishCounter);

    }

    deleteDish(key){
      var newData = this.state.data.filter(dish => {
        return dish._id !== key;
      });

      this.setState({
        data: newData
      });
    }
    


    /* code inside componentDidMount doesn't reflect actual 
       workflow. performing axios requests to mimic functionality.
       actual data will be retrieved once components are actually
       hooked together properly. */

    componentDidMount(){
      var context = this;

      // "location": { "geo_lat": 33.9210313, "geo_lng":  -118.4183891 }
      axios.get('http://localhost:3000/chef?geo_lat=33.9210313&geo_lng=-118.4183891')
        .then(response => {
          var chefID = response.data[0].authId;

          axios.get(`http://localhost:3000/chef/${chefID}`)
            .then(response => {
              var chefDishes = response.data[1];
              var dishItems = {};
              
              chefDishes.map(dish => dishItems[dish._id] = 0 );

              context.setState({
                data: chefDishes,
                chefID: chefID,
                dishCounter: dishItems
              });    
            })
            .catch(error => {
              console.log("The error inside axios get /chef/:chefID inside checkout is ", error);
            });

        })
        .catch(error => {
            console.log('The error inside Checkout.js is ', error);
        });
   }

    render() {
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
                             orderItem={orderItem} />
                  })}
              </List>
              <Button light>
                <Text> Submit Order </Text>
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



