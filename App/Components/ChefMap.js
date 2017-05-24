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
//determines how
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default class Map extends Component {

  constructor(props){
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

      //coords must be specified in following format:
      //{latlng: {latitude: 33.9210313, longitude: -118.4183891}, title: "Kagura Japanese"}

      data: []
    }
  }

  //Callback that is called continuously when the user is dragging the map.
  onRegionChange(region) {
    this.setState({ region });
  }

  componentDidMount() {
    axios.get('http://localhost:3000/chef')
      .then( (response) => {
        console.log("got the chefs", response);

        var data = response.data.map((chef)=> {
          
          return {latlng: {latitude: chef.location.geo_lat, longitude: chef.location.geo_lng}, title: chef.firstName + " " + chef.lastName}  
        });

        this.setState({data});
      })
      .catch( (error) => {
       console.log(error);
      });


  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.container}>
          <MapView
            showsUserLocation
            style={styles.map}
            initialRegion={this.state.region}
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

