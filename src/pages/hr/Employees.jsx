import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, DatePicker, Divider, message } from 'antd';
import { SearchOutlined, ReloadOutlined, ExportOutlined, PlusOutlined, FilterOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Employees = () => {
  // 模拟数据
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // 模拟员工数据
  const generateMockData = () => {
    const departments = ['技术部', '财务部', '销售部', '人力资源部', '行政部', '生产部'];
    const positions = ['经理', '主管', '专员', '助理', '实习生', '高级工程师', '设计师'];
    const statuses = ['active', 'on_leave', 'resigned', 'probation'];
    const statusLabels = {
      active: '在职',
      on_leave: '休假',
      resigned: '已离职',
      probation: '试用期'
    };
    const statusColors = {
      active: 'success',
      on_leave: 'processing',
      resigned: 'default',
      probation: 'warning'
    };

    return Array.from({ length: 15 }, (_, i) => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      return ({
        id: `emp-${10000 + i}`,
        name: `员工${String.fromCharCode(65 + i % 26)}${i}`,
        department: departments[Math.floor(Math.random() * departments.length)],
        position: positions[Math.floor(Math.random() * positions.length)],
        hireDate: moment().subtract(Math.floor(Math.random() * 1000), 'days').format('YYYY-MM-DD'),
        status: status,
        statusLabel: statusLabels[status],
        statusColor: statusColors[status],
        email: `employee${i}@example.com`,
        phone: `13${Math.floor(Math.random() * 900000000) + 100000000}`,
        salary: (5000 + Math.random() * 25000).toFixed(2)
      });
    });
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
    message.success('员工数据导出成功');
  };

  // 添加员工
  const handleAddEmployee = () => {
    message.info('打开新增员工表单');
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
    setDepartmentFilter('all');
    setStatusFilter('all');
  };

  // 表格列配置
  const columns = [
    {
      title: '员工ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 120,
      filters: [
            { text: '技术部', value: '技术部' },
            { text: '财务部', value: '财务部' },
            { text: '销售部', value: '销售部' },
            { text: '人力资源部', value: '人力资源部' },
            { text: '行政部', value: '行政部' },
            { text: '生产部', value: '生产部' }
          ],
          onFilter: (value, record) => record.department === value
        },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      width: 120,
    },
    {
      title: '入职日期',
      dataIndex: 'hireDate',
      key: 'hireDate',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'statusLabel',
      key: 'status',
      width: 100,
      render: (text, record) => (
        <Tag color={record.statusColor}>{text}</Tag>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 180,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '薪资(元)',
      dataIndex: 'salary',
      key: 'salary',
      width: 110,
      render: (salary) => `￥${salary}`,
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small">查看</Button>
          <Button type="link" size="small">编辑</Button>
          <Button type="link" danger size="small">离职</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="employees-page">
      <div className="table-operations" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space size="middle">
          <Input
            placeholder="搜索员工姓名/ID/邮箱"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
        </Space>
          <Space size="middle">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEmployee}>新增员工</Button>
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
      </div>
    );
  };

export default Employees;