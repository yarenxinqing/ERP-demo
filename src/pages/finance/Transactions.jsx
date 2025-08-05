import React, { useState } from 'react';
import { Card, Table, Form, Input, Select, DatePicker, Button, Space, Tag, message, Modal } from 'antd';
import { SearchOutlined, ReloadOutlined, FilterOutlined, DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Transactions = () => {
  // 模拟交易数据
  const [transactionData, setTransactionData] = useState([
    { id: 'T20231001', date: '2023-10-01', type: '收入', amount: 50000, status: 'completed', category: '销售回款', counterparty: 'ABC公司', remark: '季度销售款' },
    { id: 'T20231002', date: '2023-10-02', type: '支出', amount: 25000, status: 'completed', category: '采购付款', counterparty: 'XYZ供应商', remark: '原材料采购' },
    { id: 'T20231003', date: '2023-10-03', type: '收入', amount: 30000, status: 'processing', category: '服务收入', counterparty: '科技有限公司', remark: '技术服务费' },
    { id: 'T20231004', date: '2023-10-04', type: '支出', amount: 15000, status: 'cancelled', category: '办公费用', counterparty: '办公用品商店', remark: '季度采购' },
    { id: 'T20231005', date: '2023-10-05', type: '收入', amount: 45000, status: 'completed', category: '销售回款', counterparty: 'DEF企业', remark: '月度销售款' },
  ]);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');
  const [dateRange, setDateRange] = useState(null);
  const [form] = Form.useForm();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  // 状态标签样式
  const statusTag = (status) => {
    switch (status) {
      case 'completed':
        return <Tag color="green">已完成</Tag>;
      case 'processing':
        return <Tag color="blue">处理中</Tag>;
      case 'cancelled':
        return <Tag color="red">已取消</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  };

  // 交易类型标签
  const typeTag = (type) => {
    return type === '收入' ? <Tag color="success">收入</Tag> : <Tag color="error">支出</Tag>;
  };

  // 搜索功能
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // 筛选功能
  const handleFilter = () => {
    setIsFilterModalVisible(true);
  };

  // 重置筛选
  const handleReset = () => {
    setSearchText('');
    setStatus('');
    setDateRange(null);
    form.resetFields();
  };

  // 应用筛选
  const handleApplyFilter = async () => {
    try {
      const values = await form.validateFields();
      setStatus(values.status);
      setDateRange(values.dateRange);
      setIsFilterModalVisible(false);
    } catch (error) {
      console.error('筛选表单验证失败:', error);
    }
  };

  // 导出数据
  const handleExport = () => {
    message.success('交易数据导出成功');
    // 实际项目中这里会调用导出API
  };

  // 筛选后的数据
  const filteredData = transactionData.filter(item => {
    const matchesSearch = item.counterparty.includes(searchText) || item.remark.includes(searchText);
    const matchesStatus = status ? item.status === status : true;
    const matchesDate = dateRange ? 
      moment(item.date).isBetween(dateRange[0], dateRange[1], 'day', '[]') : true;
    return matchesSearch && matchesStatus && matchesDate;
  });

  // 表格列定义
  const columns = [
    { title: '交易日期', dataIndex: 'date', key: 'date' },
    { title: '交易类型', dataIndex: 'type', key: 'type', render: (type) => typeTag(type) },
    { title: '金额', dataIndex: 'amount', key: 'amount', render: (amount) => `￥${amount.toLocaleString()}` },
    { title: '状态', dataIndex: 'status', key: 'status', render: (status) => statusTag(status) },
    { title: '交易类别', dataIndex: 'category', key: 'category' },
    { title: '交易对手', dataIndex: 'counterparty', key: 'counterparty' },
    { title: '备注', dataIndex: 'remark', key: 'remark' },
    { 
      title: '操作', 
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>查看详情</a>
          <a>导出凭证</a>
        </Space>
      )
    },
  ];

  return (
    <div className="transactions-management">
      <div className="page-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>交易记录</h2>
        <Space>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>导出数据</Button>
        </Space>
      </div>

      <div className="search-filter-bar" style={{ marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <Input
          placeholder="搜索交易对手或备注"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
        <Space>
          <Button icon={<FilterOutlined />} onClick={handleFilter}>高级筛选</Button>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>重置</Button>
        </Space>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      </Card>

      {/* 筛选弹窗 */}
      <Modal
        title="高级筛选"
        open={isFilterModalVisible}
        onOk={handleApplyFilter}
        onCancel={() => setIsFilterModalVisible(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="status" label="交易状态">
            <Select placeholder="全部状态">
              <Option value="completed">已完成</Option>
              <Option value="processing">处理中</Option>
              <Option value="cancelled">已取消</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dateRange" label="交易日期范围">
            <RangePicker />
          </Form.Item>
          <Form.Item name="category" label="交易类别">
            <Select placeholder="全部类别">
              <Option value="销售回款">销售回款</Option>
              <Option value="采购付款">采购付款</Option>
              <Option value="服务收入">服务收入</Option>
              <Option value="办公费用">办公费用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Transactions;