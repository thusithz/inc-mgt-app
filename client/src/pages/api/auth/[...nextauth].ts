import API_ROUTES from '@config/apiRoutes';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { incApi } from 'src/helpers/http';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

const nextAuthOptions = (req, res): NextAuthOptions => ({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = async () => {
          let loginRes;
          try {
            loginRes = await incApi.post(`${process.env.BASE_URL}${API_ROUTES.USER.LOGIN}`, {
              ...credentials,
            });
          } catch (e) {
            loginRes = e?.data;
          }
          if (loginRes.data.success) {
            return loginRes.data.data;
          }
          return null;
        };
        if (user) {
          // Any user object returned here will be saved in the JSON Web Token
          return Promise.resolve(user());
        }
        return Promise.resolve(null);
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      const cusSession = session;
      if (token && token.username) {
        cusSession.user = {
          ...session.user,
          ...token,
        };
      }
      console.log('cusSession', cusSession);
      return cusSession;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          ...user,
          accessToken: user.token,
        };
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Workaroud for some bug with next-auth that I don't understand
      // https://github.com/nextauthjs/next-auth/issues/591
      const makeCallbackUrl = () => {
        if (url.startsWith(baseUrl)) {
          return url;
        }
        const urlObject = new URL(url);

        return baseUrl + urlObject.pathname + urlObject.search;
      };

      return makeCallbackUrl();
    },
  },
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, nextAuthOptions(req, res));
