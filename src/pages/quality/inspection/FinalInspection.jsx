import React from 'react';
import { Card, Form, Input, Select, DatePicker, Table, Tag, Button, Space, Badge } from 'antd';
import 'antd/dist/reset.css';

const FinalInspection = () => {
  return (
    <Card title="成品检验" variant="plain">
      <div className="final-inspection-container">
          <Form layout="vertical" onFinish={(values) => console.log('成品检验提交:', values)}>
            <div className="form-section">
              <h3 style={{ marginBottom: 16 }}>产品基本信息</h3>
              <div className="form-row">
                <Form.Item name="productModel" label="产品型号" rules={[{ required: true }]} style={{ flex: 1, marginRight: 16 }}>
                  <Input placeholder="输入产品型号" />
                </Form.Item>
                <Form.Item name="batchNumber" label="批次号" rules={[{ required: true }]} style={{ flex: 1 }}>
                  <Input placeholder="输入批次号" />
                </Form.Item>
              </div>
              <div className="form-row">
                <Form.Item name="productionDate" label="生产日期" rules={[{ required: true }]} style={{ flex: 1, marginRight: 16 }}>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="inspectionQuantity" label="检验数量" rules={[{ required: true }]} style={{ flex: 1 }}>
                  <Input type="number" placeholder="输入检验数量" />
                </Form.Item>
              </div>
            </div>

            <div className="form-section">
              <h3 style={{ margin: '20px 0 16px' }}>检验项目详情</h3>
              <Table
                columns={[
                  { title: '检验类别', dataIndex: 'category', key: 'category' },
                  { title: '检验项目', dataIndex: 'item', key: 'item' },
                  { title: '检验标准', dataIndex: 'standard', key: 'standard' },
                  { title: '检验结果', dataIndex: 'result', key: 'result', render: (text) => (
                    <Tag color={text === '合格' ? 'green' : 'red'}>{text}</Tag>
                  )},
                  { title: '备注', dataIndex: 'comment', key: 'comment' }
                ]}
                dataSource={[
                  { key: '1', category: '外观', item: '表面处理', standard: '无划痕、无色差', result: '合格', comment: '' },
                  { key: '2', category: '性能', item: '功能测试', standard: '各项功能正常', result: '合格', comment: '' },
                  { key: '3', category: '包装', item: '包装完整性', standard: '无破损、标识清晰', result: '不合格', comment: '部分包装边角挤压变形' },
                  { key: '4', category: '安全', item: '安全认证', standard: '符合CE标准', result: '合格', comment: '' }
                ]}
                pagination={false}
                rowKey="key"
              />
            </div>

            <div className="form-section">
              <h3 style={{ margin: '20px 0 16px' }}>最终检验结论</h3>
              <div className="final-result-section" style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <Badge status="success" text="合格" style={{ fontSize: '16px', padding: '8px 16px', marginRight: 20 }} />
                <div className="result-desc">
                  <p>该批次产品经检验，除包装轻微变形外，其余项目均符合标准要求。</p>
                  <p>建议对包装问题进行追溯改进，本批次产品准予入库。</p>
                </div>
              </div>

              <Form.Item name="approver" label="审核人" rules={[{ required: true }]}>
                <Input placeholder="输入审核人姓名" />
              </Form.Item>
            </div>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">提交检验报告</Button>
                <Button htmlType="reset">重置</Button>
                <Button type="default">打印报告</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
    </Card>
  );
};

export default FinalInspection;