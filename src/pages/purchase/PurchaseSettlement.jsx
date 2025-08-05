import React from 'react';
import { Card, Button, Table, Space, Tag, Input, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// 模拟采购结算数据
const settlementData = [
  { key: '1', settleNo: 'PS-20231001', orderNo: 'PO-20231001', supplier: 'ABC供应商', date: '2023-10-02', amount: 15000, status: '已结算' },
  { key: '2', settleNo: 'PS-20231002', orderNo: 'PO-20231002', supplier: 'XYZ贸易', date: '2023-10-04', amount: 23000, status: '已结算' },
  { key: '3', settleNo: 'PS-20231003', orderNo: 'PO-20231004', supplier: 'ABC供应商', date: '2023-10-06', amount: 32000, status: '待结算' },
  { key: '4', settleNo: 'PS-20231004', orderNo: 'PO-20231005', supplier: '环球工业', date: '2023-10-08', amount: 19500, status: '已取消' },
];

const PurchaseSettlement = () => {
  const navigate = useNavigate();

  const columns = [
    { title: '结算单号', dataIndex: 'settleNo', key: 'settleNo', width: 150 },
    { title: '采购单号', dataIndex: 'orderNo', key: 'orderNo', width: 150 },
    { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
    { title: '结算日期', dataIndex: 'date', key: 'date', width: 120 },
    { title: '结算金额', dataIndex: 'amount', key: 'amount', width: 150, render: amount => `￥${amount.toLocaleString()}` },
    { title: '状态', dataIndex: 'status', key: 'status', width: 120, render: status => (
      <Tag color={status === '已结算' ? 'green' : status === '待结算' ? 'blue' : 'red'}>{status}</Tag>
    )},
    { title: '操作', key: 'action', render: (_, record) => (
      <Space size="middle">
        <a onClick={() => navigate(`/purchase/settlement/${record.key}`)}>查看</a>
        <a onClick={() => navigate(`/purchase/settlement/${record.key}/edit`)}>编辑</a>
        {record.status === '待结算' && <a onClick={() => {}}>确认结算</a>}
      </Space>
    )},
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>采购结算管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/purchase/settlement/new')}>
          创建结算单
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={settlementData}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default PurchaseSettlement;