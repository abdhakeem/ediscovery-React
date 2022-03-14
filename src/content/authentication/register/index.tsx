import {Box, Typography, Hidden, Container, Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import React, { useReducer, useEffect, useState } from 'react';
import 'src/style.css';
import 'src/http-common.ts';
import Registerui from './registerui/left-side';
import axios from 'axios';


//state type
// eslint -- enforce coding stand
type State = {
  username: string
  email: string
  password:  string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  username: '',
  email: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setusername' | 'setemail' | 'setPassword' | 'loginSuccess' | 'loginFailed', payload: string }
| { type: 'setIsButtonDisabled' | 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setemail': 
      return {
        ...state,
        email: action.payload
      };
    case 'setusername': 
      return {
        ...state,
        username: action.payload
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
}


function LoginUser() {

  const [pending, setPending] = useState(false);
  function handleClick() {
    setPending(true);
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  var registerstatus:string = ''; 
  
  useEffect(() => {
    if (state.username.trim() && state.email.trim() && state.password.trim()) {
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
  }, [state.username, state.email, state.password]);

  const handleLogin = () => {

 
      const username = state.username;
      const email = state.email;
      const password = state.password;
      const token = 'sdddwddwdwdwwd';
  

    //API Call
    getData();
  
      // we will use async/await to fetch this data
      async function getData() {

        axios.post('https://ediscovery.inabia.ai/api/signup?name='+username+'&email='+email+'&password='+password+'&token='+token+'')
      .then(res => {
        console.log(res.data.Response);
        registerstatus = res.data.Response.Data;

      enum status {
        success = 'User created successfully',
      }  

        
        if(registerstatus !== status.success) {
          dispatch({
            type: 'loginFailed',
            payload: registerstatus,
          });
        }

    
      else if (registerstatus === status.success) {
        dispatch({
          type: 'loginSuccess',
          payload: 'User created successfully',
        });
      }

        
      })
      }


  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleusernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setusername',
        payload: event.target.value
        
      });
    };

  const handleemailChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setemail',
        payload: event.target.value
        
      });
    };
    

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    }

  return (
    <>

      
      <Helmet>
        <title>Inabia - ediscovery</title>
      </Helmet>
      <div className='main-content'>
        <Grid
          container
          sx={{ height: '100%' }}
          alignItems="stretch"
          spacing={0}
        >
          
          <Registerui />

          <Grid xs={12} md={6} alignItems="center" display="flex" justifyContent="center" item> <Container maxWidth="sm">
            
            <form  noValidate autoComplete="off">

              <Box textAlign="center">
                <img  alt="500"  height={80}  src="/static/images/inabia_ai_logo.png" />
                <br></br>
                <br></br>
    
                <Typography variant="h2" sx={{ my: 1 }}>

                <TextField  error={state.isError}  fullWidth  id="username"  type="username"  label="Username"
                      placeholder="Umail"  margin="normal"  onChange={handleusernameChange}  onKeyPress={handleKeyPress}
                      autoComplete="current-username"  sx={{ mb: 2, width:'60%' }}  />               
                <br></br>  

                <TextField  error={state.isError}  fullWidth  id="email"  type="email"  label="Email"  placeholder="Email"
                      margin="normal"  onChange={handleemailChange}  onKeyPress={handleKeyPress}  autoComplete="current-email"
                      sx={{ mb: 2, width:'60%' }}  />
                  <br></br>

                <TextField  error={state.isError}  fullWidth  id="password"  type="password"  label="Password"
                  placeholder="Password"  margin="normal"  helperText={state.helperText}  onChange={handlePasswordChange}
                      onKeyPress={handleKeyPress}  autoComplete="current-password"  sx={{ mb: 2, width:'60%' }}  />

                </Typography>
                
                <Button   variant="contained"  sx={{ mb: 2 }}
                //className={classes.loginBtn}
                className ="loginbtn"  onClick={handleLogin}  >
                  Signup
                </Button>
                <Typography variant="h6" sx={{ my: 1 }}>
                  Already have a account login now, <a href="/"
                  color="red" 
                  >Signin</a>
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
