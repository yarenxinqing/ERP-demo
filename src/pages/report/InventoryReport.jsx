import React from 'react';
import { Card, Table, DatePicker, Select, Space, Badge } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

// 模拟库存报表数据
const generateInventoryData = () => {
  const data = [];
  const categories = ['电子产品', '办公用品', '原材料', '成品', '耗材'];
  const warehouses = ['总仓', '华东仓', '华南仓', '华北仓'];
  
  for (let i = 0; i < 8; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const warehouse = warehouses[Math.floor(Math.random() * warehouses.length)];
    const quantity = Math.floor(Math.random() * 1000) + 100;
    const safeStock = Math.floor(quantity * 0.3);
    const turnoverRate = (Math.random() * 5 + 1).toFixed(2);
    const status = quantity > safeStock ? 'normal' : 'warning';
    const lastUpdated = moment().subtract(Math.floor(Math.random() * 30), 'days').format('YYYY-MM-DD');
    
    data.push({
      key: i + 1,
      category,
      warehouse,
      product: `${category}-${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}`,
      quantity,
      safeStock,
      turnoverRate,
      status,
      lastUpdated,
      value: (quantity * (Math.random() * 100 + 50)).toLocaleString(),
    });
  }
  
  return data;
};

const InventoryReport = () => {
  const [inventoryData, setInventoryData] = React.useState([]);
  const [dateRange, setDateRange] = React.useState([moment().startOf('month'), moment().endOf('month')]);
  const [warehouseFilter, setWarehouseFilter] = React.useState('all');

  React.useEffect(() => {
    // 加载库存报表数据
    setInventoryData(generateInventoryData());
  }, []);

  // 表格列配置
  const columns = [
    { title: '产品类别', dataIndex: 'category', key: 'category' },
    { title: '仓库', dataIndex: 'warehouse', key: 'warehouse' },
    { title: '产品编码', dataIndex: 'product', key: 'product' },
    { title: '当前库存', dataIndex: 'quantity', key: 'quantity' },
    { title: '安全库存', dataIndex: 'safeStock', key: 'safeStock' },
    {
      title: '库存状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        status === 'normal' ? (
          <Badge status="success" text={<><CheckCircleOutlined /> 正常</>} />
        ) : (
          <Badge status="warning" text={<><ExclamationCircleOutlined /> 低于安全库存</>} />
        )
      ),
    },
    { title: '周转率(次/月)', dataIndex: 'turnoverRate', key: 'turnoverRate' },
    { title: '库存价值', dataIndex: 'value', key: 'value', render: (value) => `¥${value}` },
    { title: '最后更新', dataIndex: 'lastUpdated', key: 'lastUpdated' },
  ];

  return (
    <div className="inventory-report-container">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>库存报表</h2>
        <Space size="middle">
          <DatePicker.RangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder={['开始日期', '结束日期']}
          />
          <Select
            value={warehouseFilter}
            onChange={setWarehouseFilter}
            options={[
              { value: 'all', label: '所有仓库' },
              { value: '总仓', label: '总仓' },
              { value: '华东仓', label: '华东仓' },
              { value: '华南仓', label: '华南仓' },
              { value: '华北仓', label: '华北仓' },
            ]}
          />
        </Space>
      </div>

      <Card title="库存水平分析">
        <Table
          columns={columns}
          dataSource={inventoryData}
          pagination={{ pageSize: 10 }}
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export default InventoryReport;