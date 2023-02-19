import { createGlobalStyle } from 'styled-components'

import { DefaultLayout } from '~/components/DefaultLayout';
import { trpc } from '~/utils/trpc';

import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';


const GlobalStyle = createGlobalStyle`
html,
body,
textarea {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Robot, Oxygen,
  Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica neue, sans-serif;
}
* {
  box-sizing: border-box;
}
a {
  cursor: pointer;
  text-decoration: none;
  transition: .25s;
  color: #000;
}
ol, ul {
  list-style: none;
}
`

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(<>
    <GlobalStyle />
    <Component {...pageProps} />
  </>);
}) as AppType;

export default trpc.withTRPC(MyApp);
