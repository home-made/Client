import React, { Component } from "react";
import { AsyncStorage, View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Actions } from "react-native-router-flux";

import Promise from 'bluebird';
import Auth0Lock from 'react-native-lock';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.lock = new Auth0Lock({
      clientId: "Rp7ThYPPRNHrSGUaLOv_Ub307zwDb_VR",
      domain: "stzy.auth0.com",
      useBrowser: true,
    });

    this.lock.show = Promise.promisify(this.lock.show, {multiArgs: true});
    this.lock.show.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    this.lock.show({
      // connections: ["touchid"]
      closeable: true
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
      } else {
        console.log('profile: ', profile);
        console.log('token: ', token);
        AsyncStorage.profile = profile;
        AsyncStorage.token = token;
        console.log(AsyncStorage);
        Actions.app();
      }
    })
  }

  render() {
    console.log(AsyncStorage);
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.onLogin}>
          <Text>
            Log In
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cccccc"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff"
  }
});
