import React, { Component } from 'react';
import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import InfoForm from './infoForm.js';
import { Field, reduxForm } from 'redux-form';


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
    </Container>
  );
}
}

export default IsOpioid
