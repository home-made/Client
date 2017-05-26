import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Router, Scene, Actions, ActionConst } from "react-native-router-flux";
 
import NavigationDrawer from './Drawer';
import HomePage from "./HomePage";
import Cuisines from "../Components/Cuisines";
import ChefMap from "../Components/ChefMap";
import ChefList from "../Components/ChefList";
import Profile from "../Components/Profile";

import ClickedProfile from "../Components/ClickedProfile";

import Checkout from "../Components/Checkout";
import EditProfile from "../Components/EditProfile";

import axios from "axios";
// const cstore = store();

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.setCuisineType = this.setCuisineType.bind(this);
    this.fetchChefs = this.fetchChefs.bind(this);
    this.setChef = this.setChef.bind(this);
    this.getChef = this.getChef.bind(this);
    this.fetchCart=this.fetchCart.bind(this);
    this.setCart=this.setCart.bind(this)
  }

  setChef(chef) {
    axios.get(`http://localhost:3000/chef/${chef.authId}`).then( res => {
      this.setState({user: res.data}, () => {
        Actions.profile();});
    })
  }
    


  getChef() {
    console.log("INSIDE GET CHEF", this.state.user)
    return this.state.user;
  }

  setCuisineType(genre) {
    console.log(genre);
    this.setState({cuisineType: genre}, () => {
      let url = `http://localhost:3000/chef/style/${this.state.cuisineType}`;
      axios
        .get(url)
        .then(res => this.setState({chefs: res.data}, () => {
          if(res.data.length > 0) {
                            Actions.chefList({type:ActionConst.RESET});

                console.log('yurr')
            
          }
        }))
        .catch(err => {
          console.log("ERROR IS", err);
        })
    })
  }

  fetchChefs() {
    return this.state.chefs;
  }
  setCart(cart){
    this.setState({checkout: cart})
  }
  fetchCart() {
    return this.state.checkout;
  }

  render() {
    const scenes = Actions.create(
      <Scene key="root">
        <Scene key='homepage' component={HomePage} direction='vertical' style={styles.navbar} initial />
        <Scene key="drawer" type={ActionConst.RESET} component={NavigationDrawer} open={false} >
          <Scene key="main" initial>
            <Scene key="cuisines" component={Cuisines} title="Cuisines" setCuisineType={this.setCuisineType} />
            <Scene key="chefList" component={ChefList} title="Chefs" fetchChefs={this.fetchChefs} setChef={this.setChef} />
            <Scene key="profile"  setCart={this.setCart}chef={this.state.user} component={Profile}  getChef={this.getChef} />
            
            <Scene key="clickedprofile" component={ClickedProfile}  />
            
            <Scene key="chefMap"  component={ChefMap} />
            <Scene key="checkout" component={Checkout} fetchCart={this.fetchCart}/> 
            <Scene key="edit" component={EditProfile} /> 
          </Scene>
        </Scene>
      </Scene>
    )
    return (
        <Router scenes={scenes}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default App;
