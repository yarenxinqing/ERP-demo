import React from 'react';
import { Card, Breadcrumb } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { TeamOutlined } from '@ant-design/icons';

const HRManagement = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  // 生成面包屑导航项
  const breadcrumbItems = [
    { key: 'home', title: '首页' },
    { key: 'hr', title: '人力资源管理' },
  ];

  // 根据当前路径添加子菜单面包屑
  if (pathSnippets.length >= 2 && pathSnippets[0] === 'hr') {
    const subMenuTitles = {
      'employees': '员工管理',
      'recruitment': '招聘管理',
      'attendance': '考勤管理',
      'performance': '绩效管理'
    };
    const subMenuKey = pathSnippets[1];
    if (subMenuTitles[subMenuKey]) {
      breadcrumbItems.push({
        key: subMenuKey,
        title: subMenuTitles[subMenuKey]
      });
    }
  }

  return (
    <div className="hr-management-page">
      <Card variant="plain" className="page-container">
        <div className="page-header" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>
              <TeamOutlined style={{ marginRight: 8 }} />人力资源管理
            </h2>
          </div>
          <Breadcrumb items={breadcrumbItems} style={{ marginTop: 8 }} />
        </div>
        <Outlet />
      </Card>
    </div>
  );
};

export default HRManagement;