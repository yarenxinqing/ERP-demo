import React, { useState } from 'react';
import { Card, Tabs, DatePicker, Button, Select, Table, Space, Tag, message } from 'antd';
import { DownloadOutlined, ReloadOutlined, FilterOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Line } from '@ant-design/plots';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const FinancialStatements = () => {
  // 状态管理
  const [dateRange, setDateRange] = useState([moment().subtract(6, 'months'), moment()]);
  const [statementType, setStatementType] = useState('balance');
  const [periodType, setPeriodType] = useState('monthly');

  // 模拟财务数据 - 资产负债表
  const balanceSheetData = [
    { category: '流动资产', items: [
      { name: '货币资金', amount: 1250000, prevAmount: 1100000 },
      { name: '应收账款', amount: 850000, prevAmount: 750000 },
      { name: '存货', amount: 680000, prevAmount: 720000 },
      { name: '其他流动资产', amount: 120000, prevAmount: 100000 },
      { name: '流动资产合计', amount: 2900000, prevAmount: 2670000, isTotal: true }
    ]},
    { category: '非流动资产', items: [
      { name: '固定资产', amount: 1500000, prevAmount: 1500000 },
      { name: '无形资产', amount: 350000, prevAmount: 400000 },
      { name: '长期投资', amount: 800000, prevAmount: 700000 },
      { name: '非流动资产合计', amount: 2650000, prevAmount: 2600000, isTotal: true }
    ]},
    { category: '资产总计', items: [
      { name: '资产总计', amount: 5550000, prevAmount: 5270000, isTotal: true, isGrandTotal: true }
    ]},
    { category: '流动负债', items: [
      { name: '应付账款', amount: 650000, prevAmount: 600000 },
      { name: '短期借款', amount: 500000, prevAmount: 500000 },
      { name: '其他流动负债', amount: 150000, prevAmount: 120000 },
      { name: '流动负债合计', amount: 1300000, prevAmount: 1220000, isTotal: true }
    ]},
    { category: '非流动负债', items: [
      { name: '长期借款', amount: 1000000, prevAmount: 1000000 },
      { name: '应付债券', amount: 500000, prevAmount: 500000 },
      { name: '非流动负债合计', amount: 1500000, prevAmount: 1500000, isTotal: true }
    ]},
    { category: '负债合计', items: [
      { name: '负债合计', amount: 2800000, prevAmount: 2720000, isTotal: true }
    ]},
    { category: '所有者权益', items: [
      { name: '实收资本', amount: 2000000, prevAmount: 2000000 },
      { name: '资本公积', amount: 350000, prevAmount: 350000 },
      { name: '未分配利润', amount: 400000, prevAmount: 200000 },
      { name: '所有者权益合计', amount: 2750000, prevAmount: 2550000, isTotal: true }
    ]},
    { category: '负债和所有者权益总计', items: [
      { name: '负债和所有者权益总计', amount: 5550000, prevAmount: 5270000, isTotal: true, isGrandTotal: true }
    ]}
  ];

  // 模拟财务数据 - 利润表
  const incomeStatementData = [
    { category: '营业收入', items: [
      { name: '主营业务收入', amount: 2500000, prevAmount: 2200000 },
      { name: '其他业务收入', amount: 300000, prevAmount: 250000 },
      { name: '营业收入合计', amount: 2800000, prevAmount: 2450000, isTotal: true }
    ]},
    { category: '营业成本', items: [
      { name: '主营业务成本', amount: 1500000, prevAmount: 1350000 },
      { name: '其他业务成本', amount: 150000, prevAmount: 120000 },
      { name: '营业成本合计', amount: 1650000, prevAmount: 1470000, isTotal: true }
    ]},
    { category: '营业利润', items: [
      { name: '销售费用', amount: -350000, prevAmount: -320000 },
      { name: '管理费用', amount: -280000, prevAmount: -250000 },
      { name: '财务费用', amount: -50000, prevAmount: -45000 },
      { name: '营业利润', amount: 470000, prevAmount: 365000, isTotal: true }
    ]},
    { category: '利润总额', items: [
      { name: '营业外收入', amount: 30000, prevAmount: 25000 },
      { name: '营业外支出', amount: -15000, prevAmount: -10000 },
      { name: '利润总额', amount: 485000, prevAmount: 380000, isTotal: true }
    ]},
    { category: '净利润', items: [
      { name: '所得税费用', amount: -121250, prevAmount: -95000 },
      { name: '净利润', amount: 363750, prevAmount: 285000, isTotal: true, isGrandTotal: true }
    ]}
  ];

  // 模拟财务数据 - 现金流量表
  const cashFlowData = [
    { category: '经营活动现金流量', items: [
      { name: '销售商品、提供劳务收到的现金', amount: 2900000, prevAmount: 2600000 },
      { name: '收到的税费返还', amount: 35000, prevAmount: 30000 },
      { name: '购买商品、接受劳务支付的现金', amount: -1600000, prevAmount: -1450000 },
      { name: '支付给职工以及为职工支付的现金', amount: -450000, prevAmount: -400000 },
      { name: '支付的各项税费', amount: -120000, prevAmount: -100000 },
      { name: '经营活动产生的现金流量净额', amount: 765000, prevAmount: 680000, isTotal: true }
    ]},
    { category: '投资活动现金流量', items: [
      { name: '收回投资收到的现金', amount: 150000, prevAmount: 100000 },
      { name: '取得投资收益收到的现金', amount: 40000, prevAmount: 30000 },
      { name: '购建固定资产支付的现金', amount: -350000, prevAmount: -300000 },
      { name: '投资活动产生的现金流量净额', amount: -160000, prevAmount: -170000, isTotal: true }
    ]},
    { category: '筹资活动现金流量', items: [
      { name: '取得借款收到的现金', amount: 500000, prevAmount: 400000 },
      { name: '偿还债务支付的现金', amount: -300000, prevAmount: -250000 },
      { name: '分配股利、利润支付的现金', amount: -120000, prevAmount: -100000 },
      { name: '筹资活动产生的现金流量净额', amount: 80000, prevAmount: 50000, isTotal: true }
    ]},
    { category: '现金及现金等价物净增加额', items: [
      { name: '现金及现金等价物净增加额', amount: 685000, prevAmount: 560000, isTotal: true, isGrandTotal: true },
      { name: '期初现金及现金等价物余额', amount: 565000, prevAmount: 450000 },
      { name: '期末现金及现金等价物余额', amount: 1250000, prevAmount: 1010000, isTotal: true }
    ]}
  ];

  // 图表数据
  const chartData = [
    { month: '1月', revenue: 210000, profit: 65000 },
    { month: '2月', revenue: 190000, profit: 58000 },
    { month: '3月', revenue: 230000, profit: 72000 },
    { month: '4月', revenue: 245000, profit: 78000 },
    { month: '5月', revenue: 260000, profit: 82000 },
    { month: '6月', revenue: 280000, profit: 90000 },
  ];

  // 图表配置
  const lineConfig = {
    data: chartData,
    xField: 'month',
    yField: ['revenue', 'profit'],
    yAxis: [
      { name: '销售额', min: 0 },
      { name: '利润', min: 0, grid: { stroke: '#f0f0f0' } },
    ],
    legend: { position: 'top' },
    smooth: true,
  };

  // 处理日期范围变化
  const handleDateRangeChange = (dates) => {
    if (dates) {
      setDateRange(dates);
    }
  };

  // 处理期间类型变化
  const handlePeriodChange = (value) => {
    setPeriodType(value);
  };

  // 刷新数据
  const handleRefresh = () => {
    message.success('报表数据已刷新');
  };

  // 导出报表
  const handleExport = () => {
    message.success('报表导出成功');
  };

  // 渲染财务报表表格
  const renderStatementTable = (data) => (
    <div className="statement-table-container">
      {data.map((category, index) => (
        <div key={index} className="category-section">
          <h4 style={{ marginTop: '16px', marginBottom: '8px', color: '#1890ff' }}>{category.category}</h4>
          <Table
            columns={[
              { title: '项目', dataIndex: 'name', key: 'name', render: (text, record) => (
                <span style={{ fontWeight: record.isTotal ? 'bold' : 'normal' }}>{text}</span>
              )},
              { title: '本期金额', dataIndex: 'amount', key: 'amount', render: (amount, record) => (
                <span style={{ 
                  fontWeight: record.isTotal ? 'bold' : 'normal',
                  color: record.isGrandTotal ? '#f5222d' : 'inherit'
                }}>
                  {amount >= 0 ? `￥${amount.toLocaleString()}` : `(￥${Math.abs(amount).toLocaleString()})`}
                </span>
              )},
              { title: '上期金额', dataIndex: 'prevAmount', key: 'prevAmount', render: (amount) => (
                amount >= 0 ? `￥${amount.toLocaleString()}` : `(￥${Math.abs(amount).toLocaleString()})`
              )},
              { title: '变动', key: 'change', render: (_, record) => {
                if (record.prevAmount === 0) return '-';
                const changeRate = ((record.amount - record.prevAmount) / record.prevAmount) * 100;
                return (
                  <Tag color={changeRate >= 0 ? 'green' : 'red'}>
                    {changeRate >= 0 ? '+' : ''}{changeRate.toFixed(2)}%
                  </Tag>
                );
              }}
            ]}
            dataSource={category.items}
            pagination={false}
            rowKey={(record, rowIndex) => `${index}-${rowIndex}`}
            size="middle"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="financial-statements">
      <div className="page-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>财务报表</h2>
        <Space>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>导出报表</Button>
          <Button icon={<ReloadOutlined />} onClick={handleRefresh}>刷新数据</Button>
        </Space>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>报表期间:</span>
            <RangePicker
              value={dateRange}
              onChange={handleDateRangeChange}
              style={{ width: 300 }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>期间类型:</span>
            <Select
              value={periodType}
              onChange={handlePeriodChange}
              style={{ width: 160 }}
            >
              <Option value="monthly">月度</Option>
              <Option value="quarterly">季度</Option>
              <Option value="yearly">年度</Option>
            </Select>
          </div>
          <Button icon={<FilterOutlined />} style={{ marginLeft: 'auto' }}>高级筛选</Button>
        </div>
      </Card>

      <Card>
        <Tabs defaultActiveKey="balance" onChange={(key) => setStatementType(key)}>
          <TabPane tab="资产负债表" key="balance">
            {renderStatementTable(balanceSheetData)}            
          </TabPane>
          <TabPane tab="利润表" key="income">
            {renderStatementTable(incomeStatementData)}            
          </TabPane>
          <TabPane tab="现金流量表" key="cashflow">
            {renderStatementTable(cashFlowData)}            
          </TabPane>
          <TabPane tab="趋势分析" key="trend">
            <div style={{ marginBottom: 24 }}>
              <h4>营业收入与利润趋势</h4>
              <Line {...lineConfig} />
            </div>
            <Card title="关键财务指标">
              <Table
                columns={[
                  { title: '指标名称', dataIndex: 'name', key: 'name' },
                  { title: '本期', dataIndex: 'current', key: 'current' },
                  { title: '上期', dataIndex: 'previous', key: 'previous' },
                  { title: '变动', dataIndex: 'change', key: 'change', render: (text, record) => (
                    <Tag color={record.change >= 0 ? 'green' : 'red'}>
                      {record.change >= 0 ? '+' : ''}{record.change}%
                    </Tag>
                  )}
                ]}
                dataSource={[
                  { key: 1, name: '资产负债率', current: '49.91%', previous: '51.61%', change: -1.70 },
                  { key: 2, name: '毛利率', current: '41.07%', previous: '44.08%', change: -3.01 },
                  { key: 3, name: '净利率', current: '12.99%', previous: '11.63%', change: 1.36 },
                  { key: 4, name: '流动比率', current: '2.23', previous: '2.19', change: 1.83 },
                  { key: 5, name: '速动比率', current: '1.77', previous: '1.73', change: 2.31 },
                ]}
                pagination={false}
              />
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default FinancialStatements;