import React, { Component } from 'react';
import { Container, Content, Form, Item,
  Input, Button, Text, Thumbnail } from 'native-base';
  import { ImageBackground } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { checkDrug } from '../../actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Welcome extends Component{
  constructor(props) {
    super(props);
    this.state = {
        drugName: '',
    };
    this.handleChange = this.handleChange.bind(this)
}
  handleChange = e => {
    this.setState({
        drugName: e.nativeEvent.text
    })
}

  render(){
    return(
      <Container
      style={{  alignItems: "center", fontFamily: 'AppleSDGothicNeo-UltraLight' }}>
      <ImageBackground style={{ width: '100%', height: '100%'}} source={require("../../assets/Capture4.jpg")}>
        <Content style={{  marginTop: 50, flexDirection: 'row', alignSelf: 'center' }}>

        <Thumbnail  style={{  marginLeft: 30, height: 125, width: 125}} large source={require("../../assets/morphine.png")}/>
          <Form>
            <Item style={{  marginTop: 15, minWidth: 150, fontFamily: 'AppleSDGothicNeo-UltraLight'}} last >
              <Input placeholder="Enter Drug Name"
              style={{ fontFamily: 'AppleSDGothicNeo-UltraLight'}}
              value={this.state.drugName}
                onChange={this.handleChange}/>
            </Item>
            <Button primary
            style={{  marginTop: 30, textAlign: 'center', paddingLeft: 35, fontFamily: 'AppleSDGothicNeo-UltraLight' }}
              onPress={() => this.props.checkDrug(this.state.drugName)}>
              <Text style={{fontFamily: 'AppleSDGothicNeo-UltraLight'}} >Submit </Text>
            </Button>
          </Form>
        </Content>
        </ImageBackground>

      </Container>
    );
  }
}
function mapStateToProps(state){
  return{
    drugName : state.drugName
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({checkDrug: checkDrug}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Welcome);
