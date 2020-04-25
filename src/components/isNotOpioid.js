import React, { Component } from 'react';

import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';

const IsNotOpioid = () => {
  return (
    <Container>
      <Content>
        <Text>Is not an Opioid</Text>
      </Content>
    </Container>
  );
}

export default IsNotOpioid;
