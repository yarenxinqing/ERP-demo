import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Select, Card, DatePicker, Row, Col, Progress, Tag, Badge, Statistic, Descriptions } from 'antd';
import { SearchOutlined, FilterOutlined, ReloadOutlined, PauseCircleOutlined, PlayCircleOutlined, WarningOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Line } from '@ant-design/plots';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ProductionExecution = () => {
  // 模拟生产执行数据
  const [executionData, setExecutionData] = useState([
    { id: 'PE-2023001', taskId: 'PT-2023001', productName: '精密零件A', planQuantity: 5000, completedQuantity: 5000, rejectQuantity: 45, rate: 99.1, status: 'completed', startTime: '2023-10-01 08:00', endTime: '2023-10-07 16:30', machine: 'MC-001', operator: '张三', efficiency: 102 },
    { id: 'PE-2023002', taskId: 'PT-2023002', productName: '电子组件B', planQuantity: 10000, completedQuantity: 6500, rejectQuantity: 130, rate: 98.0, status: 'inProgress', startTime: '2023-10-05 08:00', endTime: '', machine: 'MC-002', operator: '李四', efficiency: 95 },
    { id: 'PE-2023003', taskId: 'PT-2023003', productName: '电子组件B', planQuantity: 5000, completedQuantity: 1500, rejectQuantity: 30, rate: 98.0, status: 'inProgress', startTime: '2023-10-08 08:00', endTime: '', machine: 'MC-003', operator: '王五', efficiency: 88 },
    { id: 'PE-2023004', taskId: 'PT-2023004', productName: '外壳套件C', planQuantity: 3000, completedQuantity: 0, rejectQuantity: 0, rate: 0, status: 'pending', startTime: '', endTime: '', machine: 'MC-001', operator: '赵六', efficiency: 0 },
  ]);

  // 生产效率趋势数据
  const efficiencyData = [
    { date: '10-01', efficiency: 98 },
    { date: '10-02', efficiency: 102 },
    { date: '10-03', efficiency: 99 },
    { date: '10-04', efficiency: 105 },
    { date: '10-05', efficiency: 95 },
    { date: '10-06', efficiency: 93 },
    { date: '10-07', efficiency: 97 },
  ];

  // 搜索和筛选状态
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [machineFilter, setMachineFilter] = useState('');
  const [dateRange, setDateRange] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // 处理搜索
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // 处理状态筛选
  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  // 处理机器筛选
  const handleMachineChange = (value) => {
    setMachineFilter(value);
  };

  // 处理日期范围筛选
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  // 重置筛选条件
  const resetFilters = () => {
    setSearchText('');
    setStatusFilter('');
    setMachineFilter('');
    setDateRange(null);
  };

  // 切换自动刷新
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  // 自动刷新效果模拟
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        // 在实际应用中这里会调用API获取最新数据
        console.log('Refreshing execution data...');
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // 计算进度
  const calculateProgress = (completed, total) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  // 状态样式映射
  const statusStyles = {
    completed: { color: '#52c41a', bgColor: '#f6ffed', borderColor: '#b7eb8f' },
    inProgress: { color: '#faad14', bgColor: '#fffbe6', borderColor: '#ffe58f' },
    pending: { color: '#1890ff', bgColor: '#e6f7ff', borderColor: '#91d5ff' },
    paused: { color: '#fa8c16', bgColor: '#fff2e8', borderColor: '#ffd591' },
    error: { color: '#ff4d4f', bgColor: '#fff1f0', borderColor: '#ffccc7' },
  };

  // 状态文本映射
  const statusText = {
    completed: '已完成',
    inProgress: '执行中',
    pending: '待开始',
    paused: '已暂停',
    error: '异常',
  };

  // 获取可用机器列表
  const machineOptions = [...new Set(executionData.map(item => item.machine))].map(machine => (
    <Option key={machine} value={machine}>{machine}</Option>
  ));

  // 表格列定义
  const columns = [
    { title: '执行ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: '任务ID', dataIndex: 'taskId', key: 'taskId', width: 100 },
    { title: '产品名称', dataIndex: 'productName', key: 'productName', width: 150 },
    { title: '计划数量', dataIndex: 'planQuantity', key: 'planQuantity', width: 100 },
    { title: '完成数量', dataIndex: 'completedQuantity', key: 'completedQuantity', width: 100 },
    { title: '良品率(%)', dataIndex: 'rate', key: 'rate', width: 90, render: rate => (
      <span>{rate >= 98 ? <Badge status="success" text={rate} /> : rate >= 95 ? <Badge status="processing" text={rate} /> : <Badge status="warning" text={rate} />}</span>
    )},
    { title: '进度', key: 'progress', width: 120, render: (_, record) => (
      <Progress percent={calculateProgress(record.completedQuantity, record.planQuantity)} size="small" status={record.status === 'completed' ? 'success' : 'active'} />
    )},
    { title: '状态', dataIndex: 'status', key: 'status', width: 100, render: status => (
      <Tag style={{ backgroundColor: statusStyles[status].bgColor, color: statusStyles[status].color, borderColor: statusStyles[status].borderColor }} bordered>
        {statusText[status]}
      </Tag>
    )},
    { title: '机器', dataIndex: 'machine', key: 'machine', width: 90 },
    { title: '操作员', dataIndex: 'operator', key: 'operator', width: 100 },
    { title: '开始时间', dataIndex: 'startTime', key: 'startTime', width: 140 },
    { title: '结束时间', dataIndex: 'endTime', key: 'endTime', width: 140, render: time => time || '-' },
    { title: '效率(%)', dataIndex: 'efficiency', key: 'efficiency', width: 90, render: eff => (
      <span>{eff >= 100 ? <span style={{ color: '#52c41a' }}>{eff}</span> : eff >= 95 ? <span>{eff}</span> : <span style={{ color: '#faad14' }}>{eff}</span>}</span>
    )},
    { title: '操作', key: 'action', width: 120, render: (_, record) => (
      <Space size="small">
        {record.status === 'inProgress' ? (
          <Button type="text" size="small" icon={<PauseCircleOutlined />}>暂停</Button>
        ) : record.status === 'paused' ? (
          <Button type="text" size="small" icon={<PlayCircleOutlined />}>继续</Button>
        ) : null}
        {record.status === 'error' && (
          <Button type="text" size="small" danger icon={<WarningOutlined />}>处理</Button>
        )}
      </Space>
    )},
  ];

  // 筛选数据
  const filteredData = executionData.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchText.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchText.toLowerCase()) ||
                          item.taskId.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    const matchesMachine = machineFilter ? item.machine === machineFilter : true;
    const matchesDate = dateRange && item.startTime ? 
      (moment(item.startTime).isBetween(dateRange[0], dateRange[1])) : 
      true;

    return matchesSearch && matchesStatus && matchesMachine && matchesDate;
  });

  // 效率趋势图配置
  const efficiencyConfig = {
    data: efficiencyData,
    xField: 'date',
    yField: 'efficiency',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    tooltip: {
      formatter: (datum) => {
        return {
          name: datum.date,
          value: `${datum.efficiency}%`,
        };
      },
    },
  };

  return (
    <div className="production-execution-container">
      <Card title="生产执行管理" variant="plain" className="page-card">
        <div className="dashboard-stats" style={{ marginBottom: 20 }}>
          <Row gutter={16}>
            <Col span={6}>
              <Card variant="plain" className="stat-card">
                <Statistic title="总计划数量" value={18000} />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="plain" className="stat-card">
                <Statistic title="已完成数量" value={13000} />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="plain" className="stat-card">
                <Statistic title="平均良品率" value={98.2} suffix="%" />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="plain" className="stat-card">
                <Statistic title="平均效率" value={97.5} suffix="%" />
              </Card>
            </Col>
          </Row>
        </div>

        <Card title="生产效率趋势" variant="plain" style={{ marginBottom: 20, height: 250 }}>
          <div className="chart-container" style={{ height: '100%', padding: '10px 0' }}>
            <Line {...efficiencyConfig} />
          </div>
        </Card>

        <div className="table-controls">
          <Row gutter={16} align="middle">
            <Col span={7}>
              <Input
                placeholder="搜索产品名称、执行ID或任务ID"
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
                {Object.entries(statusText).map(([value, text]) => (
                  <Option key={value} value={value}>{text}</Option>
                ))}
              </Select>
            </Col>
            <Col span={5}>
              <Select
                placeholder="选择机器"
                allowClear
                style={{ width: '100%' }}
                value={machineFilter}
                onChange={handleMachineChange}
              >
                <Option value="">全部机器</Option>
                {machineOptions}
              </Select>
            </Col>
            <Col span={5}>
              <RangePicker
                placeholder={['开始日期', '结束日期']}
                format="YYYY-MM-DD"
                value={dateRange}
                onChange={handleDateRangeChange}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={2}>
              <Space size="small">
                <Button onClick={resetFilters} icon={<FilterOutlined />} size="middle">重置</Button>
                <Button onClick={toggleAutoRefresh} icon={autoRefresh ? <ReloadOutlined spin /> : <ReloadOutlined />} size="middle"></Button>
              </Space>
            </Col>
          </Row>
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

export default ProductionExecution;