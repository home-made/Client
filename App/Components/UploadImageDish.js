import React, { Component } from "react";
import Camera from "react-native-camera";
import { Actions } from "react-native-router-flux";
import { RNS3 } from 'react-native-aws3';

import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  Dimensions
} from "react-native";
import { Container, Content, List, ListItem } from "native-base";
var RNFS = require("react-native-fs");

class Upload extends Component {
  constructor() {
    super();
  }
 
  

  takePicture() {
    let opt= {
      target: Camera.constants.CaptureTarget.disk
    }
    this.camera.capture(opt).then(data => {
      console.log(data);
      let file = {
        // `uri` can also be a file system path (i.e. file://) 
        uri: data.path,
        name: "image.jpg",
        type: "image/jpeg"
      }
      
      let options = {
        keyPrefix: "uploads/",
        bucket: "homemadedishes",
        region: "us-east-1",
        accessKey: "AKIAJXAGIK4OW5YB7DHA",
        secretKey: "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",
        successActionStatus: 201
      }
    RNS3.put(file, options).then(response => {
    if (response.status !== 201)
      throw new Error("Failed to upload image to S3");
    console.log(response.body.postResponse.location);
    Actions.dishconfirm()
    /**
     * {
     *   postResponse: {
     *     bucket: "your-bucket",
     *     etag : "9f620878e06d28774406017480a59fd4",
     *     key: "uploads/image.png",
     *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
     *   }
     * }
     */
    });
  })
}

  render() {
    const { container, preview, capture } = styles;

    return (
      <View style={container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={preview}
          aspect={Camera.constants.Aspect.fill}
        >
          <Text style={capture} onPress={this.takePicture.bind(this)}>
            CAPTURE
          </Text>
        </Camera>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#ffffff"
  },
  preview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    //  height: Dimensions.get('window').height,
    //  width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "#000",
    padding: 10,
    margin: 145
  }
});

export default Upload;
