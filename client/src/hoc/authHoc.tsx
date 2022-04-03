import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

/* eslint-disable */
const AuthHoc = (Component: any) => {
  return (props: any) => {
    const router = useRouter();

    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const isAuthenticated = status === 'authenticated';

    const validateToken = async () => {
      if (status === 'unauthenticated') {
        router.replace('/');
      }
    };

    useEffect(() => {
      validateToken();
    }, [status]);

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null;

    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
};

export default AuthHoc;
