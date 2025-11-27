import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const MessageDialog = ({ open, handleClose, message, severity = 'success' }) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MessageDialog;