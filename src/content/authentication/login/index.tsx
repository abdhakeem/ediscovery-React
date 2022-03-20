import {
  Box,
  Typography,
  Hidden,
  Container,
  Grid,
  Divider
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import React, { useReducer, useEffect, useState } from 'react';
import 'src/style.css';
import Loginleft from './loginui/left-side';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {
  FacebookLoginButton,
  LinkedInLoginButton,
  GoogleLoginButton
} from 'react-social-login-buttons';

//state type
// eslint -- enforce coding stand
type State = {
  email: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  email: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action =
  | {
      type: 'setemail' | 'setPassword' | 'loginSuccess' | 'loginFailed';
      payload: string;
    }
  | { type: 'setIsButtonDisabled' | 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setemail':
      return {
        ...state,
        email: action.payload
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'loginSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload
      };
  }
};

function LoginUser() {
  var loginstatus: string = '';
  var logintoken: any = '';
  var loginid: any = '';

  let navigate = useNavigate();

  const [pending, setPending] = useState(false);
  function handleClick() {
    setPending(true);
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.email.trim() && state.password.trim()) {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: false
      });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.email, state.password]);

  const handleLogin = () => {
    const email = state.email;
    const password = state.password;

    if (email == '' || password == '') {
      dispatch({
        type: 'loginFailed',
        payload: 'Please filled the required fields'
      });

      return false;
    }

    //API Call
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      axios
        .post(
          'https://ediscovery.inabia.ai/api/login?email=' +
            email +
            '&password=' +
            password +
            ''
        )
        .then((res) => {
          console.log(res.data.Response);
          loginstatus = res.data.Response.Data;
          logintoken = res.data.Response.Token;
          loginid = res.data.Response.userId;

          enum status {
            success = 'Success'
          }

          if (loginstatus !== status.success) {
            dispatch({
              type: 'loginFailed',
              // payload: loginstatus,
              payload: 'Invalid email or password'
            });
          } else if (loginstatus === status.success) {
            dispatch({
              type: 'loginSuccess',
              payload: 'Login Successfully'
            });

            localStorage.setItem('email', state.email);
            localStorage.setItem('token', logintoken);
            localStorage.setItem('userId', loginid);

            navigate('/dashboards/cases');
          } else {
            dispatch({
              type: 'loginFailed',
              payload: 'Unable to proceed your request'
            });
          }
        });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleemailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setemail',
      payload: event.target.value
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setPassword',
      payload: event.target.value
    });
  };

  const Googlesdk = () => {
    alert('Google');
  };

  const Facebooksdk = () => {
    alert('Facebook');
  };

  const Linkedinsdk = () => {
    alert('Linkedin');
  };

  return (
    <>
      <Helmet>
        <title>Login - Inabia ediscovery</title>
      </Helmet>
      <div className="main-content">
        <Grid
          container
          sx={{ height: '100%' }}
          alignItems="stretch"
          spacing={0}
        >
          <Grid
            xs={12}
            md={12}
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            {' '}
            <Container maxWidth="sm">
              <form noValidate autoComplete="off">
                <Box textAlign="center">
                  <img
                    alt="500"
                    height={100}
                    src="/static/images/inabia_ai_logo.png"
                  />

                  <h2 className="Login-head">Log In</h2>
                  <p className="Login-subhead">
                    Scan through thousands of documents in <br></br> minutes
                    with Inabia eBot
                  </p>

                  <Typography variant="h2" sx={{ my: 1 }}>
                    <TextField
                      error={state.isError}
                      fullWidth
                      id="email"
                      type="email"
                      label="Email"
                      placeholder="Email"
                      margin="normal"
                      onChange={handleemailChange}
                      onKeyPress={handleKeyPress}
                      autoComplete="current-email"
                      sx={{ mb: 2, width: '60%' }}
                    />

                    <br></br>

                    <TextField
                      error={state.isError}
                      fullWidth
                      id="password"
                      type="password"
                      label="Password"
                      placeholder="Password"
                      margin="normal"
                      helperText={state.helperText}
                      onChange={handlePasswordChange}
                      onKeyPress={handleKeyPress}
                      autoComplete="current-password"
                      sx={{ mb: 2, width: '60%' }}
                    />
                  </Typography>

                  {/* <LoadingButton onClick={handleClick}  loading={pending}  variant="outlined"  color="primary"  
                startIcon={<RefreshTwoToneIcon />}>  Refresh view  </LoadingButton> */}
                  <Button
                    variant="contained"
                    sx={{ mb: 2 }} //className={classes.loginBtn}
                    className="loginbtn"
                    onClick={handleLogin}
                  >
                    LOG IN
                  </Button>
                  <Typography variant="h6" sx={{ my: 1 }}>
                    <Button
                      component={NavLink}
                      className="login-links"
                      to="/register"
                    >
                      Create account{' '}
                    </Button>{' '}
                    |{' '}
                    <Button component={NavLink} className="login-links" to="/">
                      Forget password?{' '}
                    </Button>
                  </Typography>
                  <Divider />
                  <Typography variant="h6" sx={{ my: 1 }}>
                    <GoogleLoginButton
                      className="social-btn"
                      onClick={Googlesdk}
                      style={{ marginTop: '20px' }}
                    />
                    <FacebookLoginButton
                      className="social-btn"
                      onClick={Facebooksdk}
                    />
                    <LinkedInLoginButton
                      className="social-btn"
                      onClick={Linkedinsdk}
                    />
                  </Typography>
                </Box>
              </form>
            </Container>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default LoginUser;
