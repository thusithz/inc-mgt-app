import { createAxiosInstance } from './createAxiosInstance';

export const incApi = createAxiosInstance({ baseURL: process.env.BASE_URL });

// ToDo: Maybe we don't need this anymore. Else we can use an interceptor route to logout if needed

/* eslint-disable */
export const HttpMount = (Component: any) => {
  return (props: any) => {
    return <Component {...props} />;
  };
};
