import React from 'react';
import { Table, Button, Input, Space, Tag, Select } from 'antd';
import { SearchOutlined, ReloadOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const SalesSettlement = () => {
  const navigate = useNavigate();

  // 模拟销售结算数据
  const settlementData = [
    { key: '1', orderNo: 'SO2023001', customer: 'ABC公司', amount: '¥150,000', date: '2023-10-15', status: '已结算', invoiceNo: 'INV2023001', paymentDate: '2023-10-20' },
    { key: '2', orderNo: 'SO2023002', customer: 'XYZ企业', amount: '¥85,000', date: '2023-10-16', status: '待结算', invoiceNo: '', paymentDate: '' },
    { key: '3', orderNo: 'SO2023003', customer: '科技有限公司', amount: '¥220,000', date: '2023-10-17', status: '部分结算', invoiceNo: 'INV2023003', paymentDate: '2023-10-25' },
    { key: '4', orderNo: 'SO2023004', customer: '创新集团', amount: '¥120,000', date: '2023-10-18', status: '已逾期', invoiceNo: 'INV2023004', paymentDate: '' },
  ];

  // 状态标签样式映射
  const statusTagColor = {
    '已结算': 'green',
    '待结算': 'blue',
    '部分结算': 'orange',
    '已逾期': 'red'
  };

  // 结算状态选项
  const statusOptions = [
    { label: '全部', value: 'all' },
    { label: '已结算', value: '已结算' },
    { label: '待结算', value: '待结算' },
    { label: '部分结算', value: '部分结算' },
    { label: '已逾期', value: '已逾期' },
  ];

  // 表格列配置
  const columns = [
    { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo' },
    { title: '客户名称', dataIndex: 'customer', key: 'customer' },
    { title: '结算金额', dataIndex: 'amount', key: 'amount', sorter: (a, b) => a.amount.localeCompare(b.amount) },
    { title: '订单日期', dataIndex: 'date', key: 'date' },
    { 
      title: '结算状态', 
      dataIndex: 'status', 
      key: 'status',
      render: status => (
        <Tag color={statusTagColor[status]}>{status}</Tag>
      )
    },
    { title: '发票编号', dataIndex: 'invoiceNo', key: 'invoiceNo' },
    { title: '付款日期', dataIndex: 'paymentDate', key: 'paymentDate' },
    { 
      title: '操作', 
      key: 'action', 
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            size="small" 
            icon={<FileTextOutlined />} 
            disabled={record.status === '已结算'}
            onClick={() => navigate(`/sales/settlement/${record.key}/invoice`)}>开具发票</Button>
          <Button 
            icon={<DollarOutlined />} 
            size="small" 
            disabled={record.status === '已结算' || record.status === '已逾期'}
            onClick={() => navigate(`/sales/settlement/${record.key}/payment`)}>收款核销</Button>
        </Space>
      )
    },
  ];

  return (
    <div className="sales-settlement-page">
      <div className="page-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>销售结算管理</h2>
        <Button type="primary" icon={<SearchOutlined />}>导出报表</Button>
      </div>

      <div className="search-bar" style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="搜索订单编号或客户名称"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
        />
        <Select
          defaultValue="all"
          style={{ width: 180, marginLeft: 16 }}
          options={statusOptions}
          placeholder="选择结算状态"
        />
        <Button icon={<ReloadOutlined />} style={{ marginLeft: 16 }}>刷新</Button>
      </div>

      <Table
        columns={columns}
        dataSource={settlementData}
        rowKey="key"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default SalesSettlement;