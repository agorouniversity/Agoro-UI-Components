import { useEffect, useState } from "react";
import { ButtonA, TextInput, IconButton, Loading } from "../UI";
import "./login.css";

export const Login = (props) => {
  const [error, setError] = useState(undefined);
  const [hide, setHide] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (email, password) => {
    setLoading(true);
    props.login(email, password).then( //Expects a Promise response
      () => props.hide(), //On success
      (error) => { //On failure show error
        setError(error);
        setLoading(false);
      }
    );
  }
  
  useEffect(() => {
    if(!props.show && !init) {
      setTimeout(() => {
        setHide(true);
      }, 1000)
    } else {
      window.clearTimeout(hide);
      setLoading(false);
      setHide(undefined);
      setInit(false);
    }
  }, [props.show, init, hide])

  const submit = (event) => {
    event.preventDefault(); //Prevent form page reload
    login(email, password); //Login with email & password from form
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return(
    <div
      className='loginContainer'
      style={{display: hide ? 'none': 'flex'}}
    >
      <h1>Login</h1>
      <div
        className='login'
      >
        {loading &&
          <Loading size='full'/>
        }
        {error &&
          <div
            className='error'
          >
            {"Incorrect Email/Password"}
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
            name="email"
            onChange = {handleEmailChange}

          />
          <TextInput
            label="Password"
            type="password"
            width="full"
            required={true}
            name="password"
            onChange = {handlePasswordChange}
          />
          <button className='link'>Forgot Password?</button>
          <ButtonA
            className='submit'
            type='submit'
          >
            Login
          </ButtonA>
          <div className="socials">
            <h2>Or</h2>
            <div
              className='socialButtons'
            >
              {/*onClick should trigger corresponding login with function whos callback should be a function to call login()*/}
              <IconButton icon='google' onClick={() => {}}/>
              <IconButton icon='github' onClick={() => {}}/>
              <IconButton icon='apple' onClick={() => {}}/>
              <IconButton icon='linkedin' onClick={() => {}}/>
            </div>
          </div>
        </form>
        <div className="new">
          <h2>New?</h2>
          <button className='link'>Create an account</button>
          &nbsp;to access the best university patform in the world!
        </div>
      </div>
    </div>
  );
};
