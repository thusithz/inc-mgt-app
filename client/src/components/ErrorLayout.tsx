import React, { FC } from 'react';
import { useRouter } from 'next/router';

import { makeStyles } from '@utils/makeStyles';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// eslint-disable-next-line import/no-cycle
import PageLayout from '@components/PageLayout';
import routes from 'src/config/routes';

// component

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    flexDirection: 'column',
  },
}));

const ErrorLayout: FC = () => {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <PageLayout title=''>
      <div className={classes.root}>
        <Typography variant='h6'>!!! Opps Something went wrong :(</Typography>
        <Button type='submit' variant='contained' color='primary' onClick={() => router.push(routes.HOME)}>
          Go to Home
        </Button>
      </div>
    </PageLayout>
  );
};

export default ErrorLayout;
