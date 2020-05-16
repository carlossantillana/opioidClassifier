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
      county: "",
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
        <Content padder style={{marginLeft: 20}}>
          <Text style={{
            textAlign: 'center',
            fontSize: 15,
            marginLeft: -15,
            marginTop: 20,
            marginBottom: 10,
          fontFamily: 'AppleSDGothicNeo-UltraLight',
          }} >
          Answer questionare to analyze risk for addiction
          </Text>
          <Text style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}} >Enter County</Text>
          <Item >
            <Input style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}}
            value={this.state.county}
            onChange={(e) => {this.handleChange(e, 'county')}}/>
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
          width: '95%',
          fontFamily: 'AppleSDGothicNeo-UltraLight'
          }}
        onPress={() => this.props.checkAddiction({drugName: this.props.drugName, county: this.state.county, age: this.state.age, gender: this.state.gender})}>
            <Text style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}} >Submit</Text>
          </Button>
        </Content>
    )
  }
}

function mapStateToProps(state){
  return{
    drugName: state.isOpioid.drugName,
    county: state.county,
    age: state.age,
    gender: state.gender,

  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({checkAddiction: checkAddiction}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(InfoForm);
