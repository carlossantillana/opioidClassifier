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
      gender: '',

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
          fontFamily: 'AppleSDGothicNeo-UltraLight',
          }} >
          Answer questionare to analyze risk for addiction
          </Text>
          <Text style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}} >Enter City</Text>
          <Item>
            <Input style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}}
            value={this.state.city}
            onChange={(e) => {this.handleChange(e, 'city')}}/>
          </Item>
          <Text style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}} >Enter State</Text>
          <Item>
            <Input style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}}
            value={this.state.currentState}
            onChange={(e) => {this.handleChange(e, 'currentState')}}/>
          </Item>
          <Text style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}} >Enter Addiction History</Text>
          <Item>
            <Input style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}}
            value={this.state.history}
            onChange={(e) => {this.handleChange(e, 'history')}}/>
          </Item>
          <Text style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}} >Enter Age</Text>
          <Item>
            <Input style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}}
            value={this.state.age}
            onChange={(e) => {this.handleChange(e, 'age')}}/>
          </Item>
          <Text style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}} >Enter Gender</Text>
          <Item>
            <Input style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}}
            value={this.state.gender}
            onChange={(e) => {this.handleChange(e, 'gender')}}/>
          </Item>
          <Button block primary
          style={{
          marginTop: 15,
          fontFamily: 'AppleSDGothicNeo-UltraLight'
          }}
        onPress={() => this.props.checkAddiction(this.state)}>
            <Text style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}} >Submit</Text>
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
    gender: state.gender,

  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({checkAddiction: checkAddiction}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(InfoForm);
