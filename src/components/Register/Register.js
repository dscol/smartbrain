import { Component } from "react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value});
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value});
    }

    onSubmit = () => {
        fetch('https://ancient-sea-73991.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <article className="br5 ba b--black-10 mv4 w-100 w-50-m w-30-l shadow-5 center">
                <main className="pa4 white-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-99" 
                                    onChange={ this.onNameChange }
                                    type="name" 
                                    name="name"  
                                    id="name"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    onChange={ this.onEmailChange }
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    onChange={ this.onPasswordChange }
                                    type="password" 
                                    name="password"  
                                    id="password"/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" 
                                onClick={ this.onSubmit } 
                                type="submit" 
                                value="Register"/>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
  }
  
  export default Register;