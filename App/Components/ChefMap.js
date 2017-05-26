var axios = require('axios');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';
import { Actions, Router, Scene, Modal } from "react-native-router-flux";
const { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

console.log("the width is " + width + " and height is " + height);
console.log("the ASPECT_RATIO is " + ASPECT_RATIO + " and LONGITUDE_DELTA is " + LONGITUDE_DELTA)



export default class ChefMap extends Component {
  /*coords must be specified in following format:
  {latlng: {latitude: 33.9210313, longitude: -118.4183891}, title: "Kagura Japanese"}*/
  constructor(props){
    super(props);

    this.state = {
      region: null,
      data: []
    }
  }

  /* Flow Typing
  See: https://stackoverflow.com/questions/41570575/what-does-this-a-number-null-mean
  */
  watchID: ?number = null;


  componentDidMount() {
    /* navigator.geolocation 1) gets the geolocation,
       2) provides an error CB, 3) pass options obj */

    navigator.geolocation.getCurrentPosition(
      (position) => {

        console.log("the unstringified position is ", position);

        var region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }; 

        console.log("the region is ", region)

      
        this.setState({region});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );


    this.watchID = navigator.geolocation.watchPosition((position) => {
      var regionChange = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }; 
      
      this.setState({region: regionChange});


    });

    //Note: amended route to retrieve all the chefs
    //Filter axios data to only display chefs
    axios.get('http://localhost:3000/chef')
      .then( (response) => {
        console.log("got the chefs", response);
        var filteredChefs = response.data.filter((chef) => {
          return chef.isChef === true;
        });

        console.log("filteredChefs are", filteredChefs)

        this.setState({data: filteredChefs});
      })
      .catch( (error) => {
       console.log(error);
      });
  


  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.container}>
          <MapView
            showsUserLocation={true}
            style={styles.map}
            region={this.state.region}
          >
            {this.state.data.map((chef, idx)=>{

              var name = chef.firstName + " " + chef.lastName;
              var coords =  {latlng: {latitude: chef.location.geo_lat, longitude: chef.location.geo_lng}, title: name};

              {console.log("the user is " + name + " and coords are " + coords)}
              
              return <MapView.Marker
                onPress={()=> Actions.clickedprofile(chef.authId)}
                key={name}
                coordinate={coords.latlng}
                title={name}
              />
            })}

          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 100,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
     ...StyleSheet.absoluteFillObject,
  },
});

