import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  userName: Yup.string().required(),
  email: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .email('Invalid email address')
    .required('Please enter your email'),
  password: Yup.string().min(6, 'Must be more than 6 characters').required('Please enter your password'),
  confirmPassword: Yup.string()
    .when('password', {
      is: (val) => val && val.length > 0,
      then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
    })
    .required('Please enter confirm password'),
  department: Yup.string().required('Please select Department'),
});

export default loginSchema;
