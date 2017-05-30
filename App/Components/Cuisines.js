import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Container, Content, List, ListItem, Text } from "native-base";

export default class Cuisines extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    console.log('mounting')
      this.setState({genres: this.props.getStyles()}, () => console.log(this.state))
  }
  render() {
 
    console.log('render')
    return (
      <ScrollView style={{ alignSelf: "stretch" }}>
        <List style={{ marginTop: 60 }}>
          {this.state.genres ? this.state.genres.map(genre => {
            return (
              <ListItem onPress={() => this.props.setCuisineType(genre)}>
                <Text>
                  {genre}
                </Text>
              </ListItem>
            );
          }): ''}
        </List>
      </ScrollView>
    );
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
