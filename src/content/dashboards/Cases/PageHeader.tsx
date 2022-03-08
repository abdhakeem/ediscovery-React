import PropTypes from 'prop-types';
import { useState } from 'react';

import {Box, Typography} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'; 
import { Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';


const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
   
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create Case </DialogTitle>
      <Grid item xs={12}>
            <Card>
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                  <TextField
                      id="outlined-password-input"
                      label="Shery"
                      type="password"
                      autoComplete="current-password"
                    />
                  
                  <TextField
                      id="outlined-password-input"
                      label="Shery"
                      type="password"
                      autoComplete="current-password"
                    />
                  
                  <TextField
                      id="outlined-password-input"
                      label="Shery"
                      type="password"
                      autoComplete="current-password"
                    />

                  <TextField
                      id="outlined-password-input"
                      label="Shery"
                      type="password"
                      autoComplete="current-password"
                    />

                  </div>
                  
                </Box>
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
        <Typography variant="h3" className='page-title'>Cases</Typography>
        <Button
          size="medium"
          onClick={handleClickOpen}
          variant="text"
          className='theme-btn'
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
         Create Case
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
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Basic Dialog" />
              <Divider />
              <CardContent>
                <Typography variant="subtitle1" component="div">
                  Selected: {selectedValue}
                </Typography>
                <br />
                
                <SimpleDialog
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Modals;
