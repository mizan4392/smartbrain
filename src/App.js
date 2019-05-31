import React from 'react';
import Particles from 'react-particles-js';
import { Route } from 'react-router-dom';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

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
      signIn:false
    }
  }

  onInputChange =(event) =>{
    this.setState({input:event.target.value});
  }

  displayFaceBox = (box) =>{
    this.setState({box:box});
  }

  isSignedIn = () =>{
    this.setState({signIn:true});
  }
  isRegeisteredIn = () =>{
    this.setState({signIn:true});
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
         <Route path="/" exact render={() =>(
            <div>
            <div className='nav_bar'>
                <Logo />
                {this.state.signIn === true ? <Navigation link={"Sign Out"}/> : <Navigation link={"Sign In"}/>}
            </div>
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
          </div>
         )}/>
        <Route path="/signIn" render = {() => (
          <div>
            <div className='nav_bar'>
              <Logo />
              <Navigation link={""}/>
            </div>
            <SignIn isSignedIn={this.isSignedIn}/>
          </div>
        )}/>
        <Route path="/register" render = {() => (
          <div>
            <div className='nav_bar'>
              <Logo />
              <Navigation link={""}/>
            </div>
            <Register isSignedIn={this.isSignedIn}/>

          </div>
        )}/>
        
      </div>
    );
  }
}

export default App;
