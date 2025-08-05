import React, { useState } from 'react';
import { Table, Button, Input, Space, Select, Card, DatePicker, Row, Col } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ProductionPlan = () => {
  // 模拟生产计划数据
  const [productionPlans, setProductionPlans] = useState([
    { id: 'PP-2023001', productName: '精密零件A', quantity: 5000, startDate: '2023-10-01', endDate: '2023-10-15', status: 'completed', responsible: '张三', department: '生产一部' },
    { id: 'PP-2023002', productName: '电子组件B', quantity: 10000, startDate: '2023-10-05', endDate: '2023-10-20', status: 'inProgress', responsible: '李四', department: '生产二部' },
    { id: 'PP-2023003', productName: '外壳套件C', quantity: 3000, startDate: '2023-10-10', endDate: '2023-10-25', status: 'scheduled', responsible: '王五', department: '生产一部' },
    { id: 'PP-2023004', productName: '电路板D', quantity: 8000, startDate: '2023-10-15', endDate: '2023-10-30', status: 'scheduled', responsible: '赵六', department: '生产三部' },
    { id: 'PP-2023005', productName: '连接器E', quantity: 12000, startDate: '2023-10-20', endDate: '2023-11-05', status: 'scheduled', responsible: '钱七', department: '生产二部' },
  ]);

  // 搜索和筛选状态
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState(null);

  // 处理搜索
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // 处理状态筛选
  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  // 处理日期范围筛选
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  // 重置筛选条件
  const resetFilters = () => {
    setSearchText('');
    setStatusFilter('');
    setDateRange(null);
  };

  // 状态标签样式映射
  const statusTagStyle = {
    completed: { color: '#52c41a', borderColor: '#52c41a' },
    inProgress: { color: '#faad14', borderColor: '#faad14' },
    scheduled: { color: '#1890ff', borderColor: '#1890ff' },
    cancelled: { color: '#ff4d4f', borderColor: '#ff4d4f' },
  };

  // 状态文本映射
  const statusText = {
    completed: '已完成',
    inProgress: '进行中',
    scheduled: '计划中',
    cancelled: '已取消',
  };

  // 表格列定义
  const columns = [
    { title: '计划ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 150 },
    { title: '计划数量', dataIndex: 'quantity', key: 'quantity', width: 100, sorter: (a, b) => a.quantity - b.quantity },
    { title: '开始日期', dataIndex: 'startDate', key: 'startDate', width: 120 },
    { title: '结束日期', dataIndex: 'endDate', key: 'endDate', width: 120 },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status', 
      width: 100, 
      filters: [
        { text: '计划中', value: 'scheduled' },
        { text: '进行中', value: 'inProgress' },
        { text: '已完成', value: 'completed' },
        { text: '已取消', value: 'cancelled' },
      ],
      render: (status) => (
        <span style={statusTagStyle[status]} className="status-tag">
          {statusText[status]}
        </span>
      )
    },
    { title: '负责人', dataIndex: 'responsible', key: 'responsible', width: 100 },
    { title: '生产部门', dataIndex: 'department', key: 'department', width: 120 },
    { 
      title: '操作', 
      key: 'action', 
      width: 120, 
      render: (_, record) => (
        <Space size="small">
          <Button type="text" size="small" icon={<EditOutlined />}>编辑</Button>
          <Button type="text" size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      )
    },
  ];

  // 筛选数据
  const filteredData = productionPlans.filter(plan => {
    const matchesSearch = plan.productName.toLowerCase().includes(searchText.toLowerCase()) || 
                          plan.id.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter ? plan.status === statusFilter : true;
    const matchesDateRange = dateRange ? 
      (moment(plan.startDate).isAfter(dateRange[0]) && moment(plan.endDate).isBefore(dateRange[1])) : 
      true;

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  return (
    <div className="production-plan-container">
      <Card title="生产计划管理" variant="plain" className="page-card">
        <div className="table-controls">
          <Row gutter={16} align="middle">
            <Col span={8}>
              <Input
                placeholder="搜索产品名称或计划ID"
                allowClear
                enterButton={<SearchOutlined />}
                size="middle"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                className="search-input"
              />
            </Col>
            <Col span={6}>
              <Select
                placeholder="选择状态"
                allowClear
                style={{ width: '100%' }}
                value={statusFilter}
                onChange={handleStatusChange}
              >
                <Option value="scheduled">计划中</Option>
                <Option value="inProgress">进行中</Option>
                <Option value="completed">已完成</Option>
                <Option value="cancelled">已取消</Option>
              </Select>
            </Col>
            <Col span={8}>
              <RangePicker
                placeholder={['开始日期', '结束日期']}
                format="YYYY-MM-DD"
                value={dateRange}
                onChange={handleDateRangeChange}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={2}>
              <Button onClick={resetFilters} icon={<FilterOutlined />} size="middle">重置</Button>
            </Col>
          </Row>
        </div>

        <div className="table-actions" style={{ marginTop: 16, marginBottom: 16, textAlign: 'right' }}>
          <Button type="primary" icon={<PlusOutlined />}>新增生产计划</Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          bordered
          size="middle"
        />
      </Card>
    </div>
  );
};

export default ProductionPlan;