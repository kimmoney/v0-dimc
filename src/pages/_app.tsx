import { client } from '@/api/reactQuery';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Header from '@/layout/Header';
import '@/styles/fonts.css';
import '@/styles/globals.css';
import '@/styles/value.css';
import { antdThemeConfig } from '@/theme/config';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import { useRouter } from 'next/router';
import styled from 'styled-components';
// import '@/pages/management-login/login.css';
interface ContainerProps {
  noneHeader: boolean;
}

const Container = styled.div<ContainerProps>`
  padding-top: ${(props) => (props.noneHeader ? '0' : '88px')};

  @media (max-width: 480px) {
    padding-top: ${(props) => (props.noneHeader ? '0' : '44px')};
  }
`;

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const noneHeader = router.pathname == '/management'  ||router.pathname == '/management-login'  ||router.pathname == '/agree' || router.pathname == '/personal-info';

  return (
    <ConfigProvider locale={koKR} theme={antdThemeConfig}>
      <QueryClientProvider client={client}>
        {!noneHeader && <Header />}
        
        <Container noneHeader={noneHeader}>
          <Component {...pageProps} />
        </Container>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;
