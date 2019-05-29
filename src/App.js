import React from 'react';
import Particles from 'react-particles-js';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '60fcf5e9ce6a415cae154bef2758a0ae'
 });


const params={
  particles: {
    number:{
      value:40,
      density:{
        enable:true,
        value_area:200
      }
    }
  }
}

 

class App extends React.Component {


  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:''
    }
  }

  onInputChange =(event) =>{
    //console.log(event.target.value);
    this.setState({input:event.target.value});
  }

  onButtonSubmit = () =>{

    this.setState({imageUrl:this.state.input});
    app.models
      .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(
      function(response) {
        // do something with response
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // there was an error
      }
    );
  }


  render(){

    return (
      <div className="App">
        <Particles params={params} className='particales'/>
        <div className='nav_bar'>
          <Logo />
          <Navigation />
        </div>
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
