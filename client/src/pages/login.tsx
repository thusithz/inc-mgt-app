import type { NextPageContext } from 'next';
import { Box, Button, Grid, Typography } from '@mui/material';

import { signIn, getSession } from 'next-auth/react';
import { Formik, Field, FieldProps } from 'formik';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import Wrapper from '@components/Wrapper';

import { FormikMuiTextField } from '@ui-components/FormikMaterialUI/FormikMaterialUi';

import loginSchema from '@utils/schema/loginSchema';
import routes from '@config/routes';

export default function SignIn() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Wrapper>
      <Box
        sx={{
          background: `radial-gradient(81.93% 159.58% at 10.62% 10.01%, #06070C 0%, #0B2A3C 33.78%, #2983B8 95.87%)`,
          height: '100vh',
        }}
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const res = await signIn('credentials', {
              redirect: false,
              email: values.email,
              password: values.password,
              callbackUrl: `${window.location.origin}`,
            });
            if (res.url) router.push(res.url);
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              >
                <Grid
                  container
                  spacing={1}
                  direction='column'
                  sx={{
                    maxWidth: theme.spacing(44),
                    minHeight: theme.spacing(30),
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: theme.spacing(1),
                    padding: theme.spacing(2),
                  }}
                >
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: theme.spacing(3),
                        fontWeight: 500,
                        color: theme.palette.primary.main,
                      }}
                    >
                      Incident Management
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Field name='email'>
                      {(field: FieldProps) => (
                        <FormikMuiTextField
                          {...field}
                          fullWidth
                          variant='standard'
                          type='email'
                          label='Email'
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item>
                    <Field name='password'>
                      {(field: FieldProps) => (
                        <FormikMuiTextField
                          {...field}
                          fullWidth
                          variant='standard'
                          type='password'
                          label='Password'
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item justifyItems='center'>
                    <Button type='submit'>{formik.isSubmitting ? 'Please wait...' : 'Sign In'}</Button>
                  </Grid>
                  <Box
                    sx={{
                      fontSize: theme.spacing(1.2),
                    }}
                  >
                    <a href={routes.SIGN_UP}>Sign Up</a>
                  </Box>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: routes.HOME,
      },
    };
  }
  return {
    props: {},
  };
}
