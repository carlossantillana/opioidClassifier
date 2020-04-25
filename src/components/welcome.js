import React, { Component } from 'react';
import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import { checkDrug } from '../../actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Welcome extends Component{
  constructor(props) {
    super(props);
    this.state = {
        drugName: ''
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
      <Container>
        <Content>
          <Form>
            <Item last >
              <Input placeholder="Enter Drug Name"
              value={this.state.drugName}
                onChange={this.handleChange}/>
            </Item>
            <Button primary
              onPress={() => this.props.checkDrug(this.state.drugName)}>
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
    drugName : state.drugName
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({checkDrug: checkDrug}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Welcome);
