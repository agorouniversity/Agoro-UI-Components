import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from 'react-router-dom';
import { ButtonA, TextInput, IconButton, Loading } from "../UI";
import { apiVerify, apiResendCode, apiNewAccount, apiNewPassword, passwordVerify } from '../../../util/auth.js';
import "./login.css";

export const Login = (props) => {
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [hide, setHide] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setnewAccount] = useState(false);
  const [mode, setMode] = useState('Login');
  const accountForm = useRef();
  const [searchParams] = useSearchParams();

  const onError = (error) => {
    setError(error);
    setLoading(false);
    accountForm.current.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  const login = async (email, password, event) => {
    setLoading(true);
    email = email.toLowerCase();
    props.login(email, password).then( //Expects a Promise response
      () => {
        props.hide();
        setSuccess(undefined);
        setError(undefined);
        event.target.reset();
      },
      (error) => {
        if(error === 'newPasswordRequired') {
          forgotPassword(null, email);
          return;
        }
        if(error === 'Account is not verified. Please verify your email\n') {
          setMode('New Account');
          setnewAccount({ email: email, created: true});
        }
        onError(error);
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
    login(email, password, event); //Login with email & password from form
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const checkPassword = (password1, password2) => {
    const err = passwordVerify(password1, password2);
    if(err) {
      setError(err);
      accountForm.current.scroll({
        top: 0,
        behavior: 'smooth'
      });
      return(false);
    }
    return(true);
  }

  const createNew = async (event) => {
    event.preventDefault();
    let tmpNewAcc = {...newAccount};
    tmpNewAcc.email = tmpNewAcc.email.toLowerCase();
    tmpNewAcc.phone = `+${newAccount.countryCode || '1'}${newAccount.phone}`;
    let i = 0;
    for (const [key, value] of Object.entries(tmpNewAcc)) {
      newAccount[key] = value.trim();
      if(newAccount[key] === '') {
        setError(`${event.target.elements[String(i)].labels[0].innerText} cannot be blank`);
        return;
      }
      i++;
    }
    console.log(newAccount);
    if(!checkPassword(newAccount.password, newAccount.confirmPassword)) {
      return;
    }
    setLoading(true);
    apiNewAccount(tmpNewAcc)
    .then(
      () => {
        setLoading(false);
        setError(undefined);
        setnewAccount({...newAccount, created: true});
      },
      onError
    );
  }

  const verify = useCallback((event, account) => {
    event?.preventDefault();
    setLoading(true);
    const verificationCode = account?.code || event.target['0'].value;
    const email = account.email.toLowerCase();
    apiVerify(email, verificationCode)
    .then(
      () => {
        setLoading(false);
        setSuccess('Account verified, please login');
        setError(undefined);
        console.log('Verify success!');
        setnewAccount(undefined);
        setMode('Login');
      },
      onError
    )
  }, [])

  useEffect(() => {
    const email = searchParams.get('verification_email');
    const code = searchParams.get('verification_code');
    const loginMode = searchParams.get('login_mode');
    if(email && code && loginMode === 'new_account') {
      setMode('New Account');
      const account = {email: email, code: code, created: true};
      setnewAccount(account);
      console.log('params: ', email, code);
      verify(undefined, account);
    } else if(email && code && loginMode === 'new_password') {
      setMode('New Password');
      setnewAccount({email: email, code: code});
      setError(undefined);
    }
  }, [searchParams, verify])

  const resend = () => {
    setLoading(true);
    apiResendCode(newAccount.email.toLowerCase())
    .then(
      () => {
        setLoading(false);
        setSuccess(`Verification email sent to ${newAccount.email}`);
        setError(undefined);
      },
      onError
    )
  }

  const forgotPassword = (event, loginEmail=undefined) => {
    event.preventDefault();
    setLoading(true);
    const email = loginEmail || event.target['email'].value;
    console.log(email);
    apiNewPassword(email.toLowerCase())
    .then(
      (result) => {
        setLoading(false);
        setMode('New Password');
        setnewAccount({email: email});
        setSuccess(`New password verification email sent to ${email}`);
        setError(loginEmail ? 'You must reset you password' : undefined);
      },
      onError
    )
  }

  const newPassword = (event) => {
    event.preventDefault();
    const code = event.target['code'].value;
    const password = event.target['password'].value;
    if(!checkPassword(password, event.target['confirmPassword'].value)) {
      return;
    }
    setLoading(true);
    console.log(code, password);
    apiNewPassword(newAccount.email.toLowerCase(), code, password)
    .then(
      (result) => {
        setLoading(false);
        setSuccess('Password changed successfully, please login');
        setError(undefined);
        setMode('Login');
        setnewAccount(undefined);
      },
      onError
    )
  }

  const cancel = () => {
    setMode('Login');
    setSuccess(undefined);
  }

  useEffect(() => {
    setError(undefined);
  }, [mode])

  useEffect(() => {
    setSuccess(undefined);
  }, [error])

  return(
    <div
      className='loginContainer'
      style={{display: hide ? 'none': 'flex'}}
    >
      <h1>{mode}</h1>
      <div
        className='login'
        ref={accountForm}
      >
        {loading &&
          <Loading className={mode === 'New Account' ? 'new' : null} size='full'/>
        }
        {(error || (props.errorMessage && mode === 'Login')) &&
          <div
            className='error'
          >
            {error ? String(error) : props.errorMessage}
          </div>
        }
        {success &&
          <div
            className='success'
          >
            {success}
          </div>
        }
        {mode === 'Login' &&
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
              onChange={handleEmailChange}
            />
            <TextInput
              label="Password"
              type="password"
              width="full"
              required={true}
              name="password"
              onChange={handlePasswordChange}
            />
            <button className='link' type='button' onClick={() => setMode('Forgot Password')}>Forgot Password?</button>
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
        }
        {mode === 'New Account' &&
          <>
            {!newAccount.created
              ? <form className="account" onSubmit={createNew}>
                  <TextInput
                    label='Email'
                    type='email' 
                    width='full'
                    required={true}
                    name="email"
                    onChange={(event) => setnewAccount({...newAccount, email: event.target.value})}
                  />
                  <TextInput
                    className='nameGiven'
                    label='First Name'
                    width='full'
                    type='text'
                    required={true}
                    onChange={(event) => setnewAccount({...newAccount, nameGiven: event.target.value})}
                  />
                  <TextInput
                    className='nameFamily'
                    label='Last Name'
                    width='full'
                    type='text'
                    required={true}
                    onChange={(event) => setnewAccount({...newAccount, nameFamily: event.target.value})}
                  />
                  <TextInput
                    label="Password"
                    type="password"
                    width="full"
                    required={true}
                    name="password"
                    onChange={(event) => setnewAccount({...newAccount, password: event.target.value})}
                  />
                  <TextInput
                    label="Confirm Password"
                    type="password"
                    width="full"
                    required={true}
                    name="confirmPassword"
                    onChange={(event) => setnewAccount({...newAccount, confirmPassword: event.target.value})}
                  />
                  <span>
                    <ButtonA type='submit'>Create Account</ButtonA>
                    <ButtonA color='danger' onClick={cancel}>Cancel</ButtonA>
                  </span>
                </form>
              : <form
                  className='account'
                  onSubmit={(event) => verify(event, newAccount)}
                >
                  <br></br>
                  <div className='plr'>Account created, please check email for verification code</div>
                  <TextInput
                    label="Verification Code"
                    type="number"
                    defaultValue={newAccount?.code || ''}
                    width="auto"
                    required={true}
                    name="confirmPassword"
                  />
                  <button className='link' type='button' onClick={resend}>Resend Verification Email</button>
                  <br></br>
                  <span>
                    <ButtonA type='submit'>Verify</ButtonA>
                    <ButtonA type='button' color='danger' onClick={cancel}>Cancel</ButtonA>
                  </span>
                </form>
            }
          </>
        }
        {mode === 'Forgot Password' &&
          <form
            className='account'
            onSubmit={forgotPassword}
          >
            <TextInput
              label='Email' 
              type='email'
              width='full'
              required={true}
              name="email"
            />
            <span>
              <ButtonA type='submit'>Send Verification</ButtonA>
              <ButtonA color='danger' onClick={cancel}>Cancel</ButtonA>
            </span>
          </form>
        }
        {mode === 'New Password' &&
          <form
            className='account'
            onSubmit={newPassword}
          >
            <TextInput
              label='Verification Code' 
              type='number' 
              width='auto'
              required={true}
              defaultValue={newAccount?.code || ''}
              name="code"
            />
            <TextInput
              label="New Password"
              type="password"
              width="full"
              required={true}
              name="password"
            />
            <TextInput
              label="Confirm Password"
              type="password"
              width="full"
              required={true}
              name="confirmPassword"
            />
            <span>
              <ButtonA type='submit'>Change Password</ButtonA>
              <ButtonA color='danger' onClick={cancel}>Cancel</ButtonA>
            </span>
          </form>
        }
        {mode === 'Login' &&
          <div className="new">
            <h2>New?</h2>
            <button className='link' onClick={() => {
              setnewAccount({});
              setMode('New Account')
            }}>
              Create an account
            </button>
            &nbsp;to access the best university patform in the world!
          </div>
        }
      </div>
    </div>
  );
};