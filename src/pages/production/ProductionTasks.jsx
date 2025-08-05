import React, { useState } from 'react';
import { Table, Button, Input, Space, Select, Card, DatePicker, Row, Col, Progress, Tag } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, FilterOutlined, CheckCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ProductionTasks = () => {
  // 模拟生产任务数据
  const [productionTasks, setProductionTasks] = useState([
    { id: 'PT-2023001', planId: 'PP-2023001', productName: '精密零件A', quantity: 5000, assignedTo: '张三', startDate: '2023-10-01', endDate: '2023-10-07', progress: 100, status: 'completed', productionLine: 'Line-01', priority: 'high' },
    { id: 'PT-2023002', planId: 'PP-2023002', productName: '电子组件B', quantity: 10000, assignedTo: '李四', startDate: '2023-10-05', endDate: '2023-10-15', progress: 65, status: 'inProgress', productionLine: 'Line-02', priority: 'medium' },
    { id: 'PT-2023003', planId: 'PP-2023002', productName: '电子组件B', quantity: 5000, assignedTo: '王五', startDate: '2023-10-08', endDate: '2023-10-18', progress: 30, status: 'inProgress', productionLine: 'Line-03', priority: 'medium' },
    { id: 'PT-2023004', planId: 'PP-2023003', productName: '外壳套件C', quantity: 3000, assignedTo: '赵六', startDate: '2023-10-10', endDate: '2023-10-20', progress: 0, status: 'pending', productionLine: 'Line-01', priority: 'low' },
    { id: 'PT-2023005', planId: 'PP-2023004', productName: '电路板D', quantity: 8000, assignedTo: '钱七', startDate: '2023-10-15', endDate: '2023-10-25', progress: 0, status: 'pending', productionLine: 'Line-04', priority: 'high' },
  ]);

  // 搜索和筛选状态
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dateRange, setDateRange] = useState(null);

  // 处理搜索
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // 处理状态筛选
  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  // 处理优先级筛选
  const handlePriorityChange = (value) => {
    setPriorityFilter(value);
  };

  // 处理日期范围筛选
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  // 重置筛选条件
  const resetFilters = () => {
    setSearchText('');
    setStatusFilter('');
    setPriorityFilter('');
    setDateRange(null);
  };

  // 状态样式映射
  const statusTagStyle = {
    completed: { backgroundColor: '#f6ffed', color: '#52c41a', borderColor: '#b7eb8f' },
    inProgress: { backgroundColor: '#fffbe6', color: '#faad14', borderColor: '#ffe58f' },
    pending: { backgroundColor: '#e6f7ff', color: '#1890ff', borderColor: '#91d5ff' },
    cancelled: { backgroundColor: '#fff1f0', color: '#ff4d4f', borderColor: '#ffccc7' },
  };

  // 优先级样式映射
  const priorityTagStyle = {
    high: { backgroundColor: '#fff1f0', color: '#ff4d4f' },
    medium: { backgroundColor: '#fffbe6', color: '#faad14' },
    low: { backgroundColor: '#f6ffed', color: '#52c41a' },
  };

  // 文本映射
  const textMappings = {
    status: { completed: '已完成', inProgress: '进行中', pending: '待开始', cancelled: '已取消' },
    priority: { high: '高', medium: '中', low: '低' }
  };

  // 表格列定义
  const columns = [
    { title: '任务ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: '计划ID', dataIndex: 'planId', key: 'planId', width: 100 },
    { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 150 },
    { title: '任务数量', dataIndex: 'quantity', key: 'quantity', width: 100 },
    { title: '生产线', dataIndex: 'productionLine', key: 'productionLine', width: 100 },
    { title: '负责人', dataIndex: 'assignedTo', key: 'assignedTo', width: 100 },
    { title: '开始日期', dataIndex: 'startDate', key: 'startDate', width: 120 },
    { title: '结束日期', dataIndex: 'endDate', key: 'endDate', width: 120 },
    { 
      title: '优先级', 
      dataIndex: 'priority', 
      key: 'priority', 
      width: 80, 
      render: (priority) => (
        <Tag color={priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'green'}>
          {textMappings.priority[priority]}
        </Tag>
      )
    },
    { 
      title: '进度', 
      dataIndex: 'progress', 
      key: 'progress', 
      width: 120, 
      render: (progress) => (
        <Progress percent={progress} size="small" status={progress === 100 ? 'success' : 'active'} />
      )
    },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status', 
      width: 100, 
      render: (status) => (
        <Tag style={statusTagStyle[status]} bordered>
          {textMappings.status[status]}
        </Tag>
      )
    },
    { 
      title: '操作', 
      key: 'action', 
      width: 150, 
      render: (_, record) => (
        <Space size="small">
          <Button type="text" size="small" icon={<EditOutlined />}>编辑</Button>
          {record.status !== 'completed' && (
            <Button type="text" size="small" icon={<CheckCircleOutlined />}>完成</Button>
          )}
          <Button type="text" size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      )
    },
  ];

  // 筛选数据
  const filteredData = productionTasks.filter(task => {
    const matchesSearch = task.productName.toLowerCase().includes(searchText.toLowerCase()) || 
                          task.id.toLowerCase().includes(searchText.toLowerCase()) ||
                          task.planId.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
    const matchesDateRange = dateRange ? 
      (moment(task.startDate).isAfter(dateRange[0]) && moment(task.endDate).isBefore(dateRange[1])) : 
      true;

    return matchesSearch && matchesStatus && matchesPriority && matchesDateRange;
  });

  return (
    <div className="production-tasks-container">
      <Card title="生产任务管理" variant="plain" className="page-card">
        <div className="table-controls">
          <Row gutter={16} align="middle">
            <Col span={7}>
              <Input
                placeholder="搜索产品名称、任务ID或计划ID"
                allowClear
                enterButton={<SearchOutlined />}
                size="middle"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                className="search-input"
              />
            </Col>
            <Col span={5}>
              <Select
                placeholder="选择状态"
                allowClear
                style={{ width: '100%' }}
                value={statusFilter}
                onChange={handleStatusChange}
              >
                {Object.entries(textMappings.status).map(([value, text]) => (
                  <Option key={value} value={value}>{text}</Option>
                ))}
              </Select>
            </Col>
            <Col span={5}>
              <Select
                placeholder="选择优先级"
                allowClear
                style={{ width: '100%' }}
                value={priorityFilter}
                onChange={handlePriorityChange}
              >
                {Object.entries(textMappings.priority).map(([value, text]) => (
                  <Option key={value} value={value}>{text}</Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker
                placeholder={['开始日期', '结束日期']}
                format="YYYY-MM-DD"
                value={dateRange}
                onChange={handleDateRangeChange}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={1}>
              <Button onClick={resetFilters} icon={<FilterOutlined />} size="middle">重置</Button>
            </Col>
          </Row>
        </div>

        <div className="table-actions" style={{ marginTop: 16, marginBottom: 16, textAlign: 'right' }}>
          <Button type="primary" icon={<PlusOutlined />}>创建任务</Button>
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

export default ProductionTasks;