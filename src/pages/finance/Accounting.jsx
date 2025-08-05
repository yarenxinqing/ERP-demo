import React from 'react';
import { Card, Typography, Table, Button, Space, Tag, message, Input } from 'antd';
import { SearchOutlined, ReloadOutlined, FilterOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Accounting = () => {
  // 模拟会计核算数据
  const accountingData = [
    { id: 'A001', date: '2023-10-01', account: '应收账款', debit: 50000, credit: 0, balance: 50000, status: 'completed', remark: '销售产品收入' },
    { id: 'A002', date: '2023-10-02', account: '原材料采购', debit: 0, credit: 25000, balance: 25000, status: 'completed', remark: '采购原材料支出' },
    { id: 'A003', date: '2023-10-03', account: '销售收入', debit: 30000, credit: 0, balance: 55000, status: 'processing', remark: '服务收入' },
    { id: 'A004', date: '2023-10-04', account: '管理费用', debit: 0, credit: 15000, balance: 40000, status: 'completed', remark: '办公费用支出' },
    { id: 'A005', date: '2023-10-05', account: '应收账款', debit: 45000, credit: 0, balance: 85000, status: 'completed', remark: '销售产品收入' },
  ];

  // 状态标签样式
  const statusTag = (status) => {
    switch (status) {
      case 'completed':
        return <Tag color="green">已记账</Tag>;
      case 'processing':
        return <Tag color="blue">处理中</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  };

  // 表格列定义
  const columns = [
    { title: '日期', dataIndex: 'date', key: 'date', width: 120 },
    { title: '会计科目', dataIndex: 'account', key: 'account', width: 150 },
    { title: '借方金额', dataIndex: 'debit', key: 'debit', width: 120, render: (amount) => `￥${amount.toLocaleString()}` },
    { title: '贷方金额', dataIndex: 'credit', key: 'credit', width: 120, render: (amount) => `￥${amount.toLocaleString()}` },
    { title: '余额', dataIndex: 'balance', key: 'balance', width: 120, render: (amount) => `￥${amount.toLocaleString()}` },
    { title: '状态', key: 'status', width: 100, render: (_, record) => statusTag(record.status) },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    { title: '操作', key: 'action', width: 120, render: () => (
      <Space size="small">
        <Button type="text" size="small">查看</Button>
        <Button type="text" size="small">编辑</Button>
      </Space>
    )}
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>会计核算</Title>
        <Space>
          <Button icon={<FilterOutlined />}>筛选</Button>
          <Button icon={<ReloadOutlined />} onClick={() => message.success('数据已刷新')}>刷新</Button>
        </Space>
      </div>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="搜索会计科目或备注"
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={accountingData}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default Accounting;