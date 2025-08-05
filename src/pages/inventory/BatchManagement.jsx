import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, Space, Tag, message, Popconfirm } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const BatchManagement = () => {
  // 状态管理
  const [batchData, setBatchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');

  // 模拟批次数据
  useEffect(() => {
    setLoading(true);
    // 模拟API请求延迟
    setTimeout(() => {
      const mockData = [
        { id: 'B20231001', productName: '电子元件A', batchNumber: 'BN202310001', productionDate: '2023-10-01', expiryDate: '2025-10-01', quantity: 5000, warehouse: '一号仓库', status: 'normal', remark: '常规生产批次' },
        { id: 'B20231002', productName: '电子元件B', batchNumber: 'BN202310002', productionDate: '2023-10-02', expiryDate: '2025-10-02', quantity: 3000, warehouse: '二号仓库', status: 'normal', remark: '常规生产批次' },
        { id: 'B20231003', productName: '电子元件C', batchNumber: 'BN202310003', productionDate: '2023-10-03', expiryDate: '2024-04-03', quantity: 2000, warehouse: '一号仓库', status: 'warning', remark: '即将过期' },
        { id: 'B20231004', productName: '电子元件A', batchNumber: 'BN202310004', productionDate: '2023-10-04', expiryDate: '2023-12-04', quantity: 1500, warehouse: '三号仓库', status: 'expired', remark: '已过期批次' },
        { id: 'B20231005', productName: '电子元件D', batchNumber: 'BN202310005', productionDate: '2023-10-05', expiryDate: '2025-10-05', quantity: 4000, warehouse: '二号仓库', status: 'normal', remark: '加急生产批次' },
      ];
      setBatchData(mockData);
      setLoading(false);
    }, 800);
  }, []);

  // 状态标签样式
  const statusTag = (status) => {
    switch (status) {
      case 'normal':
        return <Tag color="green">正常</Tag>;
      case 'warning':
        return <Tag color="orange">即将过期</Tag>;
      case 'expired':
        return <Tag color="red">已过期</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  };

  // 搜索功能
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchText('');
  };

  // 筛选后的数据
  const filteredData = batchData.filter(item =>
    item.productName.includes(searchText) ||
    item.batchNumber.includes(searchText) ||
    item.warehouse.includes(searchText)
  );

  // 打开新增/编辑弹窗
  const showModal = (record = null) => {
    setVisible(true);
    if (record) {
      setEditingKey(record.id);
      form.setFieldsValue({
        ...record,
        productionDate: moment(record.productionDate),
        expiryDate: moment(record.expiryDate)
      });
    } else {
      setEditingKey('');
      form.resetFields();
    }
  };

  // 关闭弹窗
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setEditingKey('');
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      setTimeout(() => {
        if (editingKey) {
          // 编辑现有批次
          setBatchData(batchData.map(item => item.id === editingKey ? {...values, id: editingKey} : item));
          message.success('批次信息更新成功');
        } else {
          // 新增批次
          const newBatch = {
            ...values,
            id: `B${moment().format('YYYYMMDDHHmmss')}`,
            batchNumber: `BN${moment().format('YYYYMMDD')}${batchData.length + 1}`,
            productionDate: values.productionDate.format('YYYY-MM-DD'),
            expiryDate: values.expiryDate.format('YYYY-MM-DD')
          };
          setBatchData([newBatch, ...batchData]);
          message.success('批次信息新增成功');
        }
        setVisible(false);
        setLoading(false);
        form.resetFields();
        setEditingKey('');
      }, 500);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 删除批次
  const confirmDelete = (id) => {
    setLoading(true);
    setTimeout(() => {
      setBatchData(batchData.filter(item => item.id !== id));
      message.success('批次信息已删除');
      setLoading(false);
    }, 500);
  };

  // 表格列定义
  const columns = [
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 150,
    },
    {
      title: '批次编号',
      dataIndex: 'batchNumber',
      key: 'batchNumber',
      width: 160,
    },
    {
      title: '生产日期',
      dataIndex: 'productionDate',
      key: 'productionDate',
      width: 120,
    },
    {
      title: '过期日期',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      width: 120,
    },
    {
      title: '批次数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
    },
    {
      title: '存储仓库',
      dataIndex: 'warehouse',
      key: 'warehouse',
      width: 120,
    },
    {
      title: '状态',
      key: 'status',
      width: 100,
      render: (_, record) => statusTag(record.status),
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      key: 'action',
      width: 160,
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => showModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个批次吗?"
            onConfirm={() => confirmDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="batch-management-container">
      <div className="page-header" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>批次管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          新增批次
        </Button>
      </div>

      <div className="search-bar" style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
        <Input
          placeholder="搜索产品名称、批次编号或仓库"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Button onClick={handleReset} icon={<ReloadOutlined />}>重置</Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title={editingKey ? "编辑批次" : "新增批次"}
        open={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={loading}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          name="batch_form"
        >
          <Form.Item
            name="productName"
            label="产品名称"
            rules={[{ required: true, message: '请输入产品名称' }]}
          >
            <Input placeholder="请输入产品名称" />
          </Form.Item>

          <Form.Item
            name="productionDate"
            label="生产日期"
            rules={[{ required: true, message: '请选择生产日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="expiryDate"
            label="过期日期"
            rules={[{ required: true, message: '请选择过期日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="批次数量"
            rules={[{ required: true, message: '请输入批次数量' }, { type: 'number', min: 1 }]}
          >
            <Input type="number" placeholder="请输入批次数量" />
          </Form.Item>

          <Form.Item
            name="warehouse"
            label="存储仓库"
            rules={[{ required: true, message: '请选择存储仓库' }]}
          >
            <Select placeholder="请选择存储仓库">
              <Option value="一号仓库">一号仓库</Option>
              <Option value="二号仓库">二号仓库</Option>
              <Option value="三号仓库">三号仓库</Option>
              <Option value="四号仓库">四号仓库</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="批次状态"
            rules={[{ required: true, message: '请选择批次状态' }]}
          >
            <Select placeholder="请选择批次状态">
              <Option value="normal">正常</Option>
              <Option value="warning">即将过期</Option>
              <Option value="expired">已过期</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="remark"
            label="备注"
          >
            <Input.TextArea rows={3} placeholder="请输入备注信息" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BatchManagement;