import React from 'react';
import { Card, Row, Col, Table, Statistic, Tag, Space, Progress } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  StockOutlined
} from '@ant-design/icons';


// 模拟数据
const recentOrders = [
  { key: '1', orderNo: 'PO-2023001', customer: 'ABC公司', date: '2023-10-01', amount: 15000, status: '已完成' },
  { key: '2', orderNo: 'PO-2023002', customer: 'XYZ企业', date: '2023-10-02', amount: 23000, status: '处理中' },
  { key: '3', orderNo: 'PO-2023003', customer: '123贸易', date: '2023-10-03', amount: 8000, status: '已取消' },
  { key: '4', orderNo: 'PO-2023004', customer: '科技有限公司', date: '2023-10-04', amount: 32000, status: '处理中' },
  { key: '5', orderNo: 'PO-2023005', customer: '制造集团', date: '2023-10-05', amount: 19500, status: '已完成' },
];

const statusColorMap = {
  '已完成': 'green',
  '处理中': 'blue',
  '已取消': 'red',
};

const Dashboard = () => {
  return (
      <div>
        <div style={{ marginBottom: 24 }}>
        <h1>仪表盘</h1>
        <p>系统概览和关键业务指标</p>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总销售额"
              value={1258000}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix="元"
            />
            <div style={{ marginTop: 16 }}>
              <span>较上月</span>
              <ArrowUpOutlined style={{ color: '#3f8600' }} />
              <span style={{ color: '#3f8600', marginLeft: 4 }}>12.5%</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="采购订单"
              value={86}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ShoppingCartOutlined />}
              suffix="个"
            />
            <div style={{ marginTop: 16 }}>
              <span>较上月</span>
              <ArrowUpOutlined style={{ color: '#3f8600' }} />
              <span style={{ color: '#3f8600', marginLeft: 4 }}>8.2%</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="销售订单"
              value={128}
              valueStyle={{ color: '#722ed1' }}
              prefix={<ShoppingOutlined />}
              suffix="个"
            />
            <div style={{ marginTop: 16 }}>
              <span>较上月</span>
              <ArrowDownOutlined style={{ color: '#cf1322' }} />
              <span style={{ color: '#cf1322', marginLeft: 4 }}>2.1%</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="库存水平"
              value={78}
              valueStyle={{ color: '#fa8c16' }}
              prefix={<StockOutlined />}
              suffix="%"
            />
            <Progress percent={78} size="small" status="active" />
          </Card>
        </Col>
      </Row>

      {/* 最近订单表格 */}
      <Card title="最近订单">
        <Table
          columns={[
            { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo' },
            { title: '客户', dataIndex: 'customer', key: 'customer' },
            { title: '日期', dataIndex: 'date', key: 'date' },
            { title: '金额', dataIndex: 'amount', key: 'amount', render: (amount) => `￥${amount.toLocaleString()}` },
            { 
              title: '状态', 
              dataIndex: 'status', 
              key: 'status',
              render: (status) => (
                <Tag color={statusColorMap[status]} key={status}>
                  {status}
                </Tag>
              )
            },
            { 
              title: '操作', 
              key: 'action',
              render: () => (
                <Space size="middle">
                  <a>查看</a>
                  <a>编辑</a>
                </Space>
              )
            },
          ]}
          dataSource={recentOrders}
          pagination={{ pageSize: 5 }}
          rowKey="key"
        />
      </Card>
      </div>
    );
};

export default Dashboard;