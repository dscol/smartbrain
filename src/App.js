import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SingIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import { Component } from 'react';
import Clarifai from 'clarifai';

const particlesSettings = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        }
      }
    }
  }

const app = new Clarifai.App({
  apiKey: '01463a36f4cc4f6fa49817ecb5157545'
});

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl: '',
      box: '',
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateBox = (data) => {
    const clarifaiFace = data['outputs'][0]['data']['regions'][0]['region_info']['bounding_box'];
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: (1 - clarifaiFace.right_col) * width,
      bottomRow: (1 - clarifaiFace.bottom_row) * height,
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onButtonSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    app.models
      .predict(
        Clarifai.FACE_EMBED_MODEL, 
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateBox(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignedIn: true })
    } else if (route === 'signout') {
      this.setState({ isSignedIn: false })
    }
    this.setState({route: route});
  }

  render() {
    return(
      <div className="App">
        <Particles className='particles'
          params={particlesSettings} 
        />
        <Navigation isSignedIn={ this.state.isSignedIn }onRouteChange={ this.onRouteChange }/>
        {
          {
            'signin': <SignIn onRouteChange={ this.onRouteChange }/>,
            'signout': <SignIn onRouteChange={ this.onRouteChange }/>,
            'home':
              <div>
                <Logo />
                <Rank />
                <ImageLinkForm 
                  onInputChange={ this.onInputChange } 
                  onButtonSubmit={ this.onButtonSubmit }
                />
                <FaceRecognition imgUrl={ this.state.imgUrl } box={ this.state.box }/>
              </div>,
            'register': <Register onRouteChange={ this.onRouteChange }/>,
          }[this.state.route]
        }
      </div>
    )
  };
}

export default App;
