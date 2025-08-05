import React from 'react';
import { Card, Table, DatePicker, Select, Space, Progress } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment';

// 模拟采购报表数据
const generatePurchaseData = () => {
  const data = [];
  const categories = ['原材料', '设备', '办公用品', '服务', '其他'];
  
  for (let i = 0; i < categories.length; i++) {
    const lastQuarter = Math.floor(Math.random() * 50000) + 30000;
    const currentQuarter = lastQuarter * (1 + (Math.random() * 0.3 - 0.1)); // 随机波动-10%~+20%
    const growth = ((currentQuarter - lastQuarter) / lastQuarter * 100).toFixed(2);
    const budget = lastQuarter * 1.2;
    const usage = (currentQuarter / budget * 100).toFixed(2);
    
    data.push({
      key: i + 1,
      category: categories[i],
      lastQuarter: lastQuarter.toLocaleString(),
      currentQuarter: currentQuarter.toLocaleString(),
      growth: growth,
      budget: budget.toLocaleString(),
      usage: usage,
      suppliers: Math.floor(Math.random() * 10) + 3,
      avgPrice: (Math.random() * 1000 + 100).toFixed(2),
    });
  }
  
  return data;
};

const PurchaseReport = () => {
  const [purchaseData, setPurchaseData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([moment().subtract(3, 'months').startOf('month'), moment().endOf('month')]);
  const [groupBy, setGroupBy] = React.useState('category');

  React.useEffect(() => {
    // 加载采购报表数据
    setPurchaseData(generatePurchaseData());
  }, []);

  // 表格列配置
  const columns = [
    { title: '采购类别', dataIndex: 'category', key: 'category' },
    { title: '上季度采购额', dataIndex: 'lastQuarter', key: 'lastQuarter' },
    { title: '本季度采购额', dataIndex: 'currentQuarter', key: 'currentQuarter' },
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
    { title: '季度预算', dataIndex: 'budget', key: 'budget' },
    {
      title: '预算使用率',
      dataIndex: 'usage',
      key: 'usage',
      render: (usage) => (
        <Space>
          <span>{usage}%</span>
          <Progress percent={Number(usage)} size="small" status={usage > 100 ? 'exception' : 'active'} />
        </Space>
      ),
    },
    { title: '供应商数量', dataIndex: 'suppliers', key: 'suppliers' },
    { title: '平均单价', dataIndex: 'avgPrice', key: 'avgPrice', render: (price) => `¥${price}` },
  ];

  return (
    <div className="purchase-report-container">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>采购报表</h2>
        <Space size="middle">
          <DatePicker.RangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder={['开始日期', '结束日期']}
          />
          <Select
            value={groupBy}
            onChange={setGroupBy}
            options={[
              { value: 'category', label: '按类别' },
              { value: 'supplier', label: '按供应商' },
            ]}
          />
        </Space>
      </div>

      <Card title="采购成本分析">
        <Table
          columns={columns}
          dataSource={purchaseData}
          pagination={false}
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export default PurchaseReport;