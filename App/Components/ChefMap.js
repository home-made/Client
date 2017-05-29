import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Actions, Router, Scene, Modal } from "react-native-router-flux";
import GetGeoLocation from '../utils/GetGeoLocation';


export default class ChefMap extends Component {
  constructor(props){
    super(props);

    this.state = {
      region: null,
      data: []
    };
  }

  watchID: ?number = null;

  componentDidMount() {
    var context = this;
    //NEED TO CHANGE TEST ROUTE TO GET CHEF DATA
    //MUST AMEND BACKEND ROUTES

    GetGeoLocation(context);

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    console.log("CHEF MAP PROPS ARE: ", this.props)
    return (
      <View style={{ flex: 1, marginTop: -40 }}>

        <View style={styles.container}>
          <MapView
            showsUserLocation={true}
            style={styles.map}
            region={this.state.region}
          >
            {this.state.data.map((chef, idx) => {
              var name = chef.firstName + " " + chef.lastName;
              var coords =  {latlng: {latitude: chef.location.geo_lat, longitude: chef.location.geo_lng}, title: name};
              
              return <MapView.Marker
                onPress={()=> this.props.setChef(chef)}
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
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
