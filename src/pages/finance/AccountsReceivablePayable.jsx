import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, DatePicker, Divider, message } from 'antd';
import { SearchOutlined, ReloadOutlined, ExportOutlined, FilterOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const AccountsReceivablePayable = () => {
  // 模拟数据
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);

  // 模拟会计核算数据
  const generateMockData = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: `arp-${i + 1000}`,
      type: i % 2 === 0 ? 'receivable' : 'payable',
      customerOrSupplier: i % 2 === 0
        ? `客户${String.fromCharCode(65 + i % 26)}公司`
        : `供应商${String.fromCharCode(97 + i % 26)}企业`,
      amount: (10000 + Math.random() * 90000).toFixed(2),
      date: moment().subtract(i, 'days').format('YYYY-MM-DD'),
      status: ['pending', 'completed', 'overdue'][Math.floor(Math.random() * 3)],
      dueDate: moment().add(Math.floor(Math.random() * 30), 'days').format('YYYY-MM-DD'),
      invoiceNumber: `INV-${moment().format('YYYYMMDD')}-${1000 + i}`,
      notes: i % 3 === 0 ? '月度结算' : i % 3 === 1 ? '项目尾款' : ''
    }));
  };

  // 加载数据
  useEffect(() => {
    setLoading(true);
    // 模拟API请求延迟
    setTimeout(() => {
      setDataSource(generateMockData());
      setLoading(false);
    }, 800);
  }, []);

  // 刷新数据
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setDataSource(generateMockData());
      setLoading(false);
      message.success('数据已刷新');
    }, 800);
  };

  // 导出数据
  const handleExport = () => {
    message.success('数据导出成功');
  };

  // 搜索和筛选处理
  const handleSearch = () => {
    // 实际应用中这里会有API调用
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('搜索完成');
    }, 500);
  };

  // 重置筛选条件
  const handleResetFilters = () => {
    setSearchText('');
    setStatusFilter('all');
    setDateRange(null);
  };

  // 表格列配置
  const columns = [
    {
      title: '单据编号',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      width: 140,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type) => (
        <Tag color={type === 'receivable' ? 'green' : 'blue'}>
          {type === 'receivable' ? '应收账款' : '应付账款'}
        </Tag>
      ),
    },
    {
      title: '客户/供应商',
      dataIndex: 'customerOrSupplier',
      key: 'customerOrSupplier',
      width: 180,
    },
    {
      title: '金额 (元)',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount) => `￥${amount}`,
    },
    {
      title: '发生日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: '到期日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        let color = 'processing';
        let text = '处理中';
        if (status === 'completed') {
          color = 'success';
          text = '已完成';
        } else if (status === 'overdue') {
          color = 'error';
          text = '已逾期';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small">查看</Button>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" danger size="small">删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="accounts-receivable-payable-page">
      <Card title="应收应付管理" variant="plain" className="page-card">
        <div className="table-operations" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space size="middle">
            <Input
              placeholder="搜索单据编号/客户/供应商"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
            <Select
              placeholder="状态筛选"
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              style={{ width: 150 }}
            >
              <Option value="all">全部状态</Option>
              <Option value="pending">处理中</Option>
              <Option value="completed">已完成</Option>
              <Option value="overdue">已逾期</Option>
            </Select>
            <RangePicker
              placeholder={['开始日期', '结束日期']}
              value={dateRange}
              onChange={(dates) => setDateRange(dates)}
              format="YYYY-MM-DD"
            />
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>搜索</Button>
            <Button onClick={handleResetFilters}>重置</Button>
          </Space>
          <Space size="middle">
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>刷新</Button>
            <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>导出</Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
};

export default AccountsReceivablePayable;