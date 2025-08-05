import React from 'react';
import { Card, Form, Input, Select, DatePicker, Button, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const NonConformingRecords = () => {
  return (
    <Card title="不合格品记录" variant="plain">
      <div className="nonconforming-records-container">
          <Form layout="vertical" onFinish={(values) => console.log('不合格品记录提交:', values)}>
            <div className="form-section">
              <h3 style={{ marginBottom: 16 }}>产品信息</h3>
              <div className="form-row">
                <Form.Item name="productName" label="产品名称" rules={[{ required: true }]} style={{ flex: 1, marginRight: 16 }}>
                  <Input placeholder="输入产品名称" />
                </Form.Item>
                <Form.Item name="productModel" label="产品型号" rules={[{ required: true }]} style={{ flex: 1 }}>
                  <Input placeholder="输入产品型号" />
                </Form.Item>
              </div>
              <div className="form-row">
                <Form.Item name="batchNumber" label="批次号" rules={[{ required: true }]} style={{ flex: 1, marginRight: 16 }}>
                  <Input placeholder="输入批次号" />
                </Form.Item>
                <Form.Item name="productionDate" label="生产日期" rules={[{ required: true }]} style={{ flex: 1 }}>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </div>
            </div>

            <div className="form-section">
              <h3 style={{ margin: '20px 0 16px' }}>不合格品信息</h3>
              <div className="form-row">
                <Form.Item name="nonconformityType" label="不合格类型" rules={[{ required: true }]} style={{ flex: 1, marginRight: 16 }}>
                  <Select placeholder="选择不合格类型">
                    <Select.Option value="appearance">外观不合格</Select.Option>
                    <Select.Option value="performance">性能不合格</Select.Option>
                    <Select.Option value="dimension">尺寸不合格</Select.Option>
                    <Select.Option value="material">材料不合格</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="quantity" label="不合格数量" rules={[{ required: true }]} style={{ flex: 1 }}>
                  <Input type="number" min={1} placeholder="输入不合格数量" />
                </Form.Item>
              </div>
              <Form.Item name="description" label="不合格描述" rules={[{ required: true }]}>
                <Input.TextArea rows={4} placeholder="详细描述不合格情况，包括位置、特征、程度等" />
              </Form.Item>
              <Form.Item name="发现部门" label="发现部门" rules={[{ required: true }]}>
                <Select placeholder="选择发现部门">
                  <Select.Option value="production">生产部</Select.Option>
                  <Select.Option value="quality">质量部</Select.Option>
                  <Select.Option value="warehouse">仓库</Select.Option>
                  <Select.Option value="customer">客户反馈</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="form-section">
              <h3 style={{ margin: '20px 0 16px' }}>证据上传</h3>
              <Form.Item name="evidenceFiles" label="上传证据照片/文件">
                <Upload name="files" action="/upload" listType="picture-card">
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>上传证据</div>
                  </div>
                </Upload>
                <p className="upload-hint" style={{ marginTop: 8, color: '#666' }}>支持JPG、PNG、PDF格式，最多上传5个文件</p>
              </Form.Item>
            </div>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">保存记录</Button>
                <Button htmlType="reset">重置</Button>
                <Button type="default">打印记录单</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
    </Card>
  );
};

export default NonConformingRecords;