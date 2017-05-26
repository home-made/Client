import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  Container,
  Text,
  Content,
  Card,
  CardItem,
  Left,
  Body,
  Button
} from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import DishView from "./DishView";
import Review from "./Review";
import axios from 'axios';

export default class ClickedProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleReviewsPress = this.handleReviewsPress.bind(this);
    this.handleMenuPress = this.handleMenuPress.bind(this);
  }

  componentWillMount() {
    //let chef = this.props.getChef();
    console.log("INSIDE CLICKED PROFILE PROPS ARE", this.props);
    
    axios.get(`http://localhost:3000/chef/${this.props.data}`).then( res => {      
      console.log("clickedprofile componentwillmount", res);

      this.setState({chef: res.data})
    }).catch((err) => console.log('Get chef err: ', err))
  }

  handleReviewsPress() {
    this.setState({ reviews: true, menu: false }, console.log(this.state));
  }

  handleMenuPress() {
    this.setState({ reviews: false, menu: true }, console.log(this.state));
  }

  render() {
    if(!this.state.chef){
      return <Text>Waiting for data...</Text>
    } else {
      return (
        
  
        <Container style={{ marginTop: 60 }}>
          <Content>
            <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{this.state.chef[0].firstName}</Text>
                    <Text note>{this.state.chef[0].status}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    style={{
                      width: 120,
                      height: 120,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    source={{
                      uri: this.state.chef[0].profileUrl
                    }}
                  />
                </Body>
              </CardItem>
            </Card>
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              <Button onPress={this.handleReviewsPress}>
                <Text>Reviews</Text>
              </Button>
              <Text> </Text>
              <Button onPress={this.handleMenuPress}><Text>Menu</Text></Button>
            </Row>
  
            {this.state.menu
              ? this.state.chef[1].map(dish => {
                  return <DishView dish={dish} />;
                })
              : <Text />}
  
            {this.state.reviews
              ? this.state.chef[0].chefReviews.map(review => {
                  return <Review review={review} />;
                })
              : <Text />}
          </Content>
        </Container>
  
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});