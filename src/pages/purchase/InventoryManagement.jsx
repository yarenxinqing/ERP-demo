import React from 'react';
import { Card, Button, Table, Space, Tag, DatePicker } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

// 模拟入库数据
const inventoryData = [
  { key: '1', orderNo: 'IN-20231001', purchaseNo: 'PO-20231001', supplier: 'ABC供应商', date: '2023-10-01', status: '已入库', quantity: 500, warehouse: '主仓库' },
  { key: '2', orderNo: 'IN-20231002', purchaseNo: 'PO-20231002', supplier: 'XYZ贸易', date: '2023-10-03', status: '已入库', quantity: 200, warehouse: '备用仓库' },
  { key: '3', orderNo: 'IN-20231003', purchaseNo: 'PO-20231004', supplier: 'ABC供应商', date: '2023-10-05', status: '待入库', quantity: 150, warehouse: '主仓库' },
  { key: '4', orderNo: 'IN-20231004', purchaseNo: 'PO-20231006', supplier: 'XYZ贸易', date: '2023-10-07', status: '已取消', quantity: 300, warehouse: '主仓库' },
];

const InventoryManagement = () => {
  const navigate = useNavigate();

  const columns = [
    { title: '入库单号', dataIndex: 'orderNo', key: 'orderNo', width: 150 },
    { title: '采购单号', dataIndex: 'purchaseNo', key: 'purchaseNo', width: 150 },
    { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
    { title: '入库日期', dataIndex: 'date', key: 'date', width: 120 },
    { title: '入库数量', dataIndex: 'quantity', key: 'quantity', width: 120 },
    { title: '仓库', dataIndex: 'warehouse', key: 'warehouse', width: 120 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 120, render: status => (
      <Tag color={status === '已入库' ? 'green' : status === '待入库' ? 'blue' : 'red'}>{status}</Tag>
    )},
    { title: '操作', key: 'action', render: (_, record) => (
      <Space size="middle">
        <a onClick={() => navigate(`/purchase/inventory/${record.key}`)}>查看</a>
        <a onClick={() => navigate(`/purchase/inventory/${record.key}/edit`)}>编辑</a>
        {record.status === '待入库' && <a onClick={() => {}}>确认入库</a>}
      </Space>
    )},
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>入库管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/purchase/inventory/new')}>
          创建入库单
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={inventoryData}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default InventoryManagement;