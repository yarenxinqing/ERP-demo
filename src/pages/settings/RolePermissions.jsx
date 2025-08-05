import React from 'react';
import { Card, Table, Button, Space, Input, Tag, Modal, Form, Tree } from 'antd';
import { Select } from 'antd';
const { Option } = Select;
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const RolePermissions = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState(null);
  const [modalType, setModalType] = React.useState('add');
  const [form] = Form.useForm();

  // 模拟角色数据
  const roleData = [
    { id: '1', name: '管理员', description: '系统管理员，拥有所有权限', permissions: '全部', status: 'active' },
    { id: '2', name: '编辑', description: '内容编辑，拥有内容管理权限', permissions: '内容管理,报表查看', status: 'active' },
    { id: '3', name: '查看者', description: '只读权限，只能查看内容', permissions: '报表查看', status: 'active' },
    { id: '4', name: '财务', description: '财务人员，拥有财务相关权限', permissions: '财务报表,结算管理', status: 'inactive' },
  ];

  // 模拟权限树数据
  const permissionTreeData = [
    { title: '仪表盘', key: 'dashboard', children: [{ title: '查看', key: 'dashboard:view' }] },
    { title: '销售管理', key: 'sales', children: [
      { title: '查看', key: 'sales:view' },
      { title: '编辑', key: 'sales:edit' },
      { title: '删除', key: 'sales:delete' }
    ]},
    { title: '采购管理', key: 'purchase', children: [
      { title: '查看', key: 'purchase:view' },
      { title: '编辑', key: 'purchase:edit' },
      { title: '删除', key: 'purchase:delete' }
    ]},
    { title: '库存管理', key: 'inventory', children: [
      { title: '查看', key: 'inventory:view' },
      { title: '编辑', key: 'inventory:edit' },
      { title: '删除', key: 'inventory:delete' }
    ]},
    { title: '报表中心', key: 'report', children: [
      { title: '查看', key: 'report:view' },
      { title: '导出', key: 'report:export' }
    ]},
    { title: '系统设置', key: 'settings', children: [
      { title: '查看', key: 'settings:view' },
      { title: '编辑', key: 'settings:edit' }
    ]},
  ];

  // 表格列定义
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: '角色名称', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '权限', dataIndex: 'permissions', key: 'permissions' },
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

  // 处理添加角色
  const handleAdd = () => {
    setModalType('add');
    setSelectedRole(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 处理编辑角色
  const handleEdit = (role) => {
    setModalType('edit');
    setSelectedRole(role);
    form.setFieldsValue(role);
    setIsModalVisible(true);
  };

  // 处理删除角色
  const handleDelete = (id) => {
    // 这里可以添加删除确认和API调用
    console.log('删除角色:', id);
  };

  // 处理表单提交
  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        if (modalType === 'add') {
          console.log('添加角色:', values);
          // 添加角色API调用
        } else {
          console.log('编辑角色:', { ...selectedRole, ...values });
          // 编辑角色API调用
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
        <h1>角色权限管理</h1>
        <p>系统角色的创建、权限分配与管理</p>
      </div>
      <Card style={{ width: '100%', margin: 0 }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>添加角色</Button>
        </Space>
        <Input placeholder="搜索角色" prefix={<SearchOutlined />} style={{ width: 200 }} />
      </div>
      <Table
        columns={columns}
        dataSource={roleData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* 添加/编辑角色模态框 */}
      <Modal
        title={modalType === 'add' ? '添加角色' : '编辑角色'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>取消</Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>确定</Button>
        ]}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="角色描述"
            rules={[{ required: true, message: '请输入角色描述' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入角色描述" />
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

          <Form.Item
            name="permissions"
            label="权限设置"
            rules={[{ required: true, message: '请选择权限' }]}
          >
            <Tree
              checkable
              treeData={permissionTreeData}
              placeholder="请选择权限"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
    </div>
    );
};

export default RolePermissions;