import React , { Component } from 'react';
import Expo from 'expo';
import { View } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text } from 'native-base';
import { Field,reduxForm } from 'redux-form';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { checkAddiction } from '../../actions/index.js';
import {Actions} from 'react-native-router-flux';

class InfoForm extends Component {
  constructor(props){
    super(props);
    this.state={
      drugName: "",
      city: "",
      currentState: "",
      history: "",
      age: '',
    };
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange = (e, param) => {
    this.setState({
        [param]: e.nativeEvent.text
    })
  }

  render(){
    return (
      <Container>
        <Content padder>
          <Text style={{
            textAlign: 'center',
            fontSize: 15,
            marginTop: 20,
            marginBottom: 10,
          }} >
          Questionare to analyze risk for addiction
          </Text>
          <Text>Enter City</Text>
          <Item>
            <Input
            value={this.state.city}
            onChange={(e) => {this.handleChange(e, 'city')}}/>
          </Item>
          <Text>Enter State</Text>
          <Item>
            <Input
            value={this.state.currentState}
            onChange={(e) => {this.handleChange(e, 'currentState')}}/>
          </Item>
          <Text>Enter Addiction History</Text>
          <Item>
            <Input
            value={this.state.history}
            onChange={(e) => {this.handleChange(e, 'history')}}/>
          </Item>
          <Text>Enter Age</Text>
          <Item>
            <Input
            value={this.state.age}
            onChange={(e) => {this.handleChange(e, 'age')}}/>
          </Item>
          <Button block primary
          style={{
          marginTop: 15,
          }}
        onPress={() => this.props.checkAddiction(this.state)}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state){
  return{
    drugName: state.drugName,
    city: state.city,
    currentState: state.currentState,
    history: state.history,
    age: state.age,
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({checkAddiction: checkAddiction}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(InfoForm);
