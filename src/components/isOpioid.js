import React, { Component } from 'react';
import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import InfoForm from './infoForm.js';
import { Field, reduxForm } from 'redux-form';
import { ImageBackground } from 'react-native';


class IsOpioid extends Component{
  constructor(props) {
    super(props);
    this.state = {
        drugName: ''
    };
}

  render(){
  return (
    <Container>
    <ImageBackground style={{ width: '100%', height: '100%'}} source={require("../../assets/Capture4.jpg")}>

      <Content>
        <Text style={{
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: 'AppleSDGothicNeo-UltraLight',
        fontSize: 20,
        }} >
        {this.props.drug} is an opioid</Text>
        <InfoForm />
      </Content>
      </ImageBackground>
    </Container>
  );
}
}

export default IsOpioid
