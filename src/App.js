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

const initialState = {
  input: '',
  imgUrl: '',
  box: '',
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: '',
  }
};

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl: '',
      box: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: '',
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined,

    }});
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
    fetch('https://ancient-sea-73991.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://ancient-sea-73991.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(err => console.log(err))
        }

        this.displayFaceBox(this.calculateBox(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isSignedIn: true })
    } else if (route === 'signout') {
      this.setState(initialState)
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
            'signin': <SignIn loadUser={this.loadUser} onRouteChange={ this.onRouteChange }/>,
            'signout': <SignIn loadUser={this.loadUser} onRouteChange={ this.onRouteChange }/>,
            'home':
              <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm 
                  onInputChange={ this.onInputChange } 
                  onButtonSubmit={ this.onButtonSubmit }
                />
                <FaceRecognition imgUrl={ this.state.imgUrl } box={ this.state.box }/>
              </div>,
            'register': <Register loadUser={ this.loadUser } onRouteChange={ this.onRouteChange }/>,
          }[this.state.route]
        }
      </div>
    )
  };
}

export default App;
