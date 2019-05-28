import React from 'react';
import Particles from 'react-particles-js';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

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



function App() {
  return (
    <div className="App">
      <Particles params={params} className='particales'/>
      <div className='nav_bar'>
         <Logo />
        <Navigation />
      </div>
      <Rank />
      <ImageLinkForm />
    </div>
  );
}

export default App;
