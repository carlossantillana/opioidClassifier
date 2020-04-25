import React, { Component } from 'react';
import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import { checkDrug } from '../../actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Welcome extends Component{
  render(){
    return(
      <Container>
        <Content>
          <Form>
            <Item last >
              <Input placeholder="Enter Drug Name" />
            </Item>
            <Button primary
              onPress={() => this.props.checkDrug({drugName: 'test'})}>
              <Text> Submit </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
function mapStateToProps(state){
  return{
    drugName : 'test'
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({checkDrug: checkDrug}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Welcome);
