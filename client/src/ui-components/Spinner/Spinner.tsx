import React, { FC } from 'react';

import Backdrop from '@mui/material/Backdrop';
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@utils/makeStyles';

import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles()((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    backgroundColor: alpha(theme.palette.common.matisse, 0.09),
    opacity: 0.5,
  },
}));

type SpinnerProps = {
  open: boolean;
};

const Spinner: FC<SpinnerProps> = ({ open }) => {
  const { classes } = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress thickness={3} size={110} color='primary' />
    </Backdrop>
  );
};

export default Spinner;
