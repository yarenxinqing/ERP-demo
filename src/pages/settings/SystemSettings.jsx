import React from 'react';
import { Card, Form, Input, Select, Switch, Button, Space, Divider } from 'antd';
import { Outlet } from 'react-router-dom';


const SystemSettings = () => {
  const [form] = Form.useForm();

  // 模拟初始设置数据
  const initialSettings = {
    siteName: '企业管理系统',
    theme: 'light',
    notifications: true,
    language: 'zh-CN',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    sessionTimeout: 30,
  };

  // 表单提交处理
  const handleSubmit = (values) => {
    console.log('设置已保存:', values);
    // 这里可以添加保存到后端的API调用
  };

  return (
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ marginBottom: 24 }}>系统设置</h1>
        <Outlet />
      </div>
  );
};

export default SystemSettings;