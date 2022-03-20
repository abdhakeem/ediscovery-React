import PropTypes from 'prop-types';
import { useState } from 'react';

import {
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  IconButton,
  Collapse
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Axios, API } from 'src/common/api';
import { AddCaseStatus } from './constants';
import styles from './addcase.module.scss';

type AddCaseDialogType = {
  onClose: (status: AddCaseStatus) => void;
  open: boolean;
};

enum AlertMessageType {
  Success = 'success',
  Error = 'error'
}

type AlertMessage = { type?: AlertMessageType; message?: string };

function AddCaseDialog(props: AddCaseDialogType) {
  const { onClose, open } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onChange' });

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({});

  const handleClose = () => {
    onClose(AddCaseStatus.NoStatus);
    reset();
  };

  const displayAlert = (type: AlertMessageType, message: string) => {
    setShowAlert(true);
    setAlertMessage({ type, message });

    // Hide alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const onSubmit = async (data) => {
    const params = { ...data };
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    params.token = token;
    params.userId = id;

    console.log(params);
    try {
      const res = await Axios.post(API.AddCase, {}, { params });
      const message = res.data.Response.Data;

      const SUCCESS_MSG = 'Case created successfully';

      if (message !== SUCCESS_MSG) {
        displayAlert(AlertMessageType.Error, message);
        return Promise.reject();
      }

      reset();
      displayAlert(AlertMessageType.Success, message);
      return Promise.resolve();
    } catch (error) {
      displayAlert(
        AlertMessageType.Error,
        'Unable to proceed with your request'
      );
      return Promise.reject();
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
            <Collapse in={showAlert} addEndListener={() => setAlertMessage({})}>
              <Alert severity={alertMessage.type}>{alertMessage.message}</Alert>
            </Collapse>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div>
                <TextField
                  error={errors.projectname}
                  {...register('projectname', {
                    required: 'Please enter case name'
                  })}
                  label="Case Name"
                  type="text"
                  placeholder="Enter Case Name"
                  InputLabelProps={{ shrink: true }}
                  className="Cases-field"
                  helperText={errors?.projectname?.message}
                />

                <TextField
                  error={errors.caseId}
                  {...register('caseId', {
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
