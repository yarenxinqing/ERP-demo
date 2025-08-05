
import React from 'react';
import { Card, Form, Input, Select, DatePicker, Radio, Button, Table, Space, Tag } from 'antd';
import { CheckOutlined, CloseOutlined, HistoryOutlined } from '@ant-design/icons';


const IncomingInspection = () => {
  // 表格数据
  const [tableData, setTableData] = React.useState([
    { key: '1', batchNumber: 'BN202307001', materialCode: 'MAT-001', materialName: '精密轴承', specification: '6205-2RS', supplier: '精工轴承有限公司', inspectionDate: '2023-07-15', inspector: '张三', result: '合格', status: '已入库' },
    { key: '2', batchNumber: 'BN202307002', materialCode: 'MAT-002', materialName: '密封垫圈', specification: 'Φ50mm', supplier: '诚信密封件厂', inspectionDate: '2023-07-16', inspector: '李四', result: '不合格', status: '已退货' },
    { key: '3', batchNumber: 'BN202307003', materialCode: 'MAT-003', materialName: '高强度螺栓', specification: 'M12×30mm', supplier: '标准件厂', inspectionDate: '2023-07-17', inspector: '王五', result: '合格', status: '已入库' },
    { key: '4', batchNumber: 'BN202307004', materialCode: 'MAT-004', materialName: '电机定子', specification: 'Y2-132S-4', supplier: '电机制造有限公司', inspectionDate: '2023-07-18', inspector: '赵六', result: '返工重检', status: '检验中' },
  ]);

  // 分页配置
  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 10,
    total: 4
  });

  // 检验项目表格列定义
  const inspectionColumns = [
    { title: '批次号', dataIndex: 'batchNumber', key: 'batchNumber', width: 120 },
    { title: '物料编码', dataIndex: 'materialCode', key: 'materialCode', width: 120 },
    { title: '物料名称', dataIndex: 'materialName', key: 'materialName', width: 150 },
    { title: '规格型号', dataIndex: 'specification', key: 'specification', width: 130 },
    { title: '供应商', dataIndex: 'supplier', key: 'supplier', width: 150 },
    { title: '检验日期', dataIndex: 'inspectionDate', key: 'inspectionDate', width: 120 },
    { title: '检验员', dataIndex: 'inspector', key: 'inspector', width: 100 },
    { 
      title: '检验结果', 
      dataIndex: 'result', 
      key: 'result', 
      width: 110, 
      render: (result) => (
        <Tag color={result === '合格' ? 'green' : result === '不合格' ? 'red' : 'orange'}>
          {result}
        </Tag>
      )
    },
    { title: '状态', dataIndex: 'status', key: 'status', width: 110 },
    { 
      title: '操作', 
      key: 'action', 
      width: 150, 
      render: (_, record) => (
        <Space size="small">
          <Button type="text" size="small">查看</Button>
          <Button type="text" size="small">编辑</Button>
          <Button type="text" size="small" danger>删除</Button>
        </Space>
      )
    },
  ];

  // 处理分页变化
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  // 搜索功能
  const [searchText, setSearchText] = React.useState('');
  const handleSearch = () => {
    // 实际项目中这里应该是API调用
    console.log('搜索:', searchText);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchText('');
    // 实际项目中这里应该重置表格数据
  };

  
  // 检验项目表格数据
  const inspectionItems = [
    { key: '1', item: '外观检查', standard: '无划痕、变形、色差', result: 'pass', notes: '符合要求' },
    { key: '2', item: '尺寸测量', standard: '±0.05mm', result: 'pass', notes: '符合要求' },
    { key: '3', item: '性能测试', standard: '耐压≥250V', result: 'fail', notes: '第3件样品测试不通过' },
    { key: '4', item: '材料成分', standard: '符合ROHS标准', result: 'pass', notes: '第三方检测报告编号: ROHS20230512' },
  ];

  // 表格列定义
  const columns = [
    { title: '检验项目', dataIndex: 'item', key: 'item', width: 150 },
    { title: '检验标准', dataIndex: 'standard', key: 'standard', width: 200 },
    { 
      title: '检验结果', 
      dataIndex: 'result', 
      key: 'result', 
      width: 120, 
      render: (result) => (
        <Tag color={result === 'pass' ? 'green' : 'red'} icon={result === 'pass' ? <CheckOutlined /> : <CloseOutlined />}>
          {result === 'pass' ? '合格' : '不合格'}
        </Tag>
      )
    },
    { title: '备注', dataIndex: 'notes', key: 'notes' },
  ];

  return (
    <Card title="来料检验" variant="plain">
      <div className="incoming-inspection-container">
      {/* 搜索区域 */}
      <div className="search-area" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Input 
          placeholder="搜索批次号、物料编码或供应商"
          value={searchText} 
          onChange={(e) => setSearchText(e.target.value)} 
          style={{ width: 300 }} 
        />
        <Space>
          <Button type="primary" onClick={handleSearch}>搜索</Button>
          <Button onClick={handleReset}>重置</Button>
          <Button type="primary">新增</Button>
        </Space>
      </div>

      {/* 表格区域 */}
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
        bordered
        style={{ marginBottom: 24 }}
      />

      <Form layout="vertical" onFinish={(values) => console.log('检验表单提交:', values)}>
          {/* 基本信息区域 */}
          <div className="form-section" style={{ marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>基本信息</h3>
            <div className="form-row" style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <Form.Item name="supplierName" label="供应商名称" rules={[{ required: true, message: '请输入供应商名称' }]} style={{ flex: 1 }}>
                <Input placeholder="输入供应商名称" />
              </Form.Item>
              <Form.Item name="supplierCode" label="供应商编码" rules={[{ required: true, message: '请输入供应商编码' }]} style={{ flex: 1 }}>
                <Input placeholder="输入供应商编码" />
              </Form.Item>
            </div>

            <div className="form-row" style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <Form.Item name="materialCode" label="物料编码" rules={[{ required: true, message: '请输入物料编码' }]} style={{ flex: 1 }}>
                <Input placeholder="输入物料编码" />
              </Form.Item>
              <Form.Item name="materialName" label="物料名称" rules={[{ required: true, message: '请输入物料名称' }]} style={{ flex: 1 }}>
                <Input placeholder="输入物料名称" />
              </Form.Item>
              <Form.Item name="specification" label="规格型号" rules={[{ required: true, message: '请输入规格型号' }]} style={{ flex: 1 }}>
                <Input placeholder="输入规格型号" />
              </Form.Item>
            </div>

            <div className="form-row" style={{ display: 'flex', gap: 16 }}>
              <Form.Item name="batchNumber" label="批次号" rules={[{ required: true, message: '请输入批次号' }]} style={{ flex: 1 }}>
                <Input placeholder="输入批次号" />
              </Form.Item>
              <Form.Item name="quantity" label="来料数量" rules={[{ required: true, message: '请输入来料数量' }]} style={{ flex: 1 }}>
                <Input type="number" min={1} placeholder="输入来料数量" />
              </Form.Item>
              <Form.Item name="inspectionDate" label="检验日期" rules={[{ required: true, message: '请选择检验日期' }]} style={{ flex: 1 }}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </div>
          </div>

          {/* 检验项目区域 */}
          <div className="form-section" style={{ marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>检验项目</h3>
            <Table
              dataSource={inspectionItems}
              columns={inspectionColumns}
              pagination={false}
              rowKey="key"
              bordered
              style={{ marginBottom: 16 }}
            />

            <Form.Item name="additionalItems" label="附加检验项目">
              <Input.TextArea rows={2} placeholder="如有其他检验项目，请在此填写" />
            </Form.Item>
          </div>

          {/* 综合判定区域 */}
          <div className="form-section" style={{ marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>综合判定</h3>
            <div className="form-row" style={{ marginBottom: 16 }}>
              <Form.Item name="inspectionResult" label="检验结论" rules={[{ required: true, message: '请选择检验结论' }]} style={{ maxWidth: 300 }}>
                <Radio.Group>
                  <Radio value="pass">合格</Radio>
                  <Radio value="fail">不合格</Radio>
                  <Radio value="recheck">返工重检</Radio>
                </Radio.Group>
              </Form.Item>
            </div>

            <Form.Item name="rejectionReason" label="不合格原因" rules={[{ required: ({ getFieldValue }) => getFieldValue('inspectionResult') === 'fail', message: '请说明不合格原因' }]}>
              <Select placeholder="选择不合格原因">
                <Select.Option value="appearance">外观不符合要求</Select.Option>
                <Select.Option value="dimension">尺寸超差</Select.Option>
                <Select.Option value="performance">性能不达标</Select.Option>
                <Select.Option value="material">材料不合格</Select.Option>
                <Select.Option value="packaging">包装破损</Select.Option>
                <Select.Option value="other">其他原因</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="comments" label="处理意见及备注">
              <Input.TextArea rows={4} placeholder="请输入处理意见及备注信息" />
            </Form.Item>
          </div>

          {/* 操作按钮区域 */}
          <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
            <Space>
              <Button icon={<HistoryOutlined />} onClick={() => console.log('查看历史记录')}>查看历史记录</Button>
            </Space>
            <Space>
              <Button htmlType="reset">重置</Button>
              <Button type="default">保存草稿</Button>
              <Button type="primary" htmlType="submit">提交检验报告</Button>
            </Space>
          </div>
        </Form>
      </div>
    </Card>
  );
};

export default IncomingInspection;