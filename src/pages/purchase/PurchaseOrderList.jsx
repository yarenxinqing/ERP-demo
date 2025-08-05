import React, { useState } from 'react';
import { Table, Button, Input, Select, Space, Tag, DatePicker, Card, Row, Col } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import 'moment/locale/zh-cn';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

// 模拟采购订单数据
const purchaseOrders = [
  { key: '1', orderNo: 'PO-20231001', supplier: 'ABC供应商', date: '2023-10-01', amount: 15000, status: '已完成', category: '原材料' },
  { key: '2', orderNo: 'PO-20231002', supplier: 'XYZ贸易', date: '2023-10-02', amount: 23000, status: '处理中', category: '办公用品' },
  { key: '3', orderNo: 'PO-20231003', supplier: '科技配件厂', date: '2023-10-03', amount: 8000, status: '已取消', category: '设备配件' },
  { key: '4', orderNo: 'PO-20231004', supplier: 'ABC供应商', date: '2023-10-04', amount: 32000, status: '处理中', category: '原材料' },
  { key: '5', orderNo: 'PO-20231005', supplier: '环球工业', date: '2023-10-05', amount: 19500, status: '已完成', category: '包装材料' },
  { key: '6', orderNo: 'PO-20231006', supplier: 'XYZ贸易', date: '2023-10-06', amount: 45000, status: '待审核', category: '办公用品' },
  { key: '7', orderNo: 'PO-20231007', supplier: '科技配件厂', date: '2023-10-07', amount: 12000, status: '处理中', category: '设备配件' },
];

// 状态颜色映射
const statusColorMap = {
  '已完成': 'green',
  '处理中': 'blue',
  '已取消': 'red',
  '待审核': 'orange',
};

const PurchaseOrderList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');
  const [dateRange, setDateRange] = useState(null);

  // 搜索和筛选处理
  const handleSearch = () => {
    // 实际项目中这里会调用API进行筛选
    console.log('搜索条件:', { searchText, status, dateRange });
  };

  // 重置筛选条件
  const handleReset = () => {
    setSearchText('');
    setStatus('');
    setDateRange(null);
  };

  // 表格列定义
  const columns = [
    { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo', width: 120 },
    { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
    { title: '订单日期', dataIndex: 'date', key: 'date', width: 120 },
    { title: '采购类别', dataIndex: 'category', key: 'category', width: 120 },
    { 
      title: '金额', 
      dataIndex: 'amount', 
      key: 'amount',
      width: 120,
      render: (amount) => `￥${amount.toLocaleString()}`
    },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={statusColorMap[status]} key={status}>
          {status}
        </Tag>
      )
    },
    { 
      title: '操作', 
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/purchase/${record.key}`)}>查看</a>
          <a onClick={() => navigate(`/purchase/${record.key}/edit`)}>编辑</a>
          <a>审批</a>
        </Space>
      )
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1>采购订单管理</h1>
        <p>查看和管理所有采购订单</p>
      </div>

      {/* 搜索和筛选区域 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              placeholder="搜索订单编号或供应商"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Select
              placeholder="选择状态"
              style={{ width: '100%' }}
              value={status}
              onChange={(value) => setStatus(value)}
            >
              <Option value="">全部状态</Option>
              <Option value="已完成">已完成</Option>
              <Option value="处理中">处理中</Option>
              <Option value="已取消">已取消</Option>
              <Option value="待审核">待审核</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <RangePicker
              placeholder={['开始日期', '结束日期']}
              format="YYYY-MM-DD"
              value={dateRange}
              onChange={(dates) => setDateRange(dates)}
              locale={moment.locale('zh-cn')}
            />
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
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
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/purchase/new')}>创建采购订单</Button>
      </div>

      <Table
        columns={columns}
        dataSource={purchaseOrders}
        rowKey="key"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
        bordered
      />
    </div>
  );
};

export default PurchaseOrderList;