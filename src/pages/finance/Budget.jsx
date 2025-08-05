import React, { useState } from 'react';
import { Card, Table, Form, Input, InputNumber, DatePicker, Button, Space, Tag, message, Modal, Select } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const BudgetManagement = () => {
  // 模拟预算数据
  const [budgetData, setBudgetData] = useState([
    { id: '1', department: '采购部', category: '原材料', amount: 500000, used: 320000, remaining: 180000, status: 'normal', startDate: '2023-01-01', endDate: '2023-12-31' },
    { id: '2', department: '销售部', category: '市场推广', amount: 300000, used: 280000, remaining: 20000, status: 'warning', startDate: '2023-01-01', endDate: '2023-12-31' },
    { id: '3', department: '研发部', category: '设备采购', amount: 800000, used: 450000, remaining: 350000, status: 'normal', startDate: '2023-01-01', endDate: '2023-12-31' },
    { id: '4', department: '行政部', category: '办公费用', amount: 150000, used: 145000, remaining: 5000, status: 'warning', startDate: '2023-01-01', endDate: '2023-12-31' },
    { id: '5', department: '财务部', category: '财务费用', amount: 100000, used: 60000, remaining: 40000, status: 'normal', startDate: '2023-01-01', endDate: '2023-12-31' },
  ]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');

  // 状态标签样式
  const statusTag = (status) => {
    switch (status) {
      case 'normal':
        return <Tag color="green">正常</Tag>;
      case 'warning':
        return <Tag color="orange">即将超支</Tag>;
      case 'exceeded':
        return <Tag color="red">已超支</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  };

  // 打开新增/编辑弹窗
  const showModal = (record = null) => {
    setIsModalVisible(true);
    if (record) {
      setEditingKey(record.id);
      form.setFieldsValue({
        ...record,
        startDate: moment(record.startDate),
        endDate: moment(record.endDate)
      });
    } else {
      setEditingKey('');
      form.resetFields();
    }
  };

  // 关闭弹窗
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingKey('');
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const newRecord = {
        ...values,
        id: editingKey || `B${moment().format('YYYYMMDDHHmmss')}`,
        used: 0,
        remaining: values.amount,
        status: 'normal',
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD')
      };

      if (editingKey) {
        // 更新现有预算
        setBudgetData(budgetData.map(item => item.id === editingKey ? {...item, ...newRecord} : item));
        message.success('预算更新成功');
      } else {
        // 添加新预算
        setBudgetData([newRecord, ...budgetData]);
        message.success('预算创建成功');
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingKey('');
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 删除预算
  const confirmDelete = (id) => {
    setBudgetData(budgetData.filter(item => item.id !== id));
    message.success('预算已删除');
  };

  // 搜索功能
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // 筛选后的数据
  const filteredData = budgetData.filter(item =>
    item.department.includes(searchText) ||
    item.category.includes(searchText)
  );

  // 表格列定义
  const columns = [
    { title: '部门', dataIndex: 'department', key: 'department' },
    { title: '预算类别', dataIndex: 'category', key: 'category' },
    { title: '预算金额', dataIndex: 'amount', key: 'amount', render: (amount) => `￥${amount.toLocaleString()}` },
    { title: '已使用', dataIndex: 'used', key: 'used', render: (used) => `￥${used.toLocaleString()}` },
    { title: '剩余金额', dataIndex: 'remaining', key: 'remaining', render: (remaining) => `￥${remaining.toLocaleString()}` },
    { title: '预算周期', key: 'period', render: (_, record) => `${record.startDate} - ${record.endDate}` },
    { title: '状态', key: 'status', render: (_, record) => statusTag(record.status) },
    { 
      title: '操作', 
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} onClick={() => showModal(record)}>编辑</Button>
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => confirmDelete(record.id)}>删除</Button>
        </Space>
      )
    },
  ];

  return (
    <div className="budget-management">
      <div className="page-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>预算管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>新增预算</Button>
      </div>

      <div className="search-bar" style={{ marginBottom: 16 }}>
        <Input
          placeholder="搜索部门或预算类别"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingKey ? "编辑预算" : "新增预算"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          name="budget_form"
        >
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select placeholder="请选择部门">
              <Option value="采购部">采购部</Option>
              <Option value="销售部">销售部</Option>
              <Option value="研发部">研发部</Option>
              <Option value="行政部">行政部</Option>
              <Option value="财务部">财务部</Option>
              <Option value="人力资源部">人力资源部</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="category"
            label="预算类别"
            rules={[{ required: true, message: '请输入预算类别' }]}
          >
            <Input placeholder="请输入预算类别" />
          </Form.Item>

          <Form.Item
            name="amount"
            label="预算金额"
            rules={[{ required: true, message: '请输入预算金额' }, { type: 'number', min: 1 }]}
          >
            <InputNumber style={{ width: '100%' }} formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\￥\s?|(,*)/g, '')} />
          </Form.Item>

          <Form.Item
            name="period"
            label="预算周期"
            rules={[{ required: true, message: '请选择预算周期' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BudgetManagement;