import React, { forwardRef, Ref, useState, useReducer, useEffect, ReactElement, ChangeEvent } from 'react';
import {  Avatar,  Link,  Box,  Button,  Divider,  IconButton,  InputAdornment,  lighten,  List,  ListItem,  ListItemAvatar,  TextField,  Theme,  Tooltip,  Typography,  Dialog,  DialogContent,  DialogTitle,  Slide,  Hidden} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { ListItemText } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import 'src/style.css';
import 'src/http-common.ts';
import axios from 'axios'


type State = {
  keyword: string
  helperText: string
  isError: boolean
};

const initialState:State = {
  keyword: '',
  helperText: '',
  isError: false
};

type Action = { type: 'setkeyword' | 'loginSuccess' | 'loginFailed', payload: string }
| { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setkeyword': 
      return {
        ...state,
        keyword: action.payload
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

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(3)}
`
);

function HeaderSearch() {

  const caseids = localStorage.getItem('caseIds');
  const caseid = localStorage.getItem('pcaseId');
  const docid = localStorage.getItem('pdocid');
  const fileid = localStorage.getItem('pfileid');
  // caseids = localStorage.getItem('caseids');

  console.log(caseids + ' == ' + caseid + ' == ' + docid + ' == ' + fileid);

  let navigate = useNavigate();

  const [pending, setPending] = useState(false);
  
  const [state, dispatch] = useReducer(reducer, initialState);


  const handleLogin = () => {
    
      const keyword = state.keyword;
      localStorage.setItem('keyword', keyword);

      console.log(keyword + ' == ' + caseids + ' == ' + caseid + ' == ' + docid + ' == ' + fileid);

      if(keyword != '' && caseids == null && caseid == null && docid == null && fileid == null) {

        dispatch({
              type: 'loginFailed',
              payload: 'Please select a case',
            });
    

      }
      
      else if(keyword != '' && caseids !='' && caseid == null && docid == null && fileid == null) {
        
        navigate('/dashboards/search/'+caseids);

      }
      

      else if(keyword != '' && caseids == null && caseid !='' && docid == null && fileid == null) {

        navigate('/dashboards/search/'+caseid);

      }

      else if(keyword != '' && caseids == null && caseid != '' && docid != '' && fileid == null) {

        navigate('/dashboards/search/'+caseid+'/'+docid);

      }


      // else if(keyword != '' && caseids ==null && caseid !='' && docid != '' && fileid != '') {

      //   navigate('/dashboards/search/'+caseid+'/'+docid+'/'+fileid);

      // }


    
      // else if (loginstatus === 'Success') {
      //   dispatch({
      //     type: 'loginSuccess',
      //     payload: 'Login Successfully',
      //   });

      //     navigate('/dashboards/cases');

      // }

      // else {
      //   dispatch({
      //     type: 'loginFailed',
      //     payload: 'Unable to proceed your request',
      //   });

      // }

        
      };


  const handlekeywordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setkeyword',
        payload: event.target.value
        
      });
    };


  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchResults) {
        setOpenSearchResults(true);
      }
    } else {
      setOpenSearchResults(false);
    }

    dispatch({
        type: 'setkeyword',
        payload: event.target.value
        
      });

  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Search">
        <IconButton color="primary" onClick={handleClickOpen}>
          <SearchTwoToneIcon className='nav-item'/>
        </IconButton>
      </Tooltip>

      <Tooltip arrow title="">
        <IconButton>
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            className = 'top-menu-item'
            button
            component={NavLink}
            to="/dashboards/cases"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Cases"
              className='nav-item'
            />
          </ListItem>
          
          {/* <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  Others
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem> */}
        </List>
      {/* <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/overview">
          Overview
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/tabs">
          Tabs
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/cards">
          Cards
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/modals">
          Modals
        </MenuItem>
      </Menu> */}
        </IconButton>
      </Tooltip>


      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitleWrapper>
          <SearchInputWrapper
            id='keyword'
            name='keyword'
            className='keyword'
            value={searchValue}
            autoFocus={true}
            onChange={handleSearchChange}
            helperText={state.helperText}
            error={state.isError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            placeholder="Search your keyword here..."
            fullWidth
            label="Search"
          />


        </DialogTitleWrapper>
        <Divider />

        {openSearchResults && (
          <DialogContent>
            <Box
              sx={{ pt: 0, pb: 1 }}
              display="flex"
              justifyContent="space-between"
            >
              {/* <Typography variant="body2" component="span">
                Search results for{' '}
                <Typography
                  sx={{ fontWeight: 'bold' }}
                  variant="body1"
                  component="span"
                >
                  {searchValue}
                </Typography>
              </Typography> */}
              <Link href="#" variant="body2" underline="hover">
                Advanced filters
              </Link>
            </Box>
            <Divider sx={{ my: 1 }} />
            
            <Box sx={{ textAlign: 'center' }}>
            <Button
              size="medium"
              onClick={handleLogin}
              variant="text"
              className='theme-btn'
            >
            Search
            </Button>
            </Box>
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
