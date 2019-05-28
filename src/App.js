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
      input:''
    }
  }

  onInputChange =(event) =>{
    console.log(event.target.value);
  }

  onButtonSubmit = () =>{
    console.log('clicked');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {
        // do something with response
        console.log(response);
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
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
