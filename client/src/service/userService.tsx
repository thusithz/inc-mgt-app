import { AxiosError } from 'axios';
import ApiRoutes from 'src/config/apiRoutes';
import { incApi } from 'src/helpers/http';
import { CallBackType } from 'src/types/main';

export const signUp = async (values, callBack?: CallBackType) => {
  try {
    const res = await incApi.post(ApiRoutes.USER.SIGN_UP, {
      ...values,
    });
    return res;
  } catch (e) {
    const error: AxiosError = e;
    const status = error?.response?.status;
    callBack && callBack('Something went wrong :(', status);
    return error?.response?.data;
  }
};
