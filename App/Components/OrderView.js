import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Tabs,
  Tab,
  Tab1,
  Tab2,
  Tab3,
  TabHeading,
  List,
  ListItem
} from "native-base";
import axios from "axios";

export default class OrderView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    let authID = AsyncStorage.profile.userId;
    console.log("http://localhost:3000/orders/0/" + authID);
    // async function getAuthID() {

    //   try {
    //     const data = await AsyncStorage.getItem('profile')
    //       if (data !== null && data !== undefined) {
    //         console.log('async data: ', data);
    //         authID= data[0][1].;
    //       }
    //   } catch (err) {
    //     console.log('Error getting data: ', err);
    //   }
    // }

    axios.get("http://localhost:3000/orders/0/" + authID).then(pending => {
      this.setState({ pending: pending.data[0] }, () =>
        console.log("PENDING ORDERS ARE ", this.state.pending)
      );
      axios.get("http://localhost:3000/orders/1/" + authID).then(accepted => {
        this.setState({ accepted: accepted.data[0] }, () =>
          console.log("ACCEPTED ORDERS ARE ", this.state.accepted)
        );
        axios.get("http://localhost:3000/orders/2/" + authID).then(complete => {
          this.setState({ complete: complete.data[0] }, () =>
            console.log("COMPLETE ORDERS ARE ", this.state.complete)
          );
        });
      });
    });
  }

  render() {
    return (
      <Container>
        <Header hasTabs />
        <Tabs>
          <Tab heading={<TabHeading><Text>Pending</Text></TabHeading>}>
            <List
              style={{ marginTop: 10 }}
              dataArray={this.state.pending}
              renderRow={pOrder => (
                <ListItem>
                  <Text style={{ marginLeft: 10 }}>PENDING ORDER</Text>
                </ListItem>
              )}
            />
          </Tab>
          <Tab heading={<TabHeading><Text>Confirmed</Text></TabHeading>}>
            <List
              style={{ marginTop: 10 }}
              dataArray={this.state.accepted}
              renderRow={aOrder => (
                <ListItem>
                  <Text style={{ marginLeft: 10 }}>Confirmed</Text>
                </ListItem>
              )}
            />
          </Tab>
          <Tab heading={<TabHeading><Text>Complete</Text></TabHeading>}>
            <List
              style={{ marginTop: 10 }}
              dataArray={this.state.complete}
              renderRow={cOrder => (
                <ListItem>
                  <Text style={{ marginLeft: 10 }}>Complete</Text>
                </ListItem>
              )}
            />
          </Tab>
        </Tabs>
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
