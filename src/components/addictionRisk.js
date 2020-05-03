import React, { Component } from 'react';
import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import InfoForm from './infoForm.js';
import { Field, reduxForm } from 'redux-form';
import Speedometer from 'react-native-speedometer-chart';

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
      <Content>
          <Speedometer style={{  alignItems: "center" }} value={this.state.risk}
          totalValue={10} internalColor={this.state.color}/>
          <Text style={{
          textAlign: 'center',
          textTransform: 'capitalize',
          marginTop: 15,
          fontSize: 16,
        }} >Risk is {this.state.risk} out of 10</Text>

        <Text style={{
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: 20,
        fontSize: 16,
      }} >Check out these links to find out more:</Text>
      </Content>
    </Container>
  );
}
}

export default AddictionRisk
