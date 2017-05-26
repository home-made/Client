import React, { Component } from "react";
import { StyleSheet, AsyncStorage, Image, Container } from "react-native";
import { View, Input, Item, Button, Text } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { Actions } from "react-native-router-flux";
import axios from "axios";

export default class EditProfile extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let send = { authId: AsyncStorage.profile.userId };
    if (this.state.address) {
      send.address = this.state.address;
    }
    if (this.state.phone) {
      send.phone = this.state.phone;
    }
    if (this.state.status) {
      send.state = this.state.status;
    }

    axios.put("http://localhost:3000/user", send).then(Actions.cuisines());
  }

  render() {
    console.log("PROFILE IS", AsyncStorage.profile);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <Text>
          {AsyncStorage.profile.name}
        </Text>

        <Image
          style={{
            borderRadius: 75,
            height: 150,
            width: 150,
            marginTop: 70,
            marginBottom: 20
          }}
          source={{
            uri: AsyncStorage.profile.extraInfo.picture_large
          }}
        />

        <Item>
          <Text>Update Address:</Text>
        </Item>
        <Item>
          <Input
            placeholder="Address"
            keyboardType={"ascii-capable"}
            onChangeText={address =>
              this.setState({ address }, () => console.log(address))}
          />
        </Item>
        <Item>
          <Text>Update Phone Number:</Text>
        </Item>
        <Item>
          <Input
            placeholder="Phone Number"
            onChangeText={phone => this.setState({ phone })}
          />
        </Item>
        <Item>
          <Text>Update Status:</Text>
        </Item>
        <Item>
          <Input
            placeholder="Status"
            onChangeText={status => this.setState({ status })}
          />
        </Item>
        <Item>
          <Button
            style={{ marginTop: 10 }}
            onPress={() => {
              this.handleSubmit();
            }}
          >
            <Text>Submit</Text>
          </Button>
        </Item>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});