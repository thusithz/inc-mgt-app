import { ComponentType } from 'react';
import { toast } from 'react-toastify';

export type PositionTypes =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export type ToastTypes = 'info' | 'success' | 'warning' | 'error';

type ExtendTypes = {
  openToast?: (message: string, types?: ToastTypes, position?: PositionTypes) => undefined;
};

const configToast = (WrappedComponent: ComponentType) =>
  function decorator(props) {
    const openToast = (
      message: string,
      toastType: ToastTypes = 'info',
      position: PositionTypes = 'bottom-right'
    ) => {
      toast[toastType](message, {
        position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    };

    return <WrappedComponent {...props} {...({ openToast } as ExtendTypes)} />;
  };
export default configToast;
