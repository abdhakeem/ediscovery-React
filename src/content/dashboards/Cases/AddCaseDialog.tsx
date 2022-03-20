import PropTypes from 'prop-types';
import React from 'react';

import {
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import 'src/http-common.ts';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import styles from './addcase.module.scss';

function AddCaseDialog(props) {
  const { onClose, open } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm({ mode: 'onChange' });

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (data) => {
    const casename = data.casename;
    const caseid = data.caseid;
    const company = data.company;
    const description = data.description;
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

          const loginstatus = res.data.Response.Data;

          if (loginstatus !== 'Case created successfully') {
            alert('Login failed');
            return Promise.reject();
          } else if (loginstatus === 'Case created successfully') {
            return Promise.resolve();
          } else {
            alert('Unable to proceed your request');
            return Promise.reject();
          }
        });
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className={styles.dialogTitle}>
        <h3>Add New Case </h3>
        <IconButton className={styles.closeIcon} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Grid item xs={12}>
        <Card>
          <Divider />
          <CardContent>
            {isSubmitSuccessful ? (
              <Alert severity="success">Case created succesfully.</Alert>
            ) : (
              false
            )}
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div>
                <TextField
                  error={errors.casename}
                  {...register('casename', {
                    required: 'Please enter case name'
                  })}
                  label="Case Name"
                  type="text"
                  placeholder="Enter Case Name"
                  InputLabelProps={{ shrink: true }}
                  className="Cases-field"
                  helperText={errors?.casename?.message}
                />

                <TextField
                  error={errors.caseid}
                  {...register('caseid', {
                    required: 'Please enter a case id'
                  })}
                  label="Case ID"
                  type="text"
                  placeholder="Enter Case ID"
                  InputLabelProps={{ shrink: true }}
                  className="Cases-field"
                  helperText={errors?.caseid?.message}
                />

                <TextField
                  error={errors.company}
                  {...register('company', {
                    required: 'Please enter company name'
                  })}
                  label="Company"
                  type="text"
                  placeholder="Enter Company"
                  InputLabelProps={{ shrink: true }}
                  className="Cases-field"
                  helperText={errors?.company?.message}
                />

                <TextField
                  error={errors.description}
                  {...register('description', {
                    required: 'Please enter description'
                  })}
                  label="Description"
                  type="text"
                  placeholder="Enter Description"
                  InputLabelProps={{ shrink: true }}
                  className="Cases-field"
                  helperText={errors?.description?.message}
                />
              </div>
              <Button
                size="medium"
                variant="text"
                className="theme-btn submit"
                type="submit"
              >
                ADD NEW CASE
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Dialog>
  );
}

AddCaseDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default AddCaseDialog;
