import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Badge, Spin, Alert, Space, Typography, Layout, Statistic, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, WarningOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/plots';

const { Content } = Layout;
const { Title, Text } = Typography;

const InventoryMonitoring = () => {
  // 模拟库存监控数据
  const [inventoryData, setInventoryData] = useState([]);
  const [stockTrend, setStockTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  // 模拟API加载数据
  useEffect(() => {
    const timer = setTimeout(() => {
      // 库存趋势数据
      const trendData = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        stockLevel: Math.floor(Math.random() * 500) + 500,
      }));

      // 库存明细数据
      const inventoryItems = [
        { id: '1', productName: '笔记本电脑', sku: 'NB-2023-001', currentStock: 45, safeStock: 20, status: 'normal', warehouse: '主仓库', lastUpdated: '2023-10-20 09:30' },
        { id: '2', productName: '鼠标', sku: 'MS-2023-002', currentStock: 180, safeStock: 50, status: 'normal', warehouse: '备用仓库', lastUpdated: '2023-10-20 10:15' },
        { id: '3', productName: '键盘', sku: 'KB-2023-003', currentStock: 15, safeStock: 30, status: 'warning', warehouse: '主仓库', lastUpdated: '2023-10-20 11:45' },
        { id: '4', productName: '显示器', sku: 'MN-2023-004', currentStock: 8, safeStock: 15, status: 'danger', warehouse: '主仓库', lastUpdated: '2023-10-20 14:20' },
        { id: '5', productName: '打印机', sku: 'PR-2023-005', currentStock: 25, safeStock: 10, status: 'normal', warehouse: '备用仓库', lastUpdated: '2023-10-19 16:30' },
        { id: '6', productName: '投影仪', sku: 'PJ-2023-006', currentStock: 5, safeStock: 8, status: 'warning', warehouse: '主仓库', lastUpdated: '2023-10-19 09:15' },
      ];

      // 库存告警数据
      const alertItems = [
        { id: 'A1', productName: '键盘', sku: 'KB-2023-003', message: '库存低于安全阈值', level: 'warning', time: '2023-10-20 11:45' },
        { id: 'A2', productName: '显示器', sku: 'MN-2023-004', message: '库存严重不足', level: 'danger', time: '2023-10-20 14:20' },
        { id: 'A3', productName: '投影仪', sku: 'PJ-2023-006', message: '库存即将低于安全阈值', level: 'warning', time: '2023-10-19 09:15' },
      ];

      setStockTrend(trendData);
      setInventoryData(inventoryItems);
      setAlerts(alertItems);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // 库存状态标签配置
  const statusTag = (status) => {
    switch (status) {
      case 'normal':
        return <Tag color="success"><CheckCircleOutlined /> 正常</Tag>;
      case 'warning':
        return <Tag color="warning"><WarningOutlined /> 低库存</Tag>;
      case 'danger':
        return <Tag color="error"><ExclamationCircleOutlined /> 严重不足</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  };

  // 库存趋势图表配置
  const trendConfig = {
    data: stockTrend,
    xField: 'date',
    yField: 'stockLevel',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  // 库存表格列配置
  const inventoryColumns = [
    { title: '产品名称', dataIndex: 'productName', key: 'productName', sorter: (a, b) => a.productName.localeCompare(b.productName) },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: '当前库存', dataIndex: 'currentStock', key: 'currentStock', sorter: (a, b) => a.currentStock - b.currentStock },
    { title: '安全库存', dataIndex: 'safeStock', key: 'safeStock' },
    { title: '库存状态', dataIndex: 'status', key: 'status', render: status => statusTag(status) },
    { title: '仓库', dataIndex: 'warehouse', key: 'warehouse' },
    { title: '最后更新', dataIndex: 'lastUpdated', key: 'lastUpdated' },
  ];

  // 告警表格列配置
  const alertColumns = [
    { title: '产品名称', dataIndex: 'productName', key: 'productName' },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: '告警信息', dataIndex: 'message', key: 'message' },
    { title: '级别', dataIndex: 'level', key: 'level', render: level => (
      level === 'warning' ? <Badge status="warning" text="警告" /> : <Badge status="error" text="严重" />
    )},
    { title: '时间', dataIndex: 'time', key: 'time' },
  ];

  return (
    <Content style={{ padding: '0 24px', minHeight: 280 }}>
      <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
        <Title level={2}>库存监控中心</Title>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <Spin size="large" tip="加载库存监控数据中..." />
          </div>
        ) : (
          <>          
            {/* 库存概览统计 */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="总产品数量"
                    value={inventoryData.length}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="正常库存"
                    value={inventoryData.filter(item => item.status === 'normal').length}
                    prefix={<CheckCircleOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="低库存预警"
                    value={inventoryData.filter(item => item.status === 'warning').length}
                    prefix={<WarningOutlined />}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card>
                  <Statistic
                    title="严重库存不足"
                    value={inventoryData.filter(item => item.status === 'danger').length}
                    prefix={<ExclamationCircleOutlined />}
                    valueStyle={{ color: '#f5222d' }}
                  />
                </Card>
              </Col>
            </Row>

            {/* 库存趋势图表 */}
            <Card title="库存水平趋势 (最近30天)" style={{ marginBottom: 24 }}>
              <div style={{ height: 300 }}>
                <Line {...trendConfig} />
              </div>
            </Card>

            <Row gutter={[24, 24]}>
              {/* 库存状态表格 */}
              <Col xs={24} lg={16}>
                <Card title="库存状态明细">
                  <Table
                    columns={inventoryColumns}
                    dataSource={inventoryData}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                  />
                </Card>
              </Col>

              {/* 库存告警表格 */}
              <Col xs={24} lg={8}>
                <Card title="库存告警信息" variant="plain">
                  <Alert
                    message="库存告警"
                    description="显示库存异常情况，请及时处理"
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                  <Table
                    columns={alertColumns}
                    dataSource={alerts}
                    rowKey="id"
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    </Content>
  );
};

export default InventoryMonitoring;