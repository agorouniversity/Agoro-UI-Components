import { useState } from 'react';
import { ButtonA, TextInput, IconButton } from '../UI';
import './login.css';

export const Login = (props) => {
  const [error, setError] = useState();

  const login = async (email, password) => {
    //Expects a Promise response
    props.login(email, password).then(
      () => props.hide(), //On success
      (error) => setError(error) //On failure
    );
  }

  const submit = (event) => {
    event.preventDefault();
    login(event.target.email, event.target.password);
  }

  return(
    <div
      className='loginContainer'
    >
      <h1>Login</h1>
      <div
        className='login'
      >
        {error &&
          <div
            className='error'
          >
            {error}
          </div>
        }
        <form
          className='account'
          onSubmit={submit}
        >
          <TextInput 
            label='Email' 
            type='email' 
            width='full'
            required={true}
            name='email'
          />
          <TextInput 
            label='Password' 
            type='password' 
            width='full'
            required={true}
            name='password'
          />
          <a href='/'>Forgot Password?</a>
          <ButtonA
            className='submit'
            type='submit'
          >
            Login
          </ButtonA>
          <div
            className='socials'
          >
            <h2>Or</h2>
            <div
              className='socialButtons'
            >
              <IconButton icon='google'/>
              <IconButton icon='github'/>
              <IconButton icon='apple'/>
              <IconButton icon='linkedin'/>
            </div>
          </div>
        </form>
        <div
          className='new'
        >
          <h2>New?</h2>
          <a href='/'>Create an account</a>
          &nbsp;to access the best university patform in the world!
        </div>
      </div>
    </div>
  )
}