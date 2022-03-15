import PropTypes from 'prop-types';
import React, { useReducer, useEffect, useState } from 'react';

import {Box, Typography} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'; 
import { Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import 'src/style.css';
import 'src/http-common.ts';
import axios from 'axios';
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Dropzone from 'react-dropzone'
import { DropzoneArea } from 'material-ui-dropzone';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AttachFile } from '@mui/icons-material';


const emails = ['username@gmail.com', 'user02@gmail.com'];


//state type
// eslint -- enforce coding stand
type State = {
  casename: string
  caseid:  string
  company: string
  description: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  casename: '',
  caseid: '',
  company: '',
  description: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setcasename' | 'setcaseid' | 'setcompany' | 'setdescription' | 'loginSuccess' | 'loginFailed', payload: string }
| { type: 'setIsButtonDisabled' | 'setIsError', payload: boolean };

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
}

function SimpleDialog(props) {

  const useStyles = makeStyles(theme => createStyles({
    previewChip: {
      Width: '100%',

    },
  }));
  
  
  const classes = useStyles();
  
  const handlefileChange = (files) => {

    const caseId = localStorage.getItem('pcaseId');
    const id = localStorage.getItem('userId');

    console.log('Files:', files)

    const formData = new FormData();
    formData.append("file", files);
    try {
      const response:any = axios({
        method: "post",
        url: "https://ediscovery.inabia.ai/api/fileUpload?userId="+ id +"&caseId="+ caseId +" ",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      //alert(response);

    } catch(error) {
      console.log(error)
    }


    //alert(Response);

    // const file = new File(["foo"], "foo.txt", {
    //   type: "text/plain",
    // });
 
    // {(files) => console.log('Files:', files)}

    // console.log('Files:', files)}

  };



  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
   
  };


  var loginstatus:string = '';
  var logintoken:any = '';
  var loginid:any = '';

  let navigate = useNavigate();

  const [pending, setPending] = useState(false);
  function handleClick() {
    setPending(true);
  }
  const [state, dispatch] = useReducer(reducer, initialState);


  
  useEffect(() => {
    if (state.casename.trim() && state.caseid.trim() && state.company.trim() && state.description.trim()) {
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

 

  

  const handlecasenameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setcasename',
        payload: event.target.value
        
      });
    };

  const handlecaseidChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setcaseid',
        payload: event.target.value
      });
    };
  
  const handlecompanyChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setcompany',
        payload: event.target.value
      });
    };

  const handledescriptionChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setdescription',
        payload: event.target.value
      });
    }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className='page-title'><b>Upload Document </b></DialogTitle>
      <Grid item xs={12}>
            <Card>
              <Divider />
              <CardContent>
              <form  noValidate autoComplete="off">

                  <div>

                  <DropzoneArea
                  showPreviews={true}
                  showPreviewsInDropzone={false}
                  useChipsForPreview
                  previewGridProps={{container: { spacing: 1, direction: 'row' }}}
                  previewChipProps={{classes: { root: classes.previewChip } }}
                  dropzoneText={"Click or drag file to this area to upload"}
                  previewText="Selected files"
                  maxFileSize={5000000}
                  filesLimit = {1}
                  onChange={handlefileChange}
          
                />

                  </div>
                  <Button  size="medium"  variant="text"  className='theme-btn submit' onClick={handlefileChange}
                    // startIcon={<AddTwoToneIcon fontSize="small" />}
                  > Upload
                  </Button>
                  
                </form>
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
  selectedValue: PropTypes.string.isRequired,
};

function Modals() {


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
        <Typography variant="h3" className='page-title'>Documents</Typography>
        <Button
          size="medium"
          onClick={handleClickOpen}
          variant="text"
          className='theme-btn'
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
         Add Document
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
