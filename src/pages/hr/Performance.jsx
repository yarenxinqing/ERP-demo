import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Tag, Card, Select, DatePicker, message, Progress, Popconfirm } from 'antd';
import { SearchOutlined, ReloadOutlined, ExportOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Performance = () => {
  // 模拟数据
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [cycleFilter, setCycleFilter] = useState('quarter');

  // 模拟绩效数据
  const generateMockData = () => {
    const departments = ['技术部', '财务部', '销售部', '人力资源部', '行政部', '生产部'];
    const positions = ['经理', '主管', '专员', '助理', '高级工程师', '设计师'];
    const cycles = ['2023-Q1', '2023-Q2', '2023-Q3', '2023-Q4', '2024-Q1'];
    const ratings = ['excellent', 'good', 'average', 'poor'];
    const ratingLabels = {
      excellent: '优秀',
      good: '良好',
      average: '一般',
      poor: '待改进'
    };
    const ratingColors = {
      excellent: '#52c41a',
      good: '#faad14',
      average: '#fa8c16',
      poor: '#f5222d'
    };
    const ratingScores = {
      excellent: 90 + Math.floor(Math.random() * 10),
      good: 80 + Math.floor(Math.random() * 10),
      average: 70 + Math.floor(Math.random() * 10),
      poor: 60 + Math.floor(Math.random() * 10)
    };

    return Array.from({ length: 18 }, (_, i) => {
      const rating = ratings[Math.floor(Math.random() * ratings.length)];
      const score = ratingScores[rating];
      const cycle = cycles[Math.floor(Math.random() * cycles.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      const assessDate = moment().subtract(Math.floor(Math.random() * 60), 'days').format('YYYY-MM-DD');
      const nextReviewDate = moment().add(Math.floor(Math.random() * 90), 'days').format('YYYY-MM-DD');

      return ({
        id: `perf-${40000 + i}`,
        employeeId: `emp-${10000 + i}`,
        name: `员工${String.fromCharCode(65 + i % 26)}${i}`,
        department: department,
        position: positions[Math.floor(Math.random() * positions.length)],
        cycle: cycle,
        assessDate: assessDate,
        nextReviewDate: nextReviewDate,
        rating: rating,
        ratingLabel: ratingLabels[rating],
        ratingColor: ratingColors[rating],
        score: score,
        assessor: `评估人${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
        objectives: Math.floor(Math.random() * 5) + 3,
        completedObjectives: Math.floor(Math.random() * 5) + 1,
        strengths: ['团队协作能力强', '执行力高', '创新思维', '责任心强', '专业技能突出'][Math.floor(Math.random() * 5)],
        improvements: ['沟通技巧', '时间管理', '专业知识', '领导力', '项目管理'][Math.floor(Math.random() * 5)],
        bonus: rating === 'excellent' ? (5000 + Math.random() * 5000).toFixed(0) : rating === 'good' ? (2000 + Math.random() * 3000).toFixed(0) : rating === 'average' ? (0 + Math.random() * 2000).toFixed(0) : 0
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
      message.success('绩效数据已刷新');
    }, 800);
  };

  // 导出数据
  const handleExport = () => {
    message.success('绩效数据导出成功');
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
      title: '绩效ID',
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
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      width: 120,
    },
    {
      title: '评估周期',
      dataIndex: 'cycle',
      key: 'cycle',
      width: 110,
    },
    {
      title: '评估日期',
      dataIndex: 'assessDate',
      key: 'assessDate',
      width: 110,
    },
    {
      title: '绩效得分',
      dataIndex: 'score',
      key: 'score',
      width: 120,
      render: (score) => (
        <div>
          <span>{score}分</span>
          <Progress percent={score} size="small" status={score >= 80 ? 'success' : score >= 60 ? 'active' : 'exception'} />
        </div>
      ),
    },
    {
      title: '绩效等级',
      dataIndex: 'ratingLabel',
      key: 'rating',
      width: 100,
      render: (text, record) => (
        <Tag color={record.ratingColor}>{text}</Tag>
      ),
    },
    {
      title: '评估人',
      dataIndex: 'assessor',
      key: 'assessor',
      width: 100,
    },
    {
      title: '目标完成率',
      key: 'completionRate',
      width: 140,
      render: (_, record) => {
        const rate = Math.round((record.completedObjectives / record.objectives) * 100);
        return (
          <div>
            <span>{rate}%</span>
            <Progress percent={rate} size="small" />
          </div>
        );
      },
    },
    {
      title: '绩效奖金',
      dataIndex: 'bonus',
      key: 'bonus',
      width: 110,
      render: (bonus) => bonus > 0 ? `￥${bonus}` : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />}>查看报告</Button>
          <Button type="link" size="small" icon={<EditOutlined />}>编辑评估</Button>
          <Popconfirm
            title="确定要删除此绩效记录吗?"
            onConfirm={() => message.success('删除成功')}
            okText="是"
            cancelText="否"
          >
            <Button type="link" danger size="small">删除</Button>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  return (
    <div className="performance-page">
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
          <Select
            defaultValue={cycleFilter}
            style={{ width: 160 }}
            onChange={(value) => setCycleFilter(value)}
          >
            <Option value="quarter">季度评估</Option>
            <Option value="halfyear">半年度评估</Option>
            <Option value="year">年度评估</Option>
          </Select>
        </Space>
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />}>发起评估</Button>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh}>刷新</Button>
          <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>导出报表</Button>
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

export default Performance;