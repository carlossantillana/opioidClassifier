import React, { Component } from 'react';
import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import InfoForm from './infoForm.js';
import { Field, reduxForm } from 'redux-form';


class AddictionRisk extends Component{
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
      fontSize: 20,
    }} >Your addiction risk is {Math.floor(Math.random() * Math.floor(10))} out of 10</Text>
      </Content>
    </Container>
  );
}
}

export default AddictionRisk
