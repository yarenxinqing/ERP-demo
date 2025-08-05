import React from 'react';
import { Card, Table, Tag, Space } from 'antd';


// 模拟人力资源数据
const hrData = [
  { key: '1', name: '张三', position: '产品经理', department: '产品部', hireDate: '2020-03-15', status: '在职' },
  { key: '2', name: '李四', position: '前端开发', department: '技术部', hireDate: '2021-05-22', status: '在职' },
  { key: '3', name: '王五', position: '后端开发', department: '技术部', hireDate: '2021-05-22', status: '离职' },
  { key: '4', name: '赵六', position: 'UI设计师', department: '设计部', hireDate: '2022-01-10', status: '在职' },
  { key: '5', name: '钱七', position: '测试工程师', department: '测试部', hireDate: '2022-03-05', status: '在职' },
];

const statusColorMap = {
  '在职': 'green',
  '离职': 'red',
  '休假': 'blue',
};

const HRList = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1>人力资源管理</h1>
        <p>员工信息和组织架构管理</p>
      </div>

      <Card title="员工列表">
        <Table
          columns={[
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '职位', dataIndex: 'position', key: 'position' },
            { title: '部门', dataIndex: 'department', key: 'department' },
            { title: '入职日期', dataIndex: 'hireDate', key: 'hireDate' },
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
                  <a>查看详情</a>
                  <a>编辑</a>
                </Space>
              )
            },
          ]}
          dataSource={hrData}
          pagination={{ pageSize: 10 }}
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export default HRList;