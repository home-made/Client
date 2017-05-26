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
const LATITUDE = 33.9760019;
const LONGITUDE = -118.3930801;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

      // region: {
      //   latitude: LATITUDE,
      //   longitude: LONGITUDE,
      //   latitudeDelta: LATITUDE_DELTA,
      //   longitudeDelta: LONGITUDE_DELTA,
      // },


export default class ChefMap extends Component {

  constructor(props){
    super(props);

    this.state = {

      initialRegion: null,

      //coords must be specified in following format:
      //{latlng: {latitude: 33.9210313, longitude: -118.4183891}, title: "Kagura Japanese"}

      data: []
    }
  }

  //Callback that is called continuously when the user is dragging the map.
  onRegionChange(region) {
    this.setState({ region });
  }
  /*
  the initialRegion is  {"coords":{"speed":-1,"longitude":-122.406417,"latitude":37.785834,"accuracy":5,"heading":-1,"altitude":0,"altitudeAccuracy":-1},"timestamp":1495761178624.973}
  */

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        //var initialRegion = JSON.stringify(position);

        console.log("the unstringified position is ", position);

        //const LATITUDE_DELTA = 0.0922;
        //const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

        var initialRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }; 

        console.log("the initialRegion is ", initialRegion)

      
        this.setState({initialRegion});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });



    /*

    //Note: amended route to retrieve all the chefs
    axios.get('http://localhost:3000/chef')
      .then( (response) => {
        console.log("got the chefs", response);

        var data = response.data.map((chef)=> {
          
          return {latlng: {latitude: chef.location.geo_lat, longitude: chef.location.geo_lng}, title: chef.firstName + " " + chef.lastName}  
        });

        this.setState({data: data});
      })
      .catch( (error) => {
       console.log(error);
      });
   */


  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.container}>
          <MapView
            showsUserLocation={true}
            style={styles.map}
            initialRegion={this.state.initialRegion}
          >
            {this.state.data.map((marker, idx)=>{
              return <MapView.Marker
                onPress={()=> Actions.cuisines()}
                key={marker.title}
                coordinate={marker.latlng}
                title={marker.title}
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

