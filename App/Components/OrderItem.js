import React, { Component } from 'react';
import StyleSheet from 'react-native';
import { ListItem, Thumbnail, Text, Body, Button } from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';


export default class OrderItem extends Component {

    handlePress(){
      this.props.incrementDishCount(this.props.orderItem._id)
    }

    handleDelete(){
      this.props.deleteDish(this.props.orderItem._id);
    }

    render(){
      var url = this.props.orderItem.url;
      return (
        <ListItem>
          <Thumbnail square size={80} source={{uri: this.props.orderItem.dishImages[0]}} />
            <Body>
                <Text>{this.props.orderItem.name}</Text>
                <Row style={{justifyContent: "space-around", alignItems: "flex-start"}}>

                <Button onPress={this.handlePress.bind(this)} light small>
                  <Text>Quantity</Text>
                </Button>

                <Button onPress={this.handleDelete.bind(this)} danger small>
                  <Text>Delete</Text>
                </Button>
                </Row>
            </Body>
        </ListItem>
      )
    }
}





