import React, { Component } from 'react';
import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import InfoForm from './infoForm.js';
import { Field, reduxForm } from 'redux-form';
import Speedometer from 'react-native-speedometer-chart';
import { ImageBackground, Linking } from 'react-native';
import * as tf from "@tensorflow/tfjs";
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
  model.add(tf.layers.dense({inputShape: [3], units: 1, useBias: true}));

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

  // const model = this.createModel();
  // tfvis.show.modelSummary({name: 'Model Summary'}, model);
  let data = await this.getData();
  data = this.oneHotEncoder(data, userProfile);
//   console.log(userProfile)
//   const values = data.map(d => ({
//     x1: d.county,
//     x2: d.sex,
//     x3: d.age,
//     y: d.rate,
//   }));
//
// const tensorData = this.convertToTensor(data);
// const {inputs, labels} = tensorData;
//
// // Train the model
// console.log('start Training');
// await this.trainModel(model, inputs, labels);
// await model.save('downloads://opioid-model');
const model = await tf.loadLayersModel('https://raw.githubusercontent.com/carlossantillana/opioidClassifier/master/assets/opioid-model.json');

let risk = this.testModel(model, [userProfile.county, userProfile.gender, userProfile.age])
console.log(`risk: ${risk}`)
return risk
}

 convertToTensor(data) {
  // Wrapping these calculations in a tidy will dispose any
  // intermediate tensors.

  return tf.tidy(() => {
    // Step 1. Shuffle the data
    tf.util.shuffle(data);

    // Step 2. Convert data to Tensor
    const inputs = data.map(d => [d.county, d.sex,d.age])

    const labels = data.map(d => d.rate);
    const inputTensor = tf.tensor2d(inputs, [inputs.length, 3]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();


    return {
      inputs: inputs,
      labels: labels,
      // Return the min/max bounds so we can use them later.
      inputMax,
      inputMin,
      labelMax,
      labelMin,
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
  const epochs = 50;
  return await model.fit(tf.stack(inputs), tf.stack(labels), {
    batchSize,
    epochs,
    validationSplit: .25,
    shuffle: true,
    // callbacks: tfvis.show.fitCallbacks(
    //   { name: 'Training Performance' },
    //   ['loss', 'mse'],
    //   { height: 200, callbacks: ['onEpochEnd'] }
    // )
  });
}
testModel(model, inputData) {
  console.log(`inputData: ${inputData}`)
  const preds = tf.tidy(() => {
    const xs = tf.tensor2d(inputData, [1,3])
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
