import React, { Component } from 'react';
import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import InfoForm from './infoForm.js';
import { Field, reduxForm } from 'redux-form';
import Speedometer from 'react-native-speedometer-chart';
import { ImageBackground, Linking } from 'react-native';
import * as tf from "@tensorflow/tfjs"
import { fetch } from '@tensorflow/tfjs-react-native'
// import * as tfvis from "@tensorflow/tfjs-vis";
import Papa from 'papaparse';


class AddictionRisk extends Component{
  constructor(props) {
    super(props);
    this.state = {
        drugName: this.props.drugName,
        risk: -10,
        color: 'green',
        isTfReady: false,
    };
}
oneHotEncoder(data, userProfile) {
  let counties = new Set();
  let countyMap = new Object();
  data.forEach(function(d){
    if (typeof d.county !== 'undefined'){
      counties.add(d.county.toLowerCase());
    }
  });
  let i = 0;
  counties.forEach(function(d){
    countyMap[d] = i++;
  });
  data.pop()
  userProfile.county = countyMap[userProfile.county.toLowerCase()];
  return data.map(d => ({sex: d.sex =="Males" ? 1 : 0, age: d.age, county: countyMap[d.county.toLowerCase()], rate: d.rate}))
}
 createModel() {
  // Create a sequential model
  const model = tf.sequential();

  // Add a single input layer
  model.add(tf.layers.dense({inputShape: [148], units: 1, activation: 'relu', useBias: true}));

  // Add an output layer
  model.add(tf.layers.dense({units: 1, useBias: true}));

  return model;
}
 getData () {
  return new Promise((resolve, reject) => {
    Papa.parse("https://raw.githubusercontent.com/carlossantillana/opioidClassifier/master/assets/finalCleanData.txt", {
      header: true,
      download: true,
      dynamicTyping: true,
      complete (results, file) {
        resolve(results.data)
      },
      error (err, file) {
        reject(err)
      }
    })
  })
}

  async run ()  {
  let userProfile = {age: this.props.age, gender: (this.props.gender  == "Male" || this.props.gender  == "male") ? 1 : 0, county:this.props.county}

  // const model = await this.createModel();
  let data = await this.getData();
  data = this.oneHotEncoder(data, userProfile);
  const values = data.map(d => ({
    x1: d.county,
    x2: d.sex,
    x3: d.age,
    y: d.rate,
  }));
const tensorData = this.convertToTensor(data, userProfile);
const {inputs, labels, cleanUser} = tensorData;
// // Train the model
// console.log('start Training');
// await this.trainModel(model, inputs, labels);

//Browser
// await model.save('downloads://opioid-model');
const model = await tf.loadLayersModel('https://raw.githubusercontent.com/carlossantillana/opioidClassifier/master/assets/opioid-model.json');
let risk = this.testModel(model, cleanUser)

risk = this.norm(risk)
if (risk > 1){
  risk = 1
}
return risk
}

norm(risk){
  if (risk <= 0.2){
    risk *= 1.3
  } else if (risk <= 0.3){
    risk  *= 1.6
  } else {
    risk *= 2.1
  }
  return risk
}
 convertToTensor(data, userProfile) {
  // Wrapping these calculations in a tidy will dispose any
  // intermediate tensors.

  return tf.tidy(() => {
    // Step 1. Shuffle the data
    tf.util.shuffle(data);

    // Step 2. Convert data to Tensor
    const inputs = data.map(d => [d.county, d.sex,d.age])
    let county = data.map(d => d.county);
    let gender = data.map(d => d.sex);
    let age = data.map(d => d.age);
    county = tf.tensor1d(county, 'int32');
    county = tf.oneHot(county, 60);
    gender = tf.tensor1d(gender, 'int32');
    gender = tf.oneHot(gender, 2);
    age = tf.tensor1d(age, 'int32');
    age = tf.oneHot(age, 86);

    let userCounty = userProfile.county;
    let userGender = userProfile.sex;
    let userAge = userProfile.age;
    userCounty = tf.tensor1d([userCounty], 'int32');
    userCounty = tf.oneHot(userCounty, 60);
    userGender = tf.tensor1d([userGender], 'int32');
    userGender = tf.oneHot(userGender, 2);
    userAge = tf.tensor1d([userAge], 'int32');
    userAge = tf.oneHot(userAge, 86);

    const user = tf.concat([userCounty.flatten(), userGender.flatten(), userAge.flatten()],0)
    user.print()
    const labels = data.map(d => d.rate);
    const inputTensor = tf.concat([county, gender, age],1)
    const labelTensor = tf.tensor1d(labels);

    //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();


    return {
      inputs: inputTensor,
      labels: labelTensor,
      // Return the min/max bounds so we can use them later.
      inputMax,
      inputMin,
      labelMax,
      labelMin,
      cleanUser : user,
    }
  });
}
async  trainModel(model, inputs, labels) {
  // Prepare the model for training.
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ['mse'],
  });

  const batchSize = 32;
  const epochs = 55;
  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    validationSplit: .15,
    shuffle: true,
  });
}
testModel(model, inputData) {
  inputData.print(true)
  const preds = tf.tidy(() => {
    const xs = inputData.as2D(1,148)
    xs.print(true)
    const preds = model.predict(xs);
    return preds.dataSync();
  });
  return preds;
}

async componentDidMount(prevProps) {
      await tf.ready();
      this.setState({
    isTfReady: true,
  });
  let calcRisk = await this.run()
this.setState({
    risk: Math.round(calcRisk * 10)
})
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
     <ImageBackground style={{ width: '100%', height: '100%'}} source={require("../../assets/Capture4.jpg")}>

      <Content>
          { this.state.risk > -2 && <Speedometer style={{  marginTop: 60, alignItems: "center" }} value={this.state.risk}
          totalValue={10} internalColor={this.state.color}/> }
          { this.state.risk > -2 && <Text style={{
          textAlign: 'center',
          textTransform: 'capitalize',
          fontFamily: 'AppleSDGothicNeo-UltraLight',
          marginTop: 15,
          fontSize: 16,
        }} >Risk is {this.state.risk} out of 10</Text> }

        { this.state.risk > -2 && <Text style={{
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: 'AppleSDGothicNeo-UltraLight',
        marginTop: 20,
        fontSize: 16,
        color: 'blue'
      }}
      onPress={() => Linking.openURL('https://www.webmd.com/search/search_results/default.aspx?query=' + this.props.drug)}
      >Check out this link to find out more!</Text>}
      </Content>
      </ImageBackground>

    </Container>
  );
}
}

export default AddictionRisk
