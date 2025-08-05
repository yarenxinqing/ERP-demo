import React from 'react';
import { Table, Button, Input, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

const SalesQuote = () => {
  // 模拟销售报价数据
  const quoteData = [
    { key: '1', quoteNo: 'SQ2023001', customer: 'ABC公司', date: '2023-10-01', amount: '¥150,000', status: '已审批' },
    { key: '2', quoteNo: 'SQ2023002', customer: 'XYZ企业', date: '2023-10-05', amount: '¥85,000', status: '待审批' },
    { key: '3', quoteNo: 'SQ2023003', customer: '科技有限公司', date: '2023-10-10', amount: '¥220,000', status: '已拒绝' },
  ];

  // 表格列配置
  const columns = [
    { title: '报价单号', dataIndex: 'quoteNo', key: 'quoteNo' },
    { title: '客户名称', dataIndex: 'customer', key: 'customer' },
    { title: '创建日期', dataIndex: 'date', key: 'date' },
    { title: '报价金额', dataIndex: 'amount', key: 'amount' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { 
      title: '操作', 
      key: 'action', 
      render: () => (
        <Space size="middle">
          <Button type="primary" size="small">编辑</Button>
          <Button danger size="small">删除</Button>
        </Space>
      )
    },
  ];

  return (
    <div className="sales-quote-page">
      <div className="page-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>销售报价管理</h2>
        <Button type="primary" icon={<SearchOutlined />}>新增报价</Button>
      </div>

      <div className="search-bar" style={{ marginBottom: 16 }}>
        <Input
          placeholder="搜索报价单号或客户名称"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
        />
        <Button icon={<ReloadOutlined />} style={{ marginLeft: 16 }}>刷新</Button>
      </div>

      <Table
        columns={columns}
        dataSource={quoteData}
        rowKey="key"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default SalesQuote;