import React from 'react';
import { Card, Table, DatePicker, Select, Space, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment';

// 模拟财务报表数据
const generateFinancialData = () => {
  const data = [];
  const items = ['营业收入', '营业成本', '销售费用', '管理费用', '财务费用', '营业利润', '利润总额', '净利润', '资产总额', '负债总额', '所有者权益'];
  
  for (let i = 0; i < items.length; i++) {
    const currentMonth = Math.floor(Math.random() * 500000) + 100000;
    const lastMonth = currentMonth * (1 + (Math.random() * 0.3 - 0.15)); // 随机波动-15%~+15%
    const growth = ((currentMonth - lastMonth) / lastMonth * 100).toFixed(2);
    const budgetRatio = (currentMonth / (lastMonth * 1.2) * 100).toFixed(2);
    
    data.push({
      key: i + 1,
      item: items[i],
      currentMonth: currentMonth.toLocaleString(),
      lastMonth: lastMonth.toLocaleString(),
      growth: growth,
      budgetRatio: budgetRatio,
      ytd: (currentMonth * (i + 1) * (0.8 + Math.random() * 0.4)).toLocaleString(),
      yoy: ((Math.random() * 20 + 5) * (Math.random() > 0.5 ? 1 : -1)).toFixed(2),
    });
  }
  
  return data;
};

const FinancialReport = () => {
  const [financialData, setFinancialData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([moment().startOf('month'), moment().endOf('month')]);
  const [periodType, setPeriodType] = React.useState('month');

  React.useEffect(() => {
    // 加载财务报表数据
    setFinancialData(generateFinancialData());
  }, []);

  // 表格列配置
  const columns = [
    { title: '财务指标', dataIndex: 'item', key: 'item' },
    { title: periodType === 'month' ? '本月金额' : '本季度金额', dataIndex: 'currentMonth', key: 'currentAmount' },
    { title: periodType === 'month' ? '上月金额' : '上季度金额', dataIndex: 'lastMonth', key: 'lastAmount' },
    {
      title: '环比增长',
      dataIndex: 'growth',
      key: 'growth',
      render: (growth) => (
        <span style={{ color: growth >= 0 ? '#00b42a' : '#f53f3f' }}>
          {growth >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(growth)}%
        </span>
      ),
    },
    {
      title: '预算达成率',
      dataIndex: 'budgetRatio',
      key: 'budgetRatio',
      render: (ratio) => (
        <Tag color={ratio >= 100 ? 'green' : ratio >= 80 ? 'blue' : 'orange'}>
          {ratio}%
        </Tag>
      ),
    },
    { title: '本年累计', dataIndex: 'ytd', key: 'ytd' },
    {
      title: '同比增长',
      dataIndex: 'yoy',
      key: 'yoy',
      render: (yoy) => (
        <span style={{ color: yoy >= 0 ? '#00b42a' : '#f53f3f' }}>
          {yoy >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(yoy)}%
        </span>
      ),
    },
  ];

  return (
    <div className="financial-report-container">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>财务报表</h2>
        <Space size="middle">
          <DatePicker.RangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder={['开始日期', '结束日期']}
          />
          <Select
            value={periodType}
            onChange={setPeriodType}
            options={[
              { value: 'month', label: '月度数据' },
              { value: 'quarter', label: '季度数据' },
            ]}
          />
        </Space>
      </div>

      <Card title="财务指标分析">
        <Table
          columns={columns}
          dataSource={financialData}
          pagination={false}
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export default FinancialReport;