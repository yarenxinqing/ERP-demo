import React, { useState } from 'react';
import { Table, Button, Input, Select, Space, Tag, DatePicker, Card, Row, Col } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import 'moment/locale/zh-cn';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

// 模拟销售订单数据
const salesOrders = [
  { key: '1', orderNo: 'SO-20231001', customer: 'ABC公司', date: '2023-10-01', product: '电子产品', amount: 25000, status: '已发货', payment: '已付款' },
  { key: '2', orderNo: 'SO-20231002', customer: 'XYZ企业', date: '2023-10-02', product: '办公用品', amount: 8000, status: '处理中', payment: '已付款' },
  { key: '3', orderNo: 'SO-20231003', customer: '123贸易', date: '2023-10-03', product: '电子产品', amount: 15000, status: '已取消', payment: '未付款' },
  { key: '4', orderNo: 'SO-20231004', customer: '科技有限公司', date: '2023-10-04', product: '包装材料', amount: 32000, status: '处理中', payment: '部分付款' },
  { key: '5', orderNo: 'SO-20231005', customer: '制造集团', date: '2023-10-05', product: '电子产品', amount: 45000, status: '已发货', payment: '已付款' },
  { key: '6', orderNo: 'SO-20231006', customer: '环球工业', date: '2023-10-06', product: '办公用品', amount: 6800, status: '待发货', payment: '已付款' },
  { key: '7', orderNo: 'SO-20231007', customer: 'XYZ企业', date: '2023-10-07', product: '包装材料', amount: 12000, status: '已发货', payment: '已付款' },
];

// 状态颜色映射
const statusColorMap = {
  '已发货': 'green',
  '处理中': 'blue',
  '已取消': 'red',
  '待发货': 'orange',
};

// 付款状态颜色映射
const paymentColorMap = {
  '已付款': 'green',
  '部分付款': 'orange',
  '未付款': 'red',
};

const SalesOrderList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [dateRange, setDateRange] = useState(null);

  // 搜索和筛选处理
  const handleSearch = () => {
    // 实际项目中这里会调用API进行筛选
    console.log('搜索条件:', { searchText, status, paymentStatus, dateRange });
  };

  // 重置筛选条件
  const handleReset = () => {
    setSearchText('');
    setStatus('');
    setPaymentStatus('');
    setDateRange(null);
  };

  // 表格列定义
  const columns = [
    { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo', width: 120 },
    { title: '客户', dataIndex: 'customer', key: 'customer', width: 150 },
    { title: '订单日期', dataIndex: 'date', key: 'date', width: 120 },
    { title: '产品类别', dataIndex: 'product', key: 'product', width: 120 },
    { 
      title: '金额', 
      dataIndex: 'amount', 
      key: 'amount',
      width: 120,
      render: (amount) => `￥${amount.toLocaleString()}`
    },
    { 
      title: '订单状态', 
      dataIndex: 'status', 
      key: 'status',
      width: 110,
      render: (status) => (
        <Tag color={statusColorMap[status]} key={status}>
          {status}
        </Tag>
      )
    },
    { 
      title: '付款状态', 
      dataIndex: 'payment', 
      key: 'payment',
      width: 110,
      render: (payment) => (
        <Tag color={paymentColorMap[payment]} key={payment}>
          {payment}
        </Tag>
      )
    },
    { 
      title: '操作', 
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/sales/${record.key}`)}>查看</a>
          <a onClick={() => navigate(`/sales/${record.key}/edit`)}>编辑</a>
          <a onClick={() => navigate(`/sales/${record.key}/delivery`)}>发货</a>
        </Space>
      )
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1>销售订单管理</h1>
        <p>查看和管理所有销售订单</p>
      </div>

      {/* 搜索和筛选区域 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={5}>
            <Input
                placeholder="搜索订单编号或客户"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={handleSearch}
                prefix={<SearchOutlined />}
              />
            </Col>
          <Col xs={24} sm={12} md={8} lg={5}>
            <Select
              placeholder="选择订单状态"
              style={{ width: '100%' }}
              value={status}
              onChange={(value) => setStatus(value)}
            >
              <Option value="">全部状态</Option>
              <Option value="已发货">已发货</Option>
              <Option value="处理中">处理中</Option>
              <Option value="已取消">已取消</Option>
              <Option value="待发货">待发货</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={5}>
            <Select
              placeholder="选择付款状态"
              style={{ width: '100%' }}
              value={paymentStatus}
              onChange={(value) => setPaymentStatus(value)}
            >
              <Option value="">全部状态</Option>
              <Option value="已付款">已付款</Option>
              <Option value="部分付款">部分付款</Option>
              <Option value="未付款">未付款</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={12} lg={5}>
            <RangePicker
                placeholder={['开始日期', '结束日期']}
                format="YYYY-MM-DD"
                value={dateRange}
                onChange={(dates) => setDateRange(dates)}
                locale={moment.locale('zh-cn')}
              />
            </Col>
          <Col xs={24} sm={12} md={12} lg={4}>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>搜索</Button>
              <Button onClick={handleReset}>重置</Button>
              <Button icon={<FilterOutlined />}>高级筛选</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 订单列表和操作按钮 */}
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/sales/new')}>创建销售订单</Button>
      </div>

      <Table
          columns={columns}
          dataSource={salesOrders}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          bordered
        />
      </div>
  );
};

export default SalesOrderList;