/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type AttatchInterceptorFunction = (axiosInstance: AxiosInstance) => void;

export const createAxiosInstance = (
  config: AxiosRequestConfig,
  applyInterceptorFunctions: AttatchInterceptorFunction[] = []
): AxiosInstance => {
  const axiosInstance = axios.create(config);
  applyInterceptorFunctions.forEach((applyInterceptorFunction) => {
    applyInterceptorFunction(axiosInstance);
  });
  return axiosInstance;
};
