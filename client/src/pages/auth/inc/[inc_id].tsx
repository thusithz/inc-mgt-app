import type { NextPage } from 'next';

import PageLayout from 'src/components/PageLayout';

import AuthHOC from 'src/hoc/authHoc';

const IndexPage: NextPage = () => <PageLayout title='Home'>`Inc Edit`</PageLayout>;

export default AuthHOC(IndexPage);
