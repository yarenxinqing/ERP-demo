import React from 'react';
import { Card, Table, Input, Select, DatePicker, Space, Tag, Button } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const LogManagement = () => {
  // 模拟日志数据
  const logData = [
    { id: '1', user: 'admin', action: '登录', resource: '系统', ip: '192.168.1.1', time: '2024-03-15 08:30:25', status: 'success' },
    { id: '2', user: 'zhangsan', action: '查看', resource: '销售报表', ip: '192.168.1.2', time: '2024-03-15 09:15:42', status: 'success' },
    { id: '3', user: 'lisi', action: '编辑', resource: '采购订单', ip: '192.168.1.3', time: '2024-03-15 10:20:18', status: 'success' },
    { id: '4', user: 'wangwu', action: '删除', resource: '库存记录', ip: '192.168.1.4', time: '2024-03-15 11:05:33', status: 'failed' },
    { id: '5', user: 'admin', action: '配置修改', resource: '系统设置', ip: '192.168.1.1', time: '2024-03-15 14:40:55', status: 'success' },
    { id: '6', user: 'zhaoliu', action: '导出', resource: '财务报表', ip: '192.168.1.5', time: '2024-03-15 15:25:22', status: 'success' },
    { id: '7', user: 'admin', action: '权限变更', resource: '用户管理', ip: '192.168.1.1', time: '2024-03-15 16:10:47', status: 'success' },
    { id: '8', user: 'lisi', action: '登录', resource: '系统', ip: '192.168.1.3', time: '2024-03-15 17:05:12', status: 'failed' },
  ];

  // 表格列定义
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: '操作用户', dataIndex: 'user', key: 'user' },
    { title: '操作类型', dataIndex: 'action', key: 'action' },
    { title: '操作资源', dataIndex: 'resource', key: 'resource' },
    { title: 'IP地址', dataIndex: 'ip', key: 'ip', width: 120 },
    { title: '操作时间', dataIndex: 'time', key: 'time', width: 160 },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: status => {
        let color = status === 'success' ? 'green' : 'red';
        return <Tag color={color}>{status === 'success' ? '成功' : '失败'}</Tag>;
      }
    },
  ];

  // 处理日期范围变化
  const handleDateChange = (dates, dateStrings) => {
    console.log('日期范围:', dateStrings);
  };

  // 处理操作类型变化
  const handleActionChange = (value) => {
    console.log('操作类型:', value);
  };

  return (
    <div style={{ minHeight: '100%', margin: '0 -24px', padding: '0 24px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1>日志管理</h1>
        <p>系统操作日志的查询与导出</p>
      </div>
      <Card style={{ width: '100%', margin: 0 }}>
      <div style={{ marginBottom: 16 }}>
        <Space size="middle">
          <Input placeholder="搜索用户" prefix={<SearchOutlined />} style={{ width: 200 }} />
          <Select placeholder="操作类型" style={{ width: 150 }} onChange={handleActionChange}>
            <Option value="login">登录</Option>
            <Option value="view">查看</Option>
            <Option value="edit">编辑</Option>
            <Option value="delete">删除</Option>
            <Option value="export">导出</Option>
          </Select>
          <RangePicker
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            placeholder={['开始日期', '结束日期']}
          />
          <Button type="primary" icon={<DownloadOutlined />}>导出日志</Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={logData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Card>
    </div>
  );
};

export default LogManagement;