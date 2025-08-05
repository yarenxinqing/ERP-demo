import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, DatePicker, message } from 'antd';
import { SearchOutlined, ReloadOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Recruitment = () => {
  // 模拟数据
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // 模拟招聘数据
  const generateMockData = () => {
    const positions = ['前端开发工程师', '后端开发工程师', 'UI设计师', '产品经理', '测试工程师', '人力资源专员', '财务分析师', '销售代表'];
    const departments = ['技术部', '产品部', '设计部', '人力资源部', '财务部', '销售部'];
    const statuses = ['pending', 'interviewing', 'offered', 'hired', 'rejected'];
    const statusLabels = {
      pending: '待面试',
      interviewing: '面试中',
      offered: '已发offer',
      hired: '已入职',
      rejected: '已拒绝'
    };
    const statusColors = {
      pending: 'default',
      interviewing: 'processing',
      offered: 'warning',
      hired: 'success',
      rejected: 'error'
    };

    return Array.from({ length: 15 }, (_, i) => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const applyDate = moment().subtract(Math.floor(Math.random() * 60), 'days').format('YYYY-MM-DD');
      const interviewDate = status !== 'pending' ? moment(applyDate).add(Math.floor(Math.random() * 10), 'days').format('YYYY-MM-DD') : '';
      const offerDate = ['offered', 'hired'].includes(status) ? moment(interviewDate).add(Math.floor(Math.random() * 5), 'days').format('YYYY-MM-DD') : '';
      const hireDate = status === 'hired' ? moment(offerDate).add(Math.floor(Math.random() * 15), 'days').format('YYYY-MM-DD') : '';

      return ({
        id: `rec-${20000 + i}`,
        candidateName: `候选人${String.fromCharCode(65 + i % 26)}${i}`,
        position: positions[Math.floor(Math.random() * positions.length)],
        department: departments[Math.floor(Math.random() * departments.length)],
        applyDate: applyDate,
        interviewDate: interviewDate,
        offerDate: offerDate,
        hireDate: hireDate,
        status: status,
        statusLabel: statusLabels[status],
        statusColor: statusColors[status],
        source: ['智联招聘', '前程无忧', 'BOSS直聘', '内部推荐', '校园招聘'][Math.floor(Math.random() * 5)],
        expectedSalary: (8000 + Math.random() * 32000).toFixed(0),
        phone: `13${Math.floor(Math.random() * 900000000) + 100000000}`,
        email: `candidate${i}@example.com`,
        experience: `${Math.floor(Math.random() * 10) + 1}年`,
        interviewer: `面试官${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`
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
      message.success('招聘数据已刷新');
    }, 800);
  };

  // 导出数据
  const handleExport = () => {
    message.success('招聘数据导出成功');
  };

  // 添加职位
  const handleAddPosition = () => {
    message.info('打开新增职位表单');
    // 实际应用中这里会打开新增职位模态框
  };

  // 搜索处理
  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('搜索完成');
    }, 500);
  };

  // 表格列配置
  const columns = [
    {
      title: '申请ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '候选人姓名',
      dataIndex: 'candidateName',
      key: 'candidateName',
      width: 120,
    },
    {
      title: '应聘职位',
      dataIndex: 'position',
      key: 'position',
      width: 160,
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
      width: 120,
    },
    {
      title: '申请日期',
      dataIndex: 'applyDate',
      key: 'applyDate',
      width: 110,
    },
    {
      title: '面试日期',
      dataIndex: 'interviewDate',
      key: 'interviewDate',
      width: 110,
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
      title: '招聘渠道',
      dataIndex: 'source',
      key: 'source',
      width: 120,
    },
    {
      title: '期望薪资',
      dataIndex: 'expectedSalary',
      key: 'expectedSalary',
      width: 110,
      render: (salary) => `￥${salary}`,
    },
    {
      title: '工作经验',
      dataIndex: 'experience',
      key: 'experience',
      width: 100,
    },
    {
      title: '面试官',
      dataIndex: 'interviewer',
      key: 'interviewer',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small">查看简历</Button>
          <Button type="link" size="small">安排面试</Button>
          <Button type="link" size="small">发送offer</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="recruitment-page">
      <div className="table-operations" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space size="middle">
          <Input
            placeholder="搜索候选人姓名/职位"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
        </Space>
        <Space size="middle">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPosition}>新增职位</Button>
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

export default Recruitment;