import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "react-native-circular-action-menu";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions, ActionConst } from 'react-native-router-flux';

export default class ActionMenu extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
        {/*Rest of App come ABOVE the action button component!*/}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Task"
            onPress={() => Actions.cuisines({type:ActionConst.RESET})}
          >
            <Icon name="ios-pizza" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="New Task"
            onPress={() => Actions.navbar({type:ActionConst.RESET})}
          >
            <Icon name="ios-person" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="All Tasks"
            onPress={() => Actions.homepage({type:ActionConst.RESET})}
          >
            <Icon name="ios-home" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
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
