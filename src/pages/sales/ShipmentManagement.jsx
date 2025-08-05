import React from 'react';
import { Table, Button, Input, Space, Tag } from 'antd';
import { SearchOutlined, ReloadOutlined, TruckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ShipmentManagement = () => {
  const navigate = useNavigate();

  // 模拟发货管理数据
  const shipmentData = [
    { key: '1', orderNo: 'SO2023001', customer: 'ABC公司', date: '2023-10-15', status: '已发货', trackingNo: 'SF1234567890', logistics: '顺丰速运' },
    { key: '2', orderNo: 'SO2023002', customer: 'XYZ企业', date: '2023-10-16', status: '配送中', trackingNo: 'YD9876543210', logistics: '韵达快递' },
    { key: '3', orderNo: 'SO2023003', customer: '科技有限公司', date: '2023-10-17', status: '待发货', trackingNo: '', logistics: '' },
    { key: '4', orderNo: 'SO2023004', customer: '创新集团', date: '2023-10-18', status: '已签收', trackingNo: 'ZT5678901234', logistics: '中通快递' },
  ];

  // 状态标签样式映射
  const statusTagColor = {
    '已发货': 'blue',
    '配送中': 'orange',
    '待发货': 'gold',
    '已签收': 'green',
    '异常': 'red'
  };

  // 表格列配置
  const columns = [
    { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo' },
    { title: '客户名称', dataIndex: 'customer', key: 'customer' },
    { title: '发货日期', dataIndex: 'date', key: 'date' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: status => (
        <Tag color={statusTagColor[status]}>{status}</Tag>
      )
    },
    { title: '物流公司', dataIndex: 'logistics', key: 'logistics' },
    { title: '运单号', dataIndex: 'trackingNo', key: 'trackingNo' },
    { 
      title: '操作', 
      key: 'action', 
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            size="small" 
            icon={<TruckOutlined />} 
            disabled={record.status !== '待发货'}
            onClick={() => navigate(`/sales/shipments/${record.key}/create`)}>生成出库单</Button>
          <Button size="small" onClick={() => navigate(`/sales/shipments/${record.key}/track`)}>跟踪物流</Button>
        </Space>
      )
    },
  ];

  return (
    <div className="shipment-management-page">
      <div className="page-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>发货管理</h2>
        <Button type="primary" icon={<SearchOutlined />}>批量操作</Button>
      </div>

      <div className="search-bar" style={{ marginBottom: 16 }}>
        <Input
          placeholder="搜索订单编号或客户名称"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
        />
        <Button icon={<ReloadOutlined />} style={{ marginLeft: 16 }}>刷新</Button>
      </div>

      <Table
        columns={columns}
        dataSource={shipmentData}
        rowKey="key"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ShipmentManagement;