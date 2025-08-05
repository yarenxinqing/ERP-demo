import React from 'react';
import { Card, Table, Button, Space, Input, Tag, Modal, Form, Select, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, SaveOutlined } from '@ant-design/icons';

const SystemParameters = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedParam, setSelectedParam] = React.useState(null);
  const [modalType, setModalType] = React.useState('add');

  // 模拟系统参数数据
  const paramData = [
    { id: '1', code: 'SYS_NAME', name: '系统名称', value: '企业管理系统', type: 'string', status: 'active', description: '显示在系统顶部的名称' },
    { id: '2', code: 'PAGE_SIZE', name: '默认分页大小', value: '10', type: 'number', status: 'active', description: '表格默认每页显示记录数' },
    { id: '3', code: 'MAX_UPLOAD_SIZE', name: '最大上传大小', value: '10', type: 'number', status: 'active', description: '文件上传的最大限制(MB)' },
    { id: '4', code: 'CACHE_EXPIRE', name: '缓存过期时间', value: '30', type: 'number', status: 'active', description: '系统缓存过期时间(分钟)' },
    { id: '5', code: 'ENABLE_LOG', name: '启用操作日志', value: 'true', type: 'boolean', status: 'active', description: '是否记录用户操作日志' },
    { id: '6', code: 'THEME_COLOR', name: '主题颜色', value: '#1890ff', type: 'string', status: 'inactive', description: '系统主题颜色' },
  ];

  // 表格列定义
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: '参数编码', dataIndex: 'code', key: 'code', width: 150 },
    { title: '参数名称', dataIndex: 'name', key: 'name' },
    { title: '参数值', dataIndex: 'value', key: 'value', width: 120 },
    { title: '数据类型', dataIndex: 'type', key: 'type', width: 100 },
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

  // 处理添加参数
  const handleAdd = () => {
    setModalType('add');
    setSelectedParam(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 处理编辑参数
  const handleEdit = (param) => {
    setModalType('edit');
    setSelectedParam(param);
    form.setFieldsValue(param);
    setIsModalVisible(true);
  };

  // 处理删除参数
  const handleDelete = (id) => {
    // 这里可以添加删除确认和API调用
    console.log('删除参数:', id);
  };

  // 处理表单提交
  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        if (modalType === 'add') {
          console.log('添加参数:', values);
          // 添加参数API调用
        } else {
          console.log('编辑参数:', { ...selectedParam, ...values });
          // 编辑参数API调用
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
        <h1>系统参数</h1>
        <p>系统运行参数的配置与管理</p>
      </div>
      <Card style={{ width: '100%', margin: 0 }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>添加参数</Button>
            <Button icon={<SaveOutlined />} onClick={() => console.log('保存所有参数')}>保存所有</Button>
          </Space>
          <Input placeholder="搜索参数" prefix={<SearchOutlined />} style={{ width: 200 }} />
        </div>
        <Table
          columns={columns}
          dataSource={paramData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        {/* 添加/编辑参数模态框 */}
        <Modal
          title={modalType === 'add' ? '添加系统参数' : '编辑系统参数'}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={(
            <div>
              <Button key="cancel" onClick={() => setIsModalVisible(false)}>取消</Button>
              <Button key="submit" type="primary" onClick={handleSubmit}>确定</Button>
            </div>
          )}
          
        >
          <Form form={form} layout="vertical">
            {modalType === 'add' && (
              <Form.Item
                name="code"
                label="参数编码"
                rules={[{ required: true, message: '请输入参数编码' }, { pattern: /^[A-Z_]+$/, message: '参数编码只能包含大写字母和下划线' }]}
              >
                <Input placeholder="请输入参数编码(大写字母和下划线)" />
              </Form.Item>
            )}

            <Form.Item
              name="name"
              label="参数名称"
              rules={[{ required: true, message: '请输入参数名称' }]}
            >
              <Input placeholder="请输入参数名称" />
            </Form.Item>

            <Form.Item
              name="type"
              label="数据类型"
              rules={[{ required: true, message: '请选择数据类型' }]}
            >
              <Select disabled={modalType === 'edit'}>
                <Option value="string">字符串(String)</Option>
                <Option value="number">数字(Number)</Option>
                <Option value="boolean">布尔值(Boolean)</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="value"
              label="参数值"
              rules={[{ required: true, message: '请输入参数值' }]}
            >
              {form.getFieldValue('type') === 'number' ? (
                <InputNumber style={{ width: '100%' }} placeholder="请输入数字值" />
              ) : form.getFieldValue('type') === 'boolean' ? (
                <Select placeholder="请选择布尔值">
                  <Option value="true">是</Option>
                  <Option value="false">否</Option>
                </Select>
              ) : (
                <Input placeholder="请输入参数值" />
              )}
            </Form.Item>

            <Form.Item
              name="status"
              label="状态"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Select>
                <Option value="active">启用</Option>
                <Option value="inactive">禁用</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="description"
              label="参数描述"
            >
              <Input.TextArea rows={3} placeholder="请输入参数描述信息" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
    );
};

export default SystemParameters;