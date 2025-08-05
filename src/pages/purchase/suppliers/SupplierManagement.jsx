import React from 'react';
import { Card, Table, Button, Space, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

const SupplierManagement = () => {
  // 模拟供应商数据
  const suppliers = [
    { id: 1, name: 'ABC供应商', contact: '张三', phone: '13800138000', email: 'abc@example.com', status: 'active' },
    { id: 2, name: 'DEF有限公司', contact: '李四', phone: '13900139000', email: 'def@example.com', status: 'active' },
    { id: 3, name: 'GHI贸易', contact: '王五', phone: '13700137000', email: 'ghi@example.com', status: 'inactive' },
  ];

  // 表格列定义
  const columns = [
    { title: '供应商ID', dataIndex: 'id', key: 'id' },
    { title: '供应商名称', dataIndex: 'name', key: 'name' },
    { title: '联系人', dataIndex: 'contact', key: 'contact' },
    { title: '电话', dataIndex: 'phone', key: 'phone' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '状态', dataIndex: 'status', key: 'status', render: status => (
      <span style={{ color: status === 'active' ? 'green' : 'red' }}>
        {status === 'active' ? '启用' : '禁用'}
      </span>
    )},
    { title: '操作', key: 'action', render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />} size="small" type="primary">编辑</Button>
        <Button icon={<DeleteOutlined />} size="small" danger>删除</Button>
      </Space>
    )},
  ];

  return (
    <Card
      title={<Title level={2}>供应商管理</Title>}
      extra={
        <Space>
          <Button icon={<SearchOutlined />} type="default">搜索</Button>
          <Button icon={<PlusOutlined />} type="primary">新增供应商</Button>
        </Space>
      }
    >
      <Table
        dataSource={suppliers}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default SupplierManagement;