import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const InventoryOperations = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState('');

  // 模拟库存操作数据
  useEffect(() => {
    const mockData = [
      { id: '1', operationType: '入库', productName: '笔记本电脑', sku: 'NB-2023-001', quantity: 50, warehouse: '主仓库', operator: '张三', operationTime: '2023-10-01 14:30' },
      { id: '2', operationType: '出库', productName: '鼠标', sku: 'MS-2023-002', quantity: 200, warehouse: '备用仓库', operator: '李四', operationTime: '2023-10-02 09:15' },
      { id: '3', operationType: '调拨', productName: '键盘', sku: 'KB-2023-003', quantity: 100, warehouse: '主仓库', operator: '王五', operationTime: '2023-10-03 16:45' },
      { id: '4', operationType: '盘点', productName: '显示器', sku: 'MN-2023-004', quantity: 30, warehouse: '主仓库', operator: '赵六', operationTime: '2023-10-04 11:20' },
    ];
    setDataSource(mockData);
  }, []);

  // 表单提交处理
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const newRecord = {
        id: Date.now().toString(),
        ...values,
        operationTime: moment(values.operationTime).format('YYYY-MM-DD HH:mm'),
      };

      setDataSource([...dataSource, newRecord]);
      setIsModalVisible(false);
      form.resetFields();
      message.success('操作记录添加成功');
    } catch (errorInfo) {
      message.error('表单验证失败，请检查输入');
    }
  };

  // 编辑操作
  const edit = (record) => {
    form.setFieldsValue({
      operationType: record.operationType,
      productName: record.productName,
      sku: record.sku,
      quantity: record.quantity,
      warehouse: record.warehouse,
      operator: record.operator,
      operationTime: moment(record.operationTime, 'YYYY-MM-DD HH:mm'),
    });
    setEditingKey(record.id);
    setIsModalVisible(true);
  };

  // 删除操作
  const confirmDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条操作记录吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setDataSource(dataSource.filter(item => item.id !== id));
        message.success('删除成功');
      },
    });
  };

  // 表格列配置
  const columns = [
    { title: '操作类型', dataIndex: 'operationType', key: 'operationType' },
    { title: '产品名称', dataIndex: 'productName', key: 'productName' },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: '数量', dataIndex: 'quantity', key: 'quantity' },
    { title: '仓库', dataIndex: 'warehouse', key: 'warehouse' },
    { title: '操作员', dataIndex: 'operator', key: 'operator' },
    { title: '操作时间', dataIndex: 'operationTime', key: 'operationTime' },
    { 
      title: '操作', 
      key: 'action',
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => edit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => confirmDelete(record.id)}
          />
        </div>
      )
    },
  ];

  return (
    <div className="inventory-operations-container">
      <div className="page-header" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>库存操作记录</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingKey('');
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          添加操作记录
        </Button>
      </div>

      <div className="search-bar" style={{ marginBottom: 20 }}>
        <Input
          placeholder="搜索产品名称或SKU"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={dataSource.filter(item => 
          item.productName.includes(searchText) || item.sku.includes(searchText)
        )}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingKey ? "编辑库存操作" : "添加库存操作"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        destroyOnClose
      >
        <Form form={form} layout="vertical" name="inventory_operation_form">
          <Form.Item
            name="operationType"
            label="操作类型"
            rules={[{ required: true, message: '请选择操作类型' }]}
          >
            <Select placeholder="选择操作类型">
              <Select.Option value="入库">入库</Select.Option>
              <Select.Option value="出库">出库</Select.Option>
              <Select.Option value="调拨">调拨</Select.Option>
              <Select.Option value="盘点">盘点</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="productName"
            label="产品名称"
            rules={[{ required: true, message: '请输入产品名称' }]}
          >
            <Input placeholder="输入产品名称" />
          </Form.Item>

          <Form.Item
            name="sku"
            label="SKU"
            rules={[{ required: true, message: '请输入SKU' }]}
          >
            <Input placeholder="输入SKU" />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="数量"
            rules={[{ required: true, message: '请输入数量' }, { type: 'number', min: 1 }]}
          >
            <Input type="number" placeholder="输入数量" />
          </Form.Item>

          <Form.Item
            name="warehouse"
            label="仓库"
            rules={[{ required: true, message: '请选择仓库' }]}
          >
            <Select placeholder="选择仓库">
              <Select.Option value="主仓库">主仓库</Select.Option>
              <Select.Option value="备用仓库">备用仓库</Select.Option>
              <Select.Option value="区域仓库A">区域仓库A</Select.Option>
              <Select.Option value="区域仓库B">区域仓库B</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="operator"
            label="操作员"
            rules={[{ required: true, message: '请输入操作员' }]}
          >
            <Input placeholder="输入操作员" />
          </Form.Item>

          <Form.Item
            name="operationTime"
            label="操作时间"
            rules={[{ required: true, message: '请选择操作时间' }]}
          >
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder="选择操作时间"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryOperations;