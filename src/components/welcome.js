import React, { Component } from 'react';

import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';

const Welcome = () => {

  return (
    <Container>
      <Content>
        <Form>
          <Item last >
            <Input placeholder="Enter Drug Name" />
          </Item>
          <Button primary
            onPress={() => Actions.checkDrug()}>
            <Text> Submit </Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}


export default Welcome;
