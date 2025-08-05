import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, DatePicker, Divider, message } from 'antd';
import { SearchOutlined, ReloadOutlined, ExportOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const CostManagement = () => {
  // 模拟数据
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [costTypeFilter, setCostTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);

  // 模拟成本管理数据
  const generateMockData = () => {
    const costTypes = ['material', 'labor', 'manufacturing', 'administrative', 'marketing'];
    const costTypeLabels = {
      material: '材料成本',
      labor: '人工成本',
      manufacturing: '制造费用',
      administrative: '管理费用',
      marketing: '销售费用'
    };

    return Array.from({ length: 12 }, (_, i) => ({
      id: `cost-${i + 1000}`,
      costType: costTypes[i % costTypes.length],
      costTypeName: costTypeLabels[costTypes[i % costTypes.length]],
      department: ['生产部', '财务部', '销售部', '研发部', '行政部'][Math.floor(Math.random() * 5)],
      amount: (5000 + Math.random() * 95000).toFixed(2),
      date: moment().subtract(i, 'days').format('YYYY-MM-DD'),
      project: `项目${String.fromCharCode(65 + i % 10)}`,
      status: ['planned', 'incurred', 'paid'][Math.floor(Math.random() * 3)],
      description: i % 3 === 0 ? '月度常规成本' : i % 3 === 1 ? '项目专项支出' : '临时费用'
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
    message.success('成本数据导出成功');
  };

  // 添加成本记录
  const handleAddCost = () => {
    message.info('打开新增成本记录表单');
    // 实际应用中这里会打开新增表单模态框
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
    setCostTypeFilter('all');
    setDateRange(null);
  };

  // 表格列配置
  const columns = [
    {
      title: '成本ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '成本类型',
      dataIndex: 'costTypeName',
      key: 'costTypeName',
      width: 120,
      filters: [
        { text: '材料成本', value: 'material' },
        { text: '人工成本', value: 'labor' },
        { text: '制造费用', value: 'manufacturing' },
        { text: '管理费用', value: 'administrative' },
        { text: '销售费用', value: 'marketing' },
      ],
      onFilter: (value, record) => record.costType === value,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 100,
    },
    {
      title: '金额 (元)',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount) => `￥${amount}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: '发生日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: '所属项目',
      dataIndex: 'project',
      key: 'project',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        let color = 'processing';
        let text = '计划中';
        if (status === 'incurred') {
          color = 'blue';
          text = '已发生';
        } else if (status === 'paid') {
          color = 'success';
          text = '已支付';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
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
    <div className="cost-management-page">
      <Card title="成本管理" variant="plain" className="page-card">
        <div className="table-operations" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space size="middle">
            <Input
              placeholder="搜索成本ID/部门/项目"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
            <Select
              placeholder="成本类型"
              value={costTypeFilter}
              onChange={(val) => setCostTypeFilter(val)}
              style={{ width: 160 }}
            >
              <Option value="all">全部类型</Option>
              <Option value="material">材料成本</Option>
              <Option value="labor">人工成本</Option>
              <Option value="manufacturing">制造费用</Option>
              <Option value="administrative">管理费用</Option>
              <Option value="marketing">销售费用</Option>
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
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCost}>新增成本</Button>
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

export default CostManagement;