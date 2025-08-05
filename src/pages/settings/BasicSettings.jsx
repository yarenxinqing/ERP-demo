import React from 'react';
import { Card, Form, Input, Select, Switch, Button, Space, Divider } from 'antd';

const BasicSettings = () => {
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
    console.log('基本设置已保存:', values);
    // 这里可以添加保存到后端的API调用
  };

  return (
    <Card title="基本设置">
      <Form
        form={form}
        layout="vertical"
        initialValues={initialSettings}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="siteName"
          label="系统名称"
          rules={[{ required: true, message: '请输入系统名称' }]}
        >
          <Input placeholder="请输入系统名称" />
        </Form.Item>

        <Form.Item
          name="theme"
          label="主题模式"
          rules={[{ required: true, message: '请选择主题模式' }]}
        >
          <Select placeholder="请选择主题模式">
            <Select.Option value="light">浅色模式</Select.Option>
            <Select.Option value="dark">深色模式</Select.Option>
            <Select.Option value="auto">自动切换</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="language"
          label="系统语言"
          rules={[{ required: true, message: '请选择系统语言' }]}
        >
          <Select placeholder="请选择系统语言">
            <Select.Option value="zh-CN">简体中文</Select.Option>
            <Select.Option value="en-US">English</Select.Option>
            <Select.Option value="ja-JP">日本語</Select.Option>
          </Select>
        </Form.Item>

        <Divider orientation="left">通知设置</Divider>

        <Form.Item
          name="notifications"
          label="启用通知"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Divider orientation="left">安全设置</Divider>

        <Form.Item
          name="sessionTimeout"
          label="会话超时时间（分钟）"
          rules={[{ required: true, message: '请输入会话超时时间' }]}
        >
          <Input type="number" min={5} max={120} placeholder="请输入会话超时时间" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">保存设置</Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BasicSettings;