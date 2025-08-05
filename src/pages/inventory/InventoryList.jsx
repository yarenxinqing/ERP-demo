import React, { useState } from 'react';
import { Table, Button, Input, Select, Space, Tag, DatePicker, Card, Row, Col, Badge } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import 'moment/locale/zh-cn';
import moment from 'moment';
moment.locale('zh-cn');

const { Option } = Select;
const { RangePicker } = DatePicker;

// 模拟库存数据
const inventoryData = [
  { key: '1', itemCode: 'ITEM001', name: '电子元件A', category: '电子元件', quantity: 500, warehouse: '主仓库', location: 'A-12-03', status: 'normal', lastUpdated: '2023-10-01' },
  { key: '2', itemCode: 'ITEM002', name: '包装纸箱', category: '包装材料', quantity: 200, warehouse: '主仓库', location: 'B-04-15', status: 'normal', lastUpdated: '2023-10-02' },
  { key: '3', itemCode: 'ITEM003', name: '塑料外壳', category: '结构件', quantity: 35, warehouse: '备用仓库', location: 'C-09-07', status: 'low', lastUpdated: '2023-10-03' },
  { key: '4', itemCode: 'ITEM004', name: '集成电路', category: '电子元件', quantity: 120, warehouse: '主仓库', location: 'A-08-22', status: 'normal', lastUpdated: '2023-10-04' },
  { key: '5', itemCode: 'ITEM005', name: '电阻器', category: '电子元件', quantity: 800, warehouse: '主仓库', location: 'A-14-05', status: 'normal', lastUpdated: '2023-10-05' },
  { key: '6', itemCode: 'ITEM006', name: '金属支架', category: '结构件', quantity: 0, warehouse: '备用仓库', location: 'C-02-18', status: 'out', lastUpdated: '2023-10-06' },
  { key: '7', itemCode: 'ITEM007', name: '连接器', category: '电子元件', quantity: 45, warehouse: '主仓库', location: 'A-06-30', status: 'low', lastUpdated: '2023-10-07' },
];

// 库存状态配置
const statusConfig = {
  normal: { text: '库存正常', color: 'green' },
  low: { text: '库存偏低', color: 'orange' },
  out: { text: '库存不足', color: 'red' },
};

const InventoryList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [dateRange, setDateRange] = useState(null);

  // 搜索和筛选处理
  const handleSearch = () => {
    // 实际项目中这里会调用API进行筛选
    console.log('搜索条件:', { searchText, category, status, dateRange });
  };

  // 重置筛选条件
  const handleReset = () => {
    setSearchText('');
    setCategory('');
    setStatus('');
    setDateRange(null);
  };

  // 刷新数据
  const handleRefresh = () => {
    // 实际项目中这里会调用API刷新数据
    console.log('刷新库存数据');
  };

  // 表格列定义
  const columns = [
    { title: '物料编码', dataIndex: 'itemCode', key: 'itemCode', width: 120 },
    { title: '物料名称', dataIndex: 'name', key: 'name', width: 180 },
    { title: '物料类别', dataIndex: 'category', key: 'category', width: 120 },
    { title: '仓库', dataIndex: 'warehouse', key: 'warehouse', width: 120 },
    { title: '库位', dataIndex: 'location', key: 'location', width: 120 },
    { 
      title: '库存数量', 
      dataIndex: 'quantity', 
      key: 'quantity',
      width: 120,
      render: (quantity, record) => (
        <span>
          {quantity}
          {record.status === 'low' && <Badge status="warning" text="低库存" />}
          {record.status === 'out' && <Badge status="error" text="无库存" />}
        </span>
      )
    },
    { 
      title: '库存状态', 
      dataIndex: 'status', 
      key: 'status',
      width: 120,
      render: (status) => (
        <Tag color={statusConfig[status].color} key={status}>
          {statusConfig[status].text}
        </Tag>
      )
    },
    { title: '最后更新', dataIndex: 'lastUpdated', key: 'lastUpdated', width: 120 },
    { 
      title: '操作', 
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/inventory/${record.key}`)}>查看</a>
          <a onClick={() => navigate(`/inventory/${record.key}/edit`)}>编辑</a>
          <a onClick={() => navigate(`/inventory/${record.key}/adjust`)}>调整库存</a>
        </Space>
      )
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1>库存管理</h1>
        <p>产品库存状态和库存流动记录</p>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={5}>
            <Input
              placeholder="搜索产品名称或SKU"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={5}>
            <Select
              placeholder="选择库存状态"
              style={{ width: '100%' }}
              value={status}
              onChange={(value) => setStatus(value)}
            >
              <Option value="">全部状态</Option>
              <Option value="正常">正常</Option>
              <Option value="预警">预警</Option>
              <Option value="缺货">缺货</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={5}>
            <Select
              placeholder="选择分类"
              style={{ width: '100%' }}
              value={category}
              onChange={(value) => setCategory(value)}
            >
              <Option value="">全部分类</Option>
              <Option value="电子产品">电子产品</Option>
              <Option value="办公用品">办公用品</Option>
              <Option value="包装材料">包装材料</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={12} lg={9}>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>搜索</Button>
              <Button onClick={handleReset}>重置</Button>
              <Button icon={<ReloadOutlined />} onClick={handleRefresh}>刷新数据</Button>
              <Button icon={<FilterOutlined />}>高级筛选</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/inventory/new')}>添加库存记录</Button>
      </div>

      <Table
        columns={columns}
        dataSource={inventoryData}
        rowKey="key"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
        bordered
      />
    </div>
  );
};

export default InventoryList;