import React, { Component } from 'react';
import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import InfoForm from './infoForm.js';
import { Field, reduxForm } from 'redux-form';
import { ImageBackground, Linking } from 'react-native';

class IsNotOpioid extends Component{
  constructor(props) {
    super(props);
    this.state = {
        drugName: ''
    };
}

  render(){
  return (
    <Container >
    <ImageBackground style={{ width: '100%', height: '100%'}} source={require("../../assets/Capture4.jpg")}>

      <Content>
      <Text style={{
      textAlign: 'center',
      textTransform: 'capitalize',
      fontFamily: 'AppleSDGothicNeo-UltraLight',
      fontSize: 24,
      marginTop: 70,
      }} >{this.props.drug} is not an opioid</Text>
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

export default IsNotOpioid
