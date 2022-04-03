import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { makeStyles } from '@utils/makeStyles';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// component
import PageLayout from 'src/components/PageLayout';

import routes from 'src/config/routes';

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
    flexDirection: 'column',
  },
}));

const PageNotFound: NextPage = () => {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <PageLayout title=''>
      <div className={classes.root}>
        <Typography variant='h6'>Oops !!! 404 page not found</Typography>
        <Button type='submit' variant='contained' color='primary' onClick={() => router.push(routes.HOME)}>
          Go to Home
        </Button>
      </div>
    </PageLayout>
  );
};

export default PageNotFound;
