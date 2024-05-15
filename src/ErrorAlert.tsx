import React from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const ErrorAlert = ({ error }: { error: string }) => {
  return (
    <Snackbar open={error ? true : false}>
      <Alert
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};

export { ErrorAlert };