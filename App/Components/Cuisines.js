import React, { Component } from "react";
import { StyleSheet, View, ScrollView  } from "react-native";
import { Container, Content, List, ListItem, Text } from "native-base";
import {Actions} from "react-native-router-flux";

export default class Cuisines extends Component {
  render() {
    let genres = "Barbecue,Burgers,Chinese,Indian,Italian,Japanese,Korean,Mediterranean,Mexican,Pizza,Sandwiches,Sushi,Thai,Vegetarian,Vietnamese,American,Ethiopian,Other".split(
      ","
    );

    return (
      <ScrollView style={{ alignSelf: "stretch" }}>
        <Container>
          <Content>
            <List style={{ marginTop: 50 }}>
              {genres.map(genre => {
                return (
                  <ListItem onPress={()=> Actions.chefmap()}>
                    <Text>
                      {genre}
                    </Text>
                  </ListItem>
                );
              })}
            </List>
          </Content>
        </Container>
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
