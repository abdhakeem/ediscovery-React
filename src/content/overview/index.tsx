import { useState } from 'react';
import {Box, Typography, Hidden, Container, Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import { Helmet } from 'react-helmet-async';



import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import React, { useReducer, useEffect } from 'react';
import 'src/style.css';
import 'src/http-common.ts';
import http from "src/http-common";
import ITutorialData from "src/types/tutorial.type"
import axios from "axios";


// Compare differemnt  approaches of adding styles to material ui componenets

axios({
  url: '/',
 
})
.then(response => {

})


const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.black1};
`
);

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const TypographyPrimary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[100]};
`
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[70]};
`
);


//state type
// eslint -- enforce coding stand
type State = {
  username: string
  password:  string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setUsername' | 'setPassword' | 'loginSuccess' | 'loginFailed', payload: string }
| { type: 'setIsButtonDisabled' | 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername': 
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


  
  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
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
  }, [state.username, state.password]);

  const handleLogin = () => {
    if (state.username === 'admin@gmail.com' && state.password === 'admin') {
      dispatch({
        type: 'loginSuccess',
        payload: 'Login Successfully',
      });

      localStorage.setItem('username' , state.username);

      //this.props.history.push('/dashboards/crypto');

      window.location.href = "/dashboards/crypto";

    } else {
      dispatch({
        type: 'loginFailed',
        payload: 'Incorrect email or password'
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
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
      <MainContent>
        <Grid
          container
          sx={{ height: '100%' }}
          alignItems="stretch"
          spacing={0}
        >
          
          <Hidden mdDown>

            <GridWrapper
              xs={12}
              md={6}
              alignItems="center"
              display="flex"
              className='login-bg'
              justifyContent="center"
              item
            >
              
              
              <Container maxWidth="lg" >
                <Box textAlign="left">
                  <TypographyPrimary variant="h1" sx={{ my: 1}}
                  fontSize="40px"
                  fontWeight="lighter"
                  letterSpacing="1px">
                  Welcome to 
                  </TypographyPrimary>
                  
                  <TypographyPrimary variant="h1" sx={{ my: 1 }}
                  fontSize="40px"
                  letterSpacing="1px"
                  >
                  <b>INABIA EBOT</b>
                  </TypographyPrimary>
                  <TypographySecondary
                    variant="h4"
                    fontWeight="normal"
                    sx={{ mb: 4 }}
                    color="#fff"
                  >
                    
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                  </TypographySecondary>
                  
                </Box>
              </Container>
              
            </GridWrapper>
    
          </Hidden>

          <Grid
            xs={12}
            md={6}
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">
            
            <form  noValidate autoComplete="off">

              <Box textAlign="center">
                <img
                  alt="500"
                  height={80}
                  src="/static/images/inabia_ai_logo.png"
                />
                <br></br>
                <br></br>
    
                <Typography variant="h2" sx={{ my: 1 }}>
                
                <TextField
                      error={state.isError}
                      fullWidth
                      id="username"
                      type="email"
                      label="Email"
                      placeholder="Email"
                      margin="normal"
                      onChange={handleUsernameChange}
                      onKeyPress={handleKeyPress}
                      autoComplete="current-email"
                      sx={{ mb: 2, width:'60%' }}
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
                      sx={{ mb: 2, width:'60%' }}
                    />

                </Typography>
                
                {/* <LoadingButton
                  onClick={handleClick}
                  loading={pending}
                  variant="outlined"
                  color="primary"
                  startIcon={<RefreshTwoToneIcon />}
                >
                  Refresh view
                </LoadingButton> */}
                <Button 
                variant="contained"
                sx={{ mb: 2 }}
                //className={classes.loginBtn}
                className ="loginbtn"
                onClick={handleLogin}
                disabled={state.isButtonDisabled}
                >
                  Signin
                </Button>
                <Typography variant="h6" sx={{ my: 1 }}>
                  Don't have a account, <a href="register"
                  target="_blank" 
                  color="red" 
                  > register now</a>
                </Typography>
              </Box>
              </form>
            </Container>
          </Grid>
        </Grid>
      </MainContent>
    </>
  );
}

export default LoginUser;
