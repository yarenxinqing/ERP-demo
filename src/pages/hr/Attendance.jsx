import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, DatePicker, message, Popconfirm } from 'antd';
import { SearchOutlined, ReloadOutlined, ExportOutlined, CalendarOutlined, FilterOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Attendance = () => {
  // 模拟数据
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState([moment().startOf('month'), moment().endOf('month')]);

  // 模拟考勤数据
  const generateMockData = () => {
    const departments = ['技术部', '财务部', '销售部', '人力资源部', '行政部', '生产部'];
    const statuses = ['normal', 'late', 'early_leave', 'absent', 'business_trip', 'sick_leave', 'personal_leave'];
    const statusLabels = {
      normal: '正常',
      late: '迟到',
      early_leave: '早退',
      absent: '旷工',
      business_trip: '出差',
      sick_leave: '病假',
      personal_leave: '事假'
    };
    const statusColors = {
      normal: 'success',
      late: 'warning',
      early_leave: 'warning',
      absent: 'error',
      business_trip: 'processing',
      sick_leave: 'default',
      personal_leave: 'default'
    };

    return Array.from({ length: 20 }, (_, i) => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      const workDate = moment(dateRange[0]).add(Math.floor(Math.random() * (dateRange[1].diff(dateRange[0], 'days') + 1)), 'days').format('YYYY-MM-DD');
      
      // 生成随机打卡时间
      const checkinHour = status === 'absent' ? null : 8 + Math.floor(Math.random() * 4);
      const checkinMinute = status === 'absent' ? null : Math.floor(Math.random() * 60);
      const checkoutHour = status === 'absent' ? null : 17 + Math.floor(Math.random() * 3);
      const checkoutMinute = status === 'absent' ? null : Math.floor(Math.random() * 60);
      
      // 格式化时间
      const formatTime = (hour, minute) => hour === null ? '-' : `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      // 计算工作时长
      const workHours = status === 'absent' ? '0小时' : status === 'business_trip' ? '8小时' : 
        `${((checkoutHour - checkinHour) + (checkoutMinute - checkinMinute)/60).toFixed(1)}小时`;
      
      return ({
        id: `att-${30000 + i}`,
        employeeId: `emp-${10000 + i}`,
        name: `员工${String.fromCharCode(65 + i % 26)}${i}`,
        department: department,
        workDate: workDate,
        checkinTime: formatTime(checkinHour, checkinMinute),
        checkoutTime: formatTime(checkoutHour, checkoutMinute),
        workHours: workHours,
        status: status,
        statusLabel: statusLabels[status],
        statusColor: statusColors[status],
        remark: status === 'normal' ? '-' : `${statusLabels[status]}${Math.random() > 0.5 ? '，已审批' : ''}`
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
      message.success('考勤数据已刷新');
    }, 800);
  };

  // 导出数据
  const handleExport = () => {
    message.success('考勤数据导出成功');
  };

  // 搜索处理
  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('搜索完成');
    }, 500);
  };

  // 日期范围变化
  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
      setLoading(true);
      setTimeout(() => {
        setDataSource(generateMockData());
        setLoading(false);
        message.success(`已加载${dates[0].format('YYYY-MM-DD')}至${dates[1].format('YYYY-MM-DD')}的考勤数据`);
      }, 800);
    }
  };

  // 表格列配置
  const columns = [
    {
      title: '考勤ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '员工ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
      width: 100,
    },
    {
      title: '员工姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
      width: 120,
    },
    {
      title: '考勤日期',
      dataIndex: 'workDate',
      key: 'workDate',
      width: 110,
    },
    {
      title: '签到时间',
      dataIndex: 'checkinTime',
      key: 'checkinTime',
      width: 110,
    },
    {
      title: '签退时间',
      dataIndex: 'checkoutTime',
      key: 'checkoutTime',
      width: 110,
    },
    {
      title: '工作时长',
      dataIndex: 'workHours',
      key: 'workHours',
      width: 100,
    },
    {
      title: '考勤状态',
      dataIndex: 'statusLabel',
      key: 'status',
      width: 100,
      render: (text, record) => (
        <Tag color={record.statusColor}>{text}</Tag>
      ),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small">详情</Button>
          <Button type="link" size="small">编辑</Button>
          <Popconfirm
            title="确定要删除此考勤记录吗?"
            onConfirm={() => message.success('删除成功')}
            okText="是"
            cancelText="否"
          >
            <Button type="link" danger size="small">删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="attendance-page">
      <div className="table-operations" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <Space size="middle">
          <Input
            placeholder="搜索员工姓名/ID"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: 250 }}
            prefix={<SearchOutlined />}
          />
          <RangePicker
            value={dateRange}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            placeholder={['开始日期', '结束日期']}
            style={{ width: 300 }}
          />
        </Space>
        <Space size="middle">
          <Button icon={<ReloadOutlined />} onClick={handleRefresh}>刷新</Button>
          <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>导出报表</Button>
          <Button type="primary" icon={<CalendarOutlined />}>排班管理</Button>
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

export default Attendance;