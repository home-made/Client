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

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleReviewsPress = this.handleReviewsPress.bind(this);
    this.handleMenuPress = this.handleMenuPress.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentWillMount() {
    let chef = this.props.getChef();
    console.log("IN PROFILE CHEF IS", chef);
    this.setState({ chef: this.props.getChef(), cart: [] }, () => {
      let reviews = this.state.chef[0].chefReviews.map(curr => {
        return {
          userText: curr.reviewText,
          user: this.state.chef[2][
            this.state.chef[2]
              .map(o => {
                return o.authId;
              })
              .indexOf(curr.reviewerId)
          ]
        };
      });
      this.setState({ reviewers: reviews });
    });
  }

  handleReviewsPress() {
    console.log(this.state.reviewers);
    // let
    this.setState({ reviews: true, menu: false }, console.log(this.state));
  }

  handleMenuPress() {
    this.setState({ reviews: false, menu: true }, console.log(this.state));
  }
  handleAddToCart(e) {
    var cart = [];
    cart = this.state.cart;
    cart.push(e);
    this.setState({ cart: cart }, console.log(this.state.cart));
  }
  render() {
    return (
      <Container style={{ marginTop: 60 }}>
        <Content>
          <Card>
            <CardItem>

              <Body>
                <Text>{this.state.chef[0].firstName}</Text>
                <Text note>{this.state.chef[0].status}</Text>
              </Body>

            </CardItem>
            <CardItem>
              <Body>
                <Row style={{ justifyContent: "center", alignItems: "center" }}>
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
                </Row>
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
                return (
                  <DishView dish={dish} addToCart={this.handleAddToCart} />
                );
              })
            : <Text />}

          {this.state.reviews
            ? this.state.reviewers.map(review => {
                return <Review review={review} />;
              })
            : <Text />}
        </Content>
      </Container>
    );
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
