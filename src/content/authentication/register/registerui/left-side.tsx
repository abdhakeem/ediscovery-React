import { Box, Typography, Hidden, Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import React, { useReducer, useEffect, useState } from 'react';
import 'src/style.css';

// Compare differemnt  approaches of adding styles to material ui componenets

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.black1};
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

function Registerui() {
  return (
    <>
      <Hidden mdDown>
        <GridWrapper
          xs={12}
          md={6}
          alignItems="center"
          display="flex"
          className="login-bg"
          justifyContent="center"
          item
        >
          <Container maxWidth="lg">
            <Box textAlign="left">
              <TypographyPrimary
                variant="h1"
                sx={{ my: 1 }}
                fontSize="40px"
                fontWeight="lighter"
                letterSpacing="1px"
              >
                Welcome to
              </TypographyPrimary>

              <TypographyPrimary
                variant="h1"
                sx={{ my: 1 }}
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </TypographySecondary>
            </Box>
          </Container>
        </GridWrapper>
      </Hidden>
    </>
  );
}

export default Registerui;
