import React from 'react';
import { Menu, Layout, Select, Space } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { PieChartOutlined, FileTextOutlined, ShoppingOutlined, DatabaseOutlined, MoneyCollectOutlined } from '@ant-design/icons';
const { Content } = Layout;


// 报表数据已移至ReportList.jsx
// 报表数据已移至ReportList.jsx
/*
const reportData = [
  { key: '1', name: '2023年度销售报表', type: '销售', period: '年度', date: '2023-12-31', status: '已生成', views: 128 },
  { key: '2', name: '2023Q4采购报表', type: '采购', period: '季度', date: '2023-12-31', status: '已生成', views: 95 },
  { key: '3', name: '库存月度盘点报表', type: '库存', period: '月度', date: '2024-01-31', status: '已生成', views: 76 },
  { key: '4', name: '2024年财务预算报表', type: '财务', period: '年度', date: '2024-01-15', status: '已生成', views: 142 },
  { key: '5', name: '2024年1月销售报表', type: '销售', period: '月度', date: '2024-02-01', status: '生成中', views: 0 },
  { key: '6', name: '供应商评估报表', type: '采购', period: '季度', date: '2023-12-20', status: '已生成', views: 58 },
  { key: '7', name: '库存预警报表', type: '库存', period: '周度', date: '2024-02-10', status: '已生成', views: 63 },
  { key: '8', name: '2023年度财务审计报表', type: '财务', period: '年度', date: '2024-01-20', status: '失败', views: 24 },
  { key: '9', name: '2023Q3销售分析报表', type: '销售', period: '季度', date: '2023-09-30', status: '过期', views: 32 },
  { key: '10', name: '物流成本分析报表', type: '采购', period: '月度', date: '2024-01-25', status: '已生成', views: 47 },
];
*/

const ReportCenter = () => {
  const location = useLocation();
  const selectedKey = location.pathname.split('/')[3] || 'list';

  const handleMenuClick = (e) => {
    // 可以添加菜单点击事件处理
  };

  return (
  <div style={{ minHeight: '100%' }}>
    <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h1>报表中心</h1>
        <p>系统报表生成与管理</p>
      </div>
      <Select defaultValue="all" style={{ width: 180 }}>
        <Select.Option value="all">全部报表</Select.Option>
        <Select.Option value="sales">销售报表</Select.Option>
        <Select.Option value="purchase">采购报表</Select.Option>
        <Select.Option value="inventory">库存报表</Select.Option>
        <Select.Option value="finance">财务报表</Select.Option>
      </Select>
    </div>
    <Outlet />
  </div>
);
}

// 删除未使用的statusColorMap常量

export default ReportCenter;