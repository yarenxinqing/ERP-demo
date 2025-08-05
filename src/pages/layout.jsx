import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Space } from 'antd';
import { ToolOutlined } from '@ant-design/icons';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  StockOutlined,
  CreditCardOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => navigate('/login'),
    },
  ];

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    { key: '/production', icon: <ToolOutlined />, label: '生产管理', children: [
          { key: '/production/planning', label: '生产计划' },
          { key: '/production/tasks', label: '生产任务' },
          { key: '/production/execution', label: '生产执行' },
        ] },
    { key: '/quality', icon: <SettingOutlined />, label: '质量管理', children: [
          { key: '/quality/inspection/IncomingInspection', label: '来料检验' },
          { key: '/quality/inspection/inprocessinspection', label: '过程检验' },
          { key: '/quality/inspection/finallnspection', label: '成品检验' },
          { key: '/quality/nonconforming/nonconformingrecords', label: '不合格品记录' },
          { key: '/quality/nonconforming/nonconformingreview', label: '不合格品评审' },
          { key: '/quality/nonconforming/nonconformingprocess', label: '不合格品处理流程' },
          { key: '/quality/traceability/batchtraceability', label: '批次质量追溯' },
          { key: '/quality/traceability/materialtraceability', label: '原材料追溯' },
          { key: '/quality/traceability/processtraceability', label: '生产过程追溯' },
          { key: '/quality/analysis/qualityindicators', label: '质量指标分析' },
          { key: '/quality/analysis/defectratestatistics', label: '不良率统计' },
          { key: '/quality/analysis/improvementtracking', label: '质量改进跟踪' },
        ] },
        {
      key: '/purchase-management',
      icon: <ShoppingCartOutlined />,
      label: '采购管理',
      children: [
        { key: '/purchase/suppliers', label: '供应商管理' },
        { key: '/purchase/plan', label: '采购计划' },
        { key: '/purchase', label: '采购订单' },
        { key: '/purchase/inventory', label: '入库管理' },
        { key: '/purchase/settlement', label: '采购结算' }
      ]
    },
    {
      key: '/sales',
      icon: <ShoppingOutlined />,
      label: '销售管理',
      children: [
        { key: '/sales/customers', label: '客户管理' },
        { key: '/sales/quotes', label: '销售报价' },
        { key: '/sales/orders', label: '销售订单' },
        { key: '/sales/shipments', label: '发货管理' },
        { key: '/sales/settlement', label: '销售结算' }
      ]
    },
    {
  key: '/inventory',
  icon: <StockOutlined />,
  label: '库存管理',
  children: [ { key: '/inventory/warehouse', label: '仓库设置' }, { key: '/inventory/operations', label: '库存操作' }, { key: '/inventory/monitoring', label: '库存监控' }, { key: '/inventory/batch', label: '批次管理' } ]
},
    {
      key: '/finance',
      icon: <CreditCardOutlined />,
      label: '财务管理',
      children: [
        { key: '/finance/accounting', label: '会计核算' },
        { key: '/finance/accounts-receivable-payable', label: '应收应付' },
        { key: '/finance/cost-management', label: '成本管理' },
        { key: '/finance/statements', label: '财务报表' }
      ]
    },
    {
      key: '/hr',
      icon: <TeamOutlined />,
      label: '人力资源',
      children: [
        { key: '/hr/employees', label: '员工管理' },
        { key: '/hr/recruitment', label: '招聘管理' },
        { key: '/hr/attendance', label: '考勤管理' },
        { key: '/hr/performance', label: '绩效管理' }
      ]
    },
    {
      key: '/report',
      icon: <FileTextOutlined />,
      label: '报表中心',
      children: [
        { key: '/report/list', label: '报表列表' },
        { key: '/report/sales', label: '销售报表' },
        { key: '/report/purchase', label: '采购报表' },
        { key: '/report/inventory', label: '库存报表' },
        { key: '/report/financial', label: '财务报表' }
      ]
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
      children: [
        { key: '/settings/basic', label: '基本设置' },
        { key: '/settings/users', label: '用户管理' },
        { key: '/settings/roles', label: '角色权限' },
        { key: '/settings/logs', label: '日志管理' },
        { key: '/settings/params', label: '系统参数' }
      ]
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px', borderBottom: '1px solid #f0f0f0' }}>
          <h1 style={{ margin: 0, fontSize: collapsed ? '16px' : '20px' }}>ERP系统</h1>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[window.location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: '0 24px', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div onClick={toggle} style={{ cursor: 'pointer' }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>管理员</span>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
            borderRadius: '2px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;