import type { NextPage, NextPageContext } from 'next';

import { signIn, getSession } from 'next-auth/react';

import { Box, Button, Grid, Typography } from '@mui/material';

import { Formik, Field, FieldProps } from 'formik';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import Wrapper from '@components/Wrapper';

import { FormikMuiTextField, FormikMuiSelect } from '@ui-components/FormikMaterialUI/FormikMaterialUi';

import configToast, { PositionTypes, ToastTypes } from 'src/hoc/toast';

import signUpSchema from '@utils/schema/signUpSchema';
import routes from '@config/routes';
import { signUp } from '@service/userService';

const departmentList = [
  {
    id: 'eng',
    description: 'Engineering',
  },
  {
    id: 'it',
    description: 'IT Support',
  },
  {
    id: 'mgt',
    description: 'Management',
  },
];

type SignUpProps = {
  openToast?: (message: string, types?: ToastTypes, position?: PositionTypes) => undefined;
};

const SignUp: NextPage<SignUpProps> = ({ openToast }) => {
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
          initialValues={{ email: '', password: '', userName: '', confirmPassword: '', department: '' }}
          validationSchema={signUpSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const res = await signUp({
              username: values.userName,
              department: values.department,
              email: values.email,
              password: values.password,
            });
            if (res && res.success) {
              const authRes = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
                callbackUrl: `${window.location.origin}`,
              });
              if (authRes.url) router.push(authRes.url);
            } else {
              openToast(res.error || JSON.stringify(res.errors), 'error');
            }
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
                    <Typography
                      sx={{
                        fontSize: theme.spacing(2),
                        fontWeight: 400,
                      }}
                    >
                      Sign Up Here
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Field name='userName'>
                      {(field: FieldProps) => (
                        <FormikMuiTextField
                          {...field}
                          fullWidth
                          type='text'
                          variant='standard'
                          label='User Name'
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item>
                    <Field name='email'>
                      {(field: FieldProps) => (
                        <FormikMuiTextField
                          {...field}
                          fullWidth
                          type='email'
                          variant='standard'
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
                          type='password'
                          variant='standard'
                          label='Password'
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item>
                    <Field name='confirmPassword'>
                      {(field: FieldProps) => (
                        <FormikMuiTextField
                          {...field}
                          fullWidth
                          type='password'
                          variant='standard'
                          label='Confirm Password'
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item>
                    <Field name='department'>
                      {(field: FieldProps) => (
                        <FormikMuiSelect
                          {...field}
                          label='Department'
                          options={departmentList}
                          getOptionLabel={({ description }) => description}
                          sx={{
                            minWidth: '150px',
                          }}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item justifyItems='center'>
                    <Button type='submit'>{formik.isSubmitting ? 'Please wait...' : 'Sign Up'}</Button>
                  </Grid>
                  <Box
                    sx={{
                      fontSize: theme.spacing(1.5),
                    }}
                  >
                    <a href={routes.LOGIN}>Sign In</a>
                  </Box>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default configToast(SignUp);

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
