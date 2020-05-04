import React, { Component } from 'react';
import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import InfoForm from './infoForm.js';
import { Field, reduxForm } from 'redux-form';
import Speedometer from 'react-native-speedometer-chart';
import { ImageBackground, Linking } from 'react-native';

class AddictionRisk extends Component{
  constructor(props) {
    super(props);
    this.state = {
        drugName: '',
        risk: Math.floor(Math.random() * Math.floor(10)),
        color: 'green'
    };
}
componentDidMount(prevProps) {
  if(this.state.risk < 4){
  this.setState({
      color: 'green'
  })
} else if (this.state.risk < 7){
  this.setState({
      color: 'yellow'
  }) } else {
    this.setState({
        color: 'red'
    })
  }
}
  render(){
  return (
    <Container style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
    <ImageBackground style={{ width: '100%', height: '100%'}} source={require("../../assets/Capture4.jpg")}>

      <Content>
          <Speedometer style={{  marginTop: 60, alignItems: "center" }} value={this.state.risk}
          totalValue={10} internalColor={this.state.color}/>
          <Text style={{
          textAlign: 'center',
          textTransform: 'capitalize',
          fontFamily: 'AppleSDGothicNeo-UltraLight',
          marginTop: 15,
          fontSize: 16,
        }} >Risk is {this.state.risk} out of 10</Text>

        <Text style={{
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: 'AppleSDGothicNeo-UltraLight',
        marginTop: 20,
        fontSize: 16,
        color: 'blue'
      }}
      onPress={() => Linking.openURL('https://www.webmd.com/search/search_results/default.aspx?query=' + this.props.drug)}
      >Check out this link to find out more!</Text>
      </Content>
      </ImageBackground>

    </Container>
  );
}
}

export default AddictionRisk
