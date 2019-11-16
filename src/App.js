import React from 'react'
import Particles from 'react-particles-js'
import { Route, Switch } from 'react-router-dom'

import './App.css'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'

const Clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: '60fcf5e9ce6a415cae154bef2758a0ae'
})

const params = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)

    let token = localStorage.getItem('token')
    let auth = 'Auth '
    let authToken = auth.concat(token)

    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      navText: '',
      user: [],
      token: authToken
    }
  }

  componentDidMount () {
    if (localStorage.getItem('token')) {
      let h = new Headers()
      h.append('Content-type', 'application/json')
      h.append('Authorization', this.state.token)
      fetch('http://localhost:3001/', {
        method: 'get',
        headers: h
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          this.setState({ user: data })
        })
        .catch(error => console.log(error))
    }
  }

  onInputChange = event => {
    this.setState({ input: event.target.value })
  }

  calculateFaceLocatiion = data => {
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)

    let area = []
    data.outputs[0].data.regions.map(usr => {
      return area.push({
        leftCol: usr.region_info.bounding_box.left_col * width,
        topRow: usr.region_info.bounding_box.top_row * height,
        rightCol: width - usr.region_info.bounding_box.right_col * width,
        bottomRow: height - usr.region_info.bounding_box.bottom_row * height
      })
    })

    this.setState({ box: area })

    let h = new Headers()
    h.append('Content-type', 'application/json')
    h.append('Authorization', this.state.token)
    fetch('http://localhost:3001/updateEntry', {
      method: 'post',
      headers: h
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({ user: data })
      })
      .catch(error => console.log(error))
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.calculateFaceLocatiion(response))
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div className='App'>
        <Particles params={params} className='particales' />
        <div className='nav_bar'>
          <Logo />
          <Navigation />
        </div>
        <Switch>
          <Route
            path='/'
            exact
            render={() => (
              <div>
                <Rank user={this.state.user} />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition
                  imageUrl={this.state.imageUrl}
                  box={this.state.box}
                />
              </div>
            )}
          />
          <Route
            path='/signIn'
            render={() => <SignIn isSignedIn={this.isSignedIn} />}
          />
          <Route
            path='/register'
            render={() => <Register isSignedIn={this.isSignedIn} />}
          />
        </Switch>
      </div>
    )
  }
}

export default App
