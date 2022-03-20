import PropTypes from 'prop-types';
import React, { useReducer, useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router';
import 'src/style.css';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const emails = ['username@gmail.com', 'user02@gmail.com'];

//state type
// eslint -- enforce coding stand
type State = {
  casename: string;
  caseid: string;
  company: string;
  description: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  casename: '',
  caseid: '',
  company: '',
  description: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action =
  | {
      type:
        | 'setcasename'
        | 'setcaseid'
        | 'setcompany'
        | 'setdescription'
        | 'loginSuccess'
        | 'loginFailed';
      payload: string;
    }
  | { type: 'setIsButtonDisabled' | 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setcasename':
      return {
        ...state,
        casename: action.payload
      };
    case 'setcaseid':
      return {
        ...state,
        caseid: action.payload
      };
    case 'setdescription':
      return {
        ...state,
        description: action.payload
      };
    case 'setcompany':
      return {
        ...state,
        company: action.payload
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

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {};

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
    if (
      state.casename.trim() &&
      state.caseid.trim() &&
      state.company.trim() &&
      state.description.trim()
    ) {
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
  }, [state.casename, state.caseid, state.company, state.description]);

  const handleLogin = () => {
    const casename = state.casename;
    const caseid = state.caseid;
    const company = state.company;
    const description = state.description;
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    console.log(
      id +
        '==>' +
        token +
        '==>' +
        casename +
        '==>' +
        caseid +
        '==>' +
        company +
        '==>' +
        description
    );

    if (
      casename === '' ||
      caseid === '' ||
      company === '' ||
      description === ''
    ) {
      dispatch({
        type: 'loginFailed',
        payload: 'Fill out the required fields'
      });
    }

    //API Call
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      axios
        .post(
          'https://ediscovery.inabia.ai/api/addcase?projectname=' +
            casename +
            '&caseId=' +
            caseid +
            '&company=' +
            company +
            '&description=' +
            description +
            '&token=' +
            token +
            '&userId=' +
            id +
            ''
        )
        .then((res) => {
          console.log(res.data);

          loginstatus = res.data.Response.Data;
          logintoken = res.data.Response.Token;
          loginid = res.data.Response.userId;

          if (loginstatus !== 'Case created successfully') {
            dispatch({
              type: 'loginFailed',
              payload: loginstatus
            });
          } else if (loginstatus === 'Case created successfully') {
            dispatch({
              type: 'loginSuccess',
              payload: 'Case created successfully'
            });

            // localStorage.setItem('email' , state.email);
            //navigate('/dashboards/cases');
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

  const handlecasenameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setcasename',
      payload: event.target.value
    });
  };

  const handlecaseidChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setcaseid',
      payload: event.target.value
    });
  };

  const handlecompanyChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setcompany',
      payload: event.target.value
    });
  };

  const handledescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setdescription',
      payload: event.target.value
    });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className="page-title">
        <b>Meta Data</b>
      </DialogTitle>
      <Grid item xs={12}>
        <Card>
          <Divider />
          <CardContent>
            <div className="table-responsive">
              <table className="table card-table table-vcenter text-nowrap datatable">
                <thead className="thead-bg">
                  <tr>
                    <th className="th-text">Key</th>
                    <td className="th-text"> Value</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="td-text">Filename</td>
                    <td className="td-text">-</td>
                  </tr>
                  <tr>
                    <td className="td-text">Author</td>
                    <td className="td-text">-</td>
                  </tr>
                  <tr>
                    <td className="td-text">Content Type</td>
                    <td className="td-text">-</td>
                  </tr>
                  <tr>
                    <td className="td-text">Parsed By</td>
                    <td className="td-text">-</td>
                  </tr>
                  <tr>
                    <td className="td-text">Creation Date</td>
                    <td className="td-text">-</td>
                  </tr>
                  <tr>
                    <td className="td-text">-</td>
                    <td className="td-text">-</td>
                  </tr>
                  <tr>
                    <td className="td-text">-</td>
                    <td className="td-text">-</td>
                  </tr>
                  <tr>
                    <td className="td-text">Dc Terms Created</td>
                    <td className="td-text">-</td>
                  </tr>
                  <tr>
                    <td className="td-text">Dc Terms Modified</td>
                    <td className="td-text">-</td>
                  </tr>
                  <tr>
                    <td className="td-text">Dc Creator</td>
                    <td className="td-text">-</td>
                  </tr>
                  <tr>
                    <td className="td-text">Meta Creation Date</td>
                    <td className="td-text">-</td>
                  </tr>
                  <tr>
                    <td className="td-text">File Size</td>
                    <td className="td-text">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Grid>
      {/* <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List> */}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

function Modals() {
  const { caseid } = useParams();
  const { docid } = useParams();
  const { fileid } = useParams();
  const { filename } = useParams();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography
          variant="h3"
          className="page-title"
          sx={{ ml: 1, flex: 0.5 }}
          noWrap
          title={filename}
        >
          {filename}
        </Typography>
        <Paper
          className="searchpage"
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            flex: 0.45
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search keyword here"
            inputProps={{ 'aria-label': 'Search keyword here' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>

        <Button
          size="medium"
          variant="text"
          className="theme-btn submit meta-btn"
          // startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          {' '}
          Meta Data
        </Button>
      </Box>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </Grid>
      </Container>
    </>
  );
}

export default Modals;
