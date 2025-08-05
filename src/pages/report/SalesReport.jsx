import React from 'react';
import { Card, Table, DatePicker, Select, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment';

// 模拟销售报表数据
const generateSalesData = () => {
  const data = [];
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  
  for (let i = 0; i < 12; i++) {
    const lastYear = Math.floor(Math.random() * 100000) + 50000;
    const thisYear = lastYear * (1 + (Math.random() * 0.4 - 0.1)); // 随机波动-10%~+30%
    const growth = ((thisYear - lastYear) / lastYear * 100).toFixed(2);
    
    data.push({
      key: i + 1,
      month: months[i],
      lastYear: lastYear.toLocaleString(),
      thisYear: thisYear.toLocaleString(),
      growth: growth,
      target: (thisYear * (1 + Math.random() * 0.2)).toLocaleString(),
      completion: ((thisYear / (thisYear * (1 + Math.random() * 0.2))) * 100).toFixed(2),
    });
  }
  
  return data;
};

const SalesReport = () => {
  const [salesData, setSalesData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([moment().startOf('year'), moment().endOf('year')]);
  const [dimension, setDimension] = React.useState('month');

  React.useEffect(() => {
    // 加载销售报表数据
    setSalesData(generateSalesData());
  }, []);

  // 表格列配置
  const columns = [
    { title: '周期', dataIndex: dimension === 'month' ? 'month' : 'quarter', key: 'period' },
    { title: '去年同期', dataIndex: 'lastYear', key: 'lastYear' },
    { title: '今年累计', dataIndex: 'thisYear', key: 'thisYear' },
    {
      title: '同比增长',
      dataIndex: 'growth',
      key: 'growth',
      render: (growth) => (
        <span style={{ color: growth >= 0 ? '#00b42a' : '#f53f3f' }}>
          {growth >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(growth)}%
        </span>
      ),
    },
    { title: '目标值', dataIndex: 'target', key: 'target' },
    {
      title: '完成率',
      dataIndex: 'completion',
      key: 'completion',
      render: (completion) => (
        <span>{completion}%</span>
      ),
    },
  ];

  return (
    <div className="sales-report-container">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>销售报表</h2>
        <Space size="middle">
          <DatePicker.RangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder={['开始日期', '结束日期']}
          />
          <Select
            value={dimension}
            onChange={setDimension}
            options={[
              { value: 'month', label: '按月查看' },
              { value: 'quarter', label: '按季度查看' },
            ]}
          />
        </Space>
      </div>

      <Card title="销售业绩分析">
        <Table
          columns={columns}
          dataSource={salesData}
          pagination={false}
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export default SalesReport;