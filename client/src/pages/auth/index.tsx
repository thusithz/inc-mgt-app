import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageLayout from 'src/components/PageLayout';
import { useTheme } from '@mui/material/styles';

import AuthHOC from 'src/hoc/authHoc';

const IndexPage: NextPage = () => {
  const theme = useTheme();
  return (
    <PageLayout title='Home'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <Typography
          variant='h4'
          component='div'
          sx={{
            color: theme.palette.primary.main,
          }}
        >
          Welcome to
        </Typography>
        <Typography
          variant='h3'
          component='div'
          sx={{
            color: theme.palette.primary.main,
          }}
        >
          Incident Management Portal
        </Typography>
      </Box>
    </PageLayout>
  );
};

export default AuthHOC(IndexPage);
