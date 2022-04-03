import routes from '@config/routes';
import type { NextPage, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

const IndexPage: NextPage = () => null;

export default IndexPage;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    redirect: {
      permanent: false,
      destination: session ? routes.HOME : routes.LOGIN,
    },
  };
}
