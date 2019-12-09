import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { validateSignupData } from '../../util/validators'

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      registeName: '',
      registerEmail: '',
      registerPassword: '',
      registerCpassword: '',
      error: []
    }
  }

  onNameChange = event => {
    this.setState({ registeName: event.target.value })
  }
  onEmailChange = event => {
    this.setState({ registerEmail: event.target.value })
  }

  onPasswordChange = event => {
    this.setState({ registerPassword: event.target.value })
  }
  onCPasswordChange = event => {
    this.setState({ registerCpassword: event.target.value })
  }

  handleSignedIn = e => {
    e.preventDefault()
    const newUser = {
      name: this.state.registeName,
      email: this.state.registerEmail,
      password: this.state.registerPassword,
      confirmPassword: this.state.registerCpassword
    }
    const { valid, errors } = validateSignupData(newUser)
    if (valid === true) {
      fetch('http://localhost:3001/register', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password
        })
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          if (data.error) {
            alert(data.error)
          } else {
            this.props.history.push('/signIn')
          }
        })
        .catch(err => console.log('error', err))
    } else {
      this.setState({ error: errors })
    }
  }
  render () {
    let nameError =
      this.state.error && this.state.error.name ? this.state.error.name : ''
    let emailError =
      this.state.error && this.state.error.email ? this.state.error.email : ''
    let passwordError =
      this.state.error && this.state.error.password
        ? this.state.error.password
        : ''
    let confirmPasswordError =
      this.state.error && this.state.error.confirmPassword
        ? this.state.error.confirmPassword
        : ''
        let weekPasswordError =
      this.state.error && this.state.error.weekPass
        ? this.state.error.weekPass
        : ''
    return (
      <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5'>
        <main className='pa4 black-80'>
          <form className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Register</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='name-address'>
                  Name
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='name'
                  name='name'
                  id='name'
                  value={this.state.registeName}
                  onChange={this.onNameChange}
                  placeholder="Enter your full Name"
                />
                <span style={{ color: 'red' }}>{nameError}</span>
              </div>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='email-address'
                  value={this.state.registerEmail}
                  onChange={this.onEmailChange}
                  id='email-address'
                  placeholder="Enter your Email"
                />
              </div>
              <span style={{ color: 'red' }}>{emailError}</span>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='password'
                  id='password'
                  value={this.state.registerPassword}
                  onChange={this.onPasswordChange}
                  placeholder="Enter your Password"
                />
                <span style={{ color: 'red' }}>{passwordError}</span>
                <span style={{ color: 'red' }}>{weekPasswordError}</span>
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Confirm Password
                </label>
                <input
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='confirmPassword'
                  id='confirmPassword'
                  value={this.state.registerCpassword}
                  onChange={this.onCPasswordChange}
                  placeholder="Confirm your Password"
                />
                <span style={{ color: 'red' }}>{confirmPasswordError}</span>
              </div>
            </fieldset>
            <div className=''>
              <button
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib navLink'
                type='submit'
                onClick={this.handleSignedIn}
              >
                Register
              </button>
            </div>
            <div className='lh-copy mt3'>
              <NavLink to='/signIn' className='f6 link dim black db'>
                SignIn
              </NavLink>
            </div>
          </form>
        </main>
      </article>
    )
  }
}

export default withRouter(Register)
