import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .email('Invalid email address')
    .required('Please enter your email'),
  password: Yup.string().min(6, 'Must be more than 6 characters').required('Please enter your password'),
});

export default loginSchema;
