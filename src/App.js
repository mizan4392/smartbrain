import React from 'react';
import Particles from 'react-particles-js';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';

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
      imageUrl:'',
      box:{},
      route:'signin'
    }
  }

  onInputChange =(event) =>{
    this.setState({input:event.target.value});
  }

  displayFaceBox = (box) =>{
    console.log(box)
    this.setState({box:box});
  }

  calculateFaceLocatiion = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');

    const width = Number(image.width);
    const height = Number(image.height);

    return{
      leftCol:clarifaiFace.left_col * width,
      topRow:clarifaiFace.top_row * height,
      rightCol:width - (clarifaiFace.right_col * width),
      bottomRow:height - (clarifaiFace.bottom_row * height)
    }

  }

  onButtonSubmit = () =>{

    this.setState({imageUrl:this.state.input});
    app.models
      .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocatiion(response)))
      .catch(err => console.log(err));  
    
  }


  render(){

    return (
      <div className="App">
        <Particles params={params} className='particales'/>
        <div className='nav_bar'>
          <Logo />
          <Navigation />
        </div>
        {
          //<SignIn />
        }  
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
    );
  }
}

export default App;
