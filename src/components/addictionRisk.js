import React, { Component } from 'react';
import { Container, Content, Form, Item,
  Input, Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux';
import InfoForm from './infoForm.js';
import { Field, reduxForm } from 'redux-form';
import Speedometer from 'react-native-speedometer-chart';
import { ImageBackground, Linking } from 'react-native';
// import '@tensorflow/tfjs-react-native';
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
// import { CSVReader } from 'react-papaparse'
import Papa from 'papaparse';

// import MLPerceptron from './mlp.js'

class AddictionRisk extends Component{
  constructor(props) {
    super(props);
    this.state = {
        drugName: '',
        risk: Math.floor(Math.random() * Math.floor(10)),
        color: 'green',
        isTfReady: false,
    };
}

 createModel() {
  // Create a sequential model
  const model = tf.sequential();

  // Add a single input layer
  model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));

  // Add an output layer
  model.add(tf.layers.dense({units: 1, useBias: true}));

  return model;
}
 getData () {
  return new Promise((resolve, reject) => {
    Papa.parse("https://raw.githubusercontent.com/carlossantillana/opioidClassifier/master/assets/finalCleanData.txt", {
      header: true,
      download: true,
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
  const model = this.createModel();
  tfvis.show.modelSummary({name: 'Model Summary'}, model);
  // Load and plot the original input data that we are going to train on.
  console.log("before")
  const data = await this.getData();
  console.log(data);
  // const values = data.map(d => ({
  //   x: d.horsepower,
  //   y: d.mpg,
  // }));
  // tfvis.render.scatterplot(
  //   {name: 'Horsepower v MPG'},
  //   {values},
  //   {
  //     xLabel: 'Horsepower',
  //     yLabel: 'MPG',
  //     height: 300
  //   }
  // );
// const tensorData = this.convertToTensor(data);
// const {inputs, labels} = tensorData;
//
// // Train the model
// console.log('start Training');
// await this.trainModel(model, inputs, labels);
// console.log('Done Training');
//
// this.testModel(model, data, tensorData)
// console.log('Done testing');


}

 convertToTensor(data) {
  // Wrapping these calculations in a tidy will dispose any
  // intermediate tensors.

  return tf.tidy(() => {
    // Step 1. Shuffle the data
    tf.util.shuffle(data);

    // Step 2. Convert data to Tensor
    const inputs = data.map(d => d.horsepower)
    const labels = data.map(d => d.mpg);

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();

    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
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

  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: 'Training Performance' },
      ['loss', 'mse'],
      { height: 200, callbacks: ['onEpochEnd'] }
    )
  });
}
testModel(model, inputData, normalizationData) {
  const {inputMax, inputMin, labelMin, labelMax} = normalizationData;


  const [xs, preds] = tf.tidy(() => {

    const xs = tf.linspace(0, 1, 100);
    const preds = model.predict(xs.reshape([100, 1]));

    const unNormXs = xs
      .mul(inputMax.sub(inputMin))
      .add(inputMin);

    const unNormPreds = preds
      .mul(labelMax.sub(labelMin))
      .add(labelMin);

    // Un-normalize the data
    return [unNormXs.dataSync(), unNormPreds.dataSync()];
  });


  const predictedPoints = Array.from(xs).map((val, i) => {
    return {x: val, y: preds[i]}
  });

  const originalPoints = inputData.map(d => ({
    x: d.horsepower, y: d.mpg,
  }));

  tfvis.render.scatterplot(
    {name: 'Model Predictions vs Original Data'},
    {values: [originalPoints, predictedPoints], series: ['original', 'predicted']},
    {
      xLabel: 'Horsepower',
      yLabel: 'MPG',
      height: 300
    }
  );
}

async componentDidMount(prevProps) {
      await tf.ready();
      this.setState({
    isTfReady: true,
  });
  await this.run()

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
          <Speedometer style={{  marginTop: 60, alignItems: "center" }} value={this.state.risk}
          totalValue={10} internalColor={this.state.color}/>
          <Text style={{
          textAlign: 'center',
          textTransform: 'capitalize',
          fontFamily: 'AppleSDGothicNeo-UltraLight',
          marginTop: 15,
          fontSize: 16,
        }} >Risk is {this.state.risk} out of 10</Text>

        <Text style={{
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: 'AppleSDGothicNeo-UltraLight',
        marginTop: 20,
        fontSize: 16,
        color: 'blue'
      }}
      onPress={() => Linking.openURL('https://www.webmd.com/search/search_results/default.aspx?query=' + this.props.drug)}
      >Check out this link to find out more!</Text>
      </Content>
      </ImageBackground>

    </Container>
  );
}
}

export default AddictionRisk
