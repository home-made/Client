import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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

      seedData: [
        {latlng: {latitude: 33.9210313, longitude: -118.4183891}, title: "Kagura Japanese"}, 
        {latlng: {latitude: 33.9620653, longitude: -118.3689844}, title: "Maria's Tacos"},
        {latlng: {latitude: 33.9911192, longitude: -118.3979346}, title: "Chrargha House"},
        {latlng: {latitude: 34.0628019, longitude: -118.1236872}, title: "Mama Lu's"},
        {latlng: {latitude: 34.0617777, longitude: -118.1360685}, title: "Hot Pot Hot Pot"}
      ]
    }
  }

  //Callback that is called continuously when the user is dragging the map.
  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            showUserLocation={true}
            style={styles.map}
            initialRegion={this.state.region}
          >
            {this.state.seedData.map((marker, idx)=>{
              return <MapView.Marker
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

