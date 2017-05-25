import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Content, List, ListItem, Thumbnail, Text, Body, Left, Right } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';

export default class NavBar extends Component {

  cuisines() {
    Actions.cuisines({type:ActionConst.RESET});
    setTimeout(() => Actions.refresh({ key: 'drawer', open: false }), 0)
  }

  newpage() {
    Actions.newpage({type:ActionConst.RESET});
    setTimeout(() => Actions.refresh({ key: 'drawer', open: false }), 0)
  }

  actionmenu() {
    Actions.actionmenu({type:ActionConst.RESET});
    setTimeout(() => Actions.refresh({ key: 'drawer', open: false }), 0)
  }

  render() {
    return (
      <Container style={styles.actionButtonIcon}>
        <Content style={{ marginTop: 20 }}>
          <ListItem avatar onPress={this.cuisines}>
            <Body>
                <Text>Cuisines</Text>
            </Body>
            <Right>
              <Text note>🍕</Text>
            </Right>
          </ListItem>
          <ListItem avatar onPress={this.newpage}>
            <Body>
              <Text>New Page</Text>
            </Body>
            <Right>
              <Text note>📄</Text>
            </Right>
          </ListItem>
          <ListItem avatar onPress={this.actionmenu}>
            <Body>
              <Text>Action Menu</Text>
            </Body>
            <Right>
              <Text note>AM</Text>
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
