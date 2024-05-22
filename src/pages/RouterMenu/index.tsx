import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
import ToolMenu from './ToolMenu';
import Loading from '../../component/Loading';
import ErrorModal from '../../component/ErrorModal';
import { Content } from 'antd/es/layout/layout';
const RouterMenu: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <ToolMenu />
      <Content style={{
        background: colorBgContainer,
        overflow: 'overlay',
        padding: '8px',
        flex: 1
      }}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Content>
      <ErrorModal />
    </Layout>
  );
};
export default RouterMenu;