import React from 'react';
import { Card, Button, Table, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// 模拟采购计划数据
const purchasePlans = [
  { key: '1', planNo: 'PP-20231001', name: '季度原材料采购计划', date: '2023-10-01', status: '已审批', amount: 500000 },
  { key: '2', planNo: 'PP-20231002', name: '办公用品月度计划', date: '2023-10-05', status: '待审批', amount: 30000 },
  { key: '3', planNo: 'PP-20231003', name: '设备维护配件计划', date: '2023-10-10', status: '进行中', amount: 120000 },
];

const PurchasePlan = () => {
  const navigate = useNavigate();

  const columns = [
    { title: '计划编号', dataIndex: 'planNo', key: 'planNo', width: 150 },
    { title: '计划名称', dataIndex: 'name', key: 'name', width: 200 },
    { title: '创建日期', dataIndex: 'date', key: 'date', width: 120 },
    { title: '状态', dataIndex: 'status', key: 'status', width: 120, render: status => (
      <span style={{
        color: status === '已审批' ? 'green' : status === '待审批' ? 'orange' : 'blue'
      }}>{status}</span>
    )},
    { title: '计划金额', dataIndex: 'amount', key: 'amount', width: 150, render: amount => `￥${amount.toLocaleString()}` },
    { title: '操作', key: 'action', render: (_, record) => (
      <Space size="middle">
        <a onClick={() => navigate(`/purchase/plan/${record.key}`)}>查看</a>
        <a onClick={() => navigate(`/purchase/plan/${record.key}/edit`)}>编辑</a>
      </Space>
    )},
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>采购计划管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/purchase/plan/new')}>
          创建采购计划
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={purchasePlans}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          bordered
        />
      </Card>
    </div>
  );
};

export default PurchasePlan;