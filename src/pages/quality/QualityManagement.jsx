import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card } from 'antd';

const QualityManagement = () => {
  return (
    <Card title="质量管理" variant="plain" style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* 质量管理模块内容将通过子路由渲染 */}
      <Outlet />
    </Card>
  );
};

export default QualityManagement;