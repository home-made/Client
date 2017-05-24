import React, { Component } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";
import { Container, Content, List, ListItem } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

export default class ChefList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({ chefs: this.props.fetchChefs() });
  }

  render() {
    let chefs = this.state.chefs;
    let count = 0;
    return (
      <Container>
        <Content>
          <List
            style={{ marginTop: 60 }}
            dataArray={chefs}
            renderRow={chef => (
              
              <ListItem>
                <Image
                  style={{ width: 70, height: 70 }}
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Tupac_Amaru_Shakur2.jpg/220px-Tupac_Amaru_Shakur2.jpg"
                  }}
                />
                <Text style={{ marginLeft: 10}}>{`${chef.firstName}
${chef.status}`
                }</Text>
              </ListItem>
            )}
          />
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
    backgroundColor: "#F5FCFF"
  }
});
