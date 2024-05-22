import React from 'react';

import { Layout, Flex, Spin } from 'antd';

interface IProp {
}
const Loading: React.FC<IProp> = () => {
  return (
    <Flex align="center" gap="middle" style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
      <Spin tip="" size="large"  >
        <Layout>Loading...</Layout>
      </Spin>
    </Flex>
  );
};

export default Loading;