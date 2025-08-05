import React, { useState } from 'react';
import { Table, Button, Input, Card, Row, Col, Space, Tag } from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// 模拟客户数据
const customerData = [
  { key: '1', code: 'CUST001', name: 'ABC科技有限公司', contact: '张三', phone: '13800138000', email: 'zhangsan@abc.com', level: 'VIP', status: 'active' },
  { key: '2', code: 'CUST002', name: 'XYZ贸易公司', contact: '李四', phone: '13900139000', email: 'lisi@xyz.com', level: '普通', status: 'active' },
  { key: '3', code: 'CUST003', name: '123制造企业', contact: '王五', phone: '13700137000', email: 'wangwu@123.com', level: 'VIP', status: 'inactive' },
  { key: '4', code: 'CUST004', name: '测试客户', contact: '赵六', phone: '13600136000', email: 'zhaoliu@test.com', level: '普通', status: 'active' },
];

// 客户等级配置
const levelConfig = {
  'VIP': { color: 'gold' },
  '普通': { color: 'blue' },
};

// 客户状态配置
const statusConfig = {
  'active': { text: '正常', color: 'green' },
  'inactive': { text: '停用', color: 'red' },
};

const CustomerManagement = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  // 搜索处理
  const handleSearch = () => {
    // 实际项目中这里会调用API进行搜索
    console.log('搜索客户:', searchText);
  };

  // 刷新数据
  const handleRefresh = () => {
    // 实际项目中这里会调用API刷新数据
    console.log('刷新客户数据');
  };

  // 表格列定义
  const columns = [
    { title: '客户编码', dataIndex: 'code', key: 'code', width: 120 },
    { title: '客户名称', dataIndex: 'name', key: 'name', width: 180 },
    { title: '联系人', dataIndex: 'contact', key: 'contact', width: 100 },
    { title: '联系电话', dataIndex: 'phone', key: 'phone', width: 120 },
    { title: '电子邮箱', dataIndex: 'email', key: 'email', width: 180 },
    { 
      title: '客户等级', 
      dataIndex: 'level', 
      key: 'level',
      width: 100,
      render: (level) => (
        <Tag color={levelConfig[level].color}>{level}</Tag>
      )
    },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={statusConfig[status].color}>{statusConfig[status].text}</Tag>
      )
    },
    { 
      title: '操作', 
      key: 'action',
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/sales/customers/${record.key}`)}>查看</a>
          <a onClick={() => navigate(`/sales/customers/${record.key}/edit`)}>编辑</a>
          <a onClick={() => navigate(`/sales/customers/${record.key}/history`)}>交易历史</a>
        </Space>
      )
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1>客户管理</h1>
        <p>查看和管理所有客户信息</p>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={18} md={18} lg={18} xl={19} xxl={20}>
            <Input
              placeholder="搜索客户名称或联系人"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col xs={24} sm={6} md={6} lg={6} xl={5} xxl={4}>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>搜索</Button>
              <Button icon={<ReloadOutlined />} onClick={handleRefresh}>刷新</Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/sales/customers/new')}>新增客户</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Table
        columns={columns}
        dataSource={customerData}
        rowKey="key"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
        bordered
      />
    </div>
  );
};

export default CustomerManagement;