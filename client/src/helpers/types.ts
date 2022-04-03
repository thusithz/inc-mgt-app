import { AxiosInstance } from 'axios';
import { NextPageContext } from 'next';

export type SSRContext = Pick<NextPageContext, 'req' | 'res' | 'query'>;

export type AttatchInterceptorFunction = (axiosInstance: AxiosInstance) => void;

declare module 'axios' {
  export interface AxiosRequestConfig {
    ssrContext?: SSRContext;
  }
}
