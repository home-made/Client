import React, { Component } from "react";
import { StyleSheet, View, ScrollView  } from "react-native";
import { Container, Content, List, ListItem, Text } from "native-base";

export default class Cuisines extends Component {
  render() {
    let genres = "Barbecue,Burgers,Chinese,Indian,Italian,Japanese,Korean,Mediterranean,Mexican,Pizza,Sandwiches,Sushi,Thai,Vegetarian,Vietnamese,Other".split(
      ","
    );

    return (
      <ScrollView style={{ alignSelf: "stretch" }}>
        <Container>
          <Content>
            <List style={{ marginTop: 50 }}>
              {genres.map(genre => {
                return (
                  <ListItem>
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
