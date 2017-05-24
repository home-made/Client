import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

export default class ChefList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({ cuisineType: this.props.fetchCuisineType() }, () => {
      console.log(this.state.cuisineType);
      let url = `https://ec2-184-72-193-131.compute-1.amazonaws.com:3000/chef/style/${this.state.cuisineType}`;
      console.log(url);
      axios
        .get(url, null)
        .then(res => { console.log(res) })
        .catch(err => {
          console.log("ERROR IS", err);
        })
    });
  }

  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
