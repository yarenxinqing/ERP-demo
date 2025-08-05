import React from 'react';
import { Table, Card, Select, Tag, Space } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

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

const ReportList = () => {
  const statusColorMap = {
    '已生成': 'green',
    '生成中': 'blue',
    '失败': 'red',
    '过期': 'orange'
  };

  return (
    <Card title="报表列表">
      <Table
        columns={[
          { title: '报表名称', dataIndex: 'name', key: 'name' },
          { title: '类型', dataIndex: 'type', key: 'type' },
          { title: '周期', dataIndex: 'period', key: 'period' },
          { title: '生成日期', dataIndex: 'date', key: 'date' },
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
            title: '查看次数', 
            dataIndex: 'views', 
            key: 'views',
            sorter: (a, b) => a.views - b.views,
            render: (views) => (
              <span>{views} <ArrowUpOutlined style={{ fontSize: 12 }} /></span>
            )
          },
          {
            title: '操作', 
            key: 'action',
            render: () => (
              <Space size="middle">
                <a>查看</a>
                <a>下载</a>
                <a>刷新</a>
              </Space>
            )
          }
        ]}
        dataSource={reportData}
        pagination={{ pageSize: 10 }}
        rowKey="key"
      />
    </Card>
  );
};

export default ReportList;