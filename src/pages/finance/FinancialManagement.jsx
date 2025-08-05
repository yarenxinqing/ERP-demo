import React from 'react';
import { Typography, Breadcrumb } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const FinancialManagement = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Text strong>{pathSnippets[index]}</Text>
      </Breadcrumb.Item>
    );
  });

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>财务管理</Title>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default FinancialManagement;