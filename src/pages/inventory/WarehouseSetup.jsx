import React from 'react';
import { Table, Button, Input, Space, Tag, Modal, Form, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const WarehouseSetup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState('add'); // 'add' or 'edit'
  const [selectedRecord, setSelectedRecord] = React.useState(null);

  // 模拟仓库数据
  const warehouseData = [
    { key: '1', code: 'WH001', name: '总仓', location: '上海市浦东新区', manager: '张三', status: 'active', capacity: '5000㎡', type: 'primary' },
    { key: '2', code: 'WH002', name: '华东分仓', location: '江苏省苏州市', manager: '李四', status: 'active', capacity: '3000㎡', type: 'secondary' },
    { key: '3', code: 'WH003', name: '华南分仓', location: '广东省广州市', manager: '王五', status: 'maintenance', capacity: '2500㎡', type: 'secondary' },
    { key: '4', code: 'WH004', name: '备用仓库', location: '浙江省杭州市', manager: '赵六', status: 'inactive', capacity: '1000㎡', type: 'backup' },
  ];

  // 状态标签样式映射
  const statusTagColor = {
    'active': 'green',
    'maintenance': 'orange',
    'inactive': 'gray'
  };

  // 仓库类型选项
  const warehouseTypeOptions = [
    { label: '主仓库', value: 'primary' },
    { label: '分仓库', value: 'secondary' },
    { label: '备用仓库', value: 'backup' },
  ];

  // 表格列配置
  const columns = [
    { title: '仓库编码', dataIndex: 'code', key: 'code' },
    { title: '仓库名称', dataIndex: 'name', key: 'name' },
    { title: '位置', dataIndex: 'location', key: 'location' },
    { title: '负责人', dataIndex: 'manager', key: 'manager' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: status => (
        <Tag color={statusTagColor[status]}>
          {status === 'active' && '启用'}
          {status === 'maintenance' && '维护中'}
          {status === 'inactive' && '停用'}
        </Tag>
      )
    },
    { title: '容量', dataIndex: 'capacity', key: 'capacity' },
    { 
      title: '类型', 
      dataIndex: 'type', 
      key: 'type',
      render: type => (
        <Tag>
          {type === 'primary' && '主仓库'}
          {type === 'secondary' && '分仓库'}
          {type === 'backup' && '备用仓库'}
        </Tag>
      )
    },
    { 
      title: '操作', 
      key: 'action', 
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            size="small" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}>编辑</Button>
          <Button 
            danger 
            size="small" 
            icon={<DeleteOutlined />} 
            disabled={record.status === 'active'}
            onClick={() => handleDelete(record.key)}>删除</Button>
          <Button 
            size="small" 
            onClick={() => navigate(`/inventory/warehouse/${record.key}/locations`)}>库位管理</Button>
        </Space>
      )
    },
  ];

  // 处理新增仓库
  const handleAdd = () => {
    setModalType('add');
    setSelectedRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 处理编辑仓库
  const handleEdit = (record) => {
    setModalType('edit');
    setSelectedRecord(record);
    form.setFieldsValue({
      code: record.code,
      name: record.name,
      location: record.location,
      manager: record.manager,
      status: record.status,
      capacity: record.capacity,
      type: record.type
    });
    setIsModalVisible(true);
  };

  // 处理删除仓库
  const handleDelete = (key) => {
    // 实际项目中这里会调用API删除数据
    console.log('删除仓库:', key);
  };

  // 提交表单（新增/编辑）
  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        // 实际项目中这里会调用API保存数据
        console.log(modalType === 'add' ? '新增仓库:' : '编辑仓库:', values);
        setIsModalVisible(false);
      })
      .catch(info => {
        console.error('表单验证失败:', info);
      });
  };

  return (
    <div className="warehouse-setup-page">
      <div className="page-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>仓库设置</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增仓库</Button>
      </div>

      <div className="search-bar" style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="搜索仓库编码或名称"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
        />
        <Select
          defaultValue="all"
          style={{ width: 180, marginLeft: 16 }}
          placeholder="选择仓库状态"
          options={[
            { label: '全部', value: 'all' },
            { label: '启用', value: 'active' },
            { label: '维护中', value: 'maintenance' },
            { label: '停用', value: 'inactive' },
          ]}
        />
      </div>

      <Table
        columns={columns}
        dataSource={warehouseData}
        rowKey="key"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />

      {/* 新增/编辑仓库弹窗 */}
      <Modal
        title={modalType === 'add' ? '新增仓库' : '编辑仓库'}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'active', type: 'secondary' }}
        >
          <Form.Item
            name="code"
            label="仓库编码"
            rules={[{ required: true, message: '请输入仓库编码' }, { max: 50, message: '编码长度不能超过50个字符' }]}
            disabled={modalType === 'edit'}
          >
            <Input placeholder="请输入仓库编码" />
          </Form.Item>
          <Form.Item
            name="name"
            label="仓库名称"
            rules={[{ required: true, message: '请输入仓库名称' }]}
          >
            <Input placeholder="请输入仓库名称" />
          </Form.Item>
          <Form.Item
            name="location"
            label="位置"
            rules={[{ required: true, message: '请输入仓库位置' }]}
          >
            <Input placeholder="请输入仓库位置" />
          </Form.Item>
          <Form.Item
            name="manager"
            label="负责人"
            rules={[{ required: true, message: '请输入负责人' }]}
          >
            <Input placeholder="请输入负责人" />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="容量"
            rules={[{ required: true, message: '请输入仓库容量' }]}
          >
            <Input placeholder="请输入仓库容量（如：5000㎡）" />
          </Form.Item>
          <Form.Item name="type" label="仓库类型" rules={[{ required: true }]}>
            <Select placeholder="请选择仓库类型">
              {warehouseTypeOptions.map(option => (
                <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="状态" rules={[{ required: true }]}>
            <Select placeholder="请选择状态">
              <Select.Option value="active">启用</Select.Option>
              <Select.Option value="maintenance">维护中</Select.Option>
              <Select.Option value="inactive">停用</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WarehouseSetup;