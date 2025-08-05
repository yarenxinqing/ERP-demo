import React from 'react';
import { Card, Table, Button, Space, Input, Tag, Modal, Form, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserManagement = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState('add'); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = React.useState(null);

  // 模拟用户数据
  const userData = [
    { id: '1', name: '张三', username: 'zhangsan', email: 'zhangsan@example.com', role: 'admin', status: 'active' },
    { id: '2', name: '李四', username: 'lisi', email: 'lisi@example.com', role: 'editor', status: 'active' },
    { id: '3', name: '王五', username: 'wangwu', email: 'wangwu@example.com', role: 'viewer', status: 'inactive' },
    { id: '4', name: '赵六', username: 'zhaoliu', email: 'zhaoliu@example.com', role: 'editor', status: 'active' },
  ];

  // 表格列定义
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { 
      title: '角色', 
      dataIndex: 'role', 
      key: 'role',
      render: role => {
        let color = role === 'admin' ? 'red' : role === 'editor' ? 'blue' : 'green';
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      }
    },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: status => {
        let color = status === 'active' ? 'green' : 'red';
        let text = status === 'active' ? '启用' : '禁用';
        return <Tag color={color}>{text}</Tag>;
      }
    },
    { 
      title: '操作', 
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      )
    },
  ];

  // 处理添加用户
  const handleAdd = () => {
    setModalType('add');
    setSelectedUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 处理编辑用户
  const handleEdit = (user) => {
    setModalType('edit');
    setSelectedUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  // 处理删除用户
  const handleDelete = (id) => {
    // 这里可以添加删除确认和API调用
    console.log('删除用户:', id);
  };

  // 处理表单提交
  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        if (modalType === 'add') {
          console.log('添加用户:', values);
          // 添加用户API调用
        } else {
          console.log('编辑用户:', { ...selectedUser, ...values });
          // 编辑用户API调用
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('表单验证失败:', info);
      });
  };

  return (
    <div style={{ minHeight: '100%', margin: '0 -24px', padding: '0 24px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1>用户管理</h1>
        <p>系统用户的创建、编辑与权限分配</p>
      </div>
      <Card style={{ width: '100%', margin: 0 }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>添加用户</Button>
        </Space>
        <Input placeholder="搜索用户" prefix={<SearchOutlined />} style={{ width: 200 }} />
      </div>
      <Table
        columns={columns}
        dataSource={userData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* 添加/编辑用户模态框 */}
      <Modal
        title={modalType === 'add' ? '添加用户' : '编辑用户'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>确定</Button>
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
            disabled={modalType === 'edit'}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Option value="admin">管理员</Option>
              <Option value="editor">编辑</Option>
              <Option value="viewer">查看者</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="active">启用</Option>
              <Option value="inactive">禁用</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
    </div>
    );
};

export default UserManagement;