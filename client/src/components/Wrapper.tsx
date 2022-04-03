import React, { FC, useEffect } from 'react';
import { Router } from 'next/router';
import Spinner from 'src/ui-components/Spinner/Spinner';
import { HttpMount } from 'src/helpers/http';
import { useAppContext, useDispatchAppContext, Actions } from 'src/utils/context/appContext';

const Wrapper: FC = ({ children }) => {
  const { loaderIds } = useAppContext();
  const { dispatch } = useDispatchAppContext();

  const startLoading = () => {
    dispatch({ type: Actions.ADD_LOADER, payload: 'server' });
  };
  const completeLoading = () => {
    dispatch({ type: Actions.REMOVE_LOADER, payload: 'server' });
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', completeLoading);
    Router.events.on('routeChangeError', completeLoading);
    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', completeLoading);
      Router.events.off('routeChangeError', completeLoading);
    };
  }, []);

  return (
    <>
      <Spinner open={!!(loaderIds && loaderIds.length > 0)} />
      {children}
    </>
  );
};

export default HttpMount(Wrapper);
