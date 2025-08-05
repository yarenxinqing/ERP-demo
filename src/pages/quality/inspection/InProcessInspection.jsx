import React from 'react';
import { Card, Form, Input, Select, Radio, DatePicker, Button, Table } from 'antd';
import 'antd/dist/reset.css';

const InProcessInspection = () => {
  return (
    <Card title="过程检验" variant="plain">
      <div className="process-inspection-container">
          <Form layout="vertical" onFinish={(values) => console.log('过程检验提交:', values)}>
            <div className="form-row">
              <Form.Item name="productionLine" label="产线名称" rules={[{ required: true }]} style={{ flex: 1, marginRight: 16 }}>
                <Select placeholder="选择产线">
                  <Select.Option value="line1">装配线1</Select.Option>
                  <Select.Option value="line2">装配线2</Select.Option>
                  <Select.Option value="line3">测试线</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="workOrder" label="工单号" rules={[{ required: true }]} style={{ flex: 1 }}>
                <Input placeholder="输入工单号" />
              </Form.Item>
            </div>
            <div className="form-row">
              <Form.Item name="process" label="工序名称" rules={[{ required: true }]} style={{ flex: 1, marginRight: 16 }}>
                <Select placeholder="选择工序">
                  <Select.Option value="assembly">装配</Select.Option>
                  <Select.Option value="welding">焊接</Select.Option>
                  <Select.Option value="painting">涂装</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="inspectionDate" label="检验日期" rules={[{ required: true }]} style={{ flex: 1 }}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </div>
            <Form.Item name="overallResult" label="综合检验结果" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value="pass">合格</Radio>
                <Radio value="rework">返工</Radio>
                <Radio value="scrap">报废</Radio>
              </Radio.Group>
            </Form.Item>

            <h3 style={{ margin: '20px 0 10px' }}>检验项目明细</h3>
            <Table
              columns={[
                { title: '检验项', dataIndex: 'item', key: 'item' },
                { title: '检验标准', dataIndex: 'standard', key: 'standard' },
                { title: '实测值', dataIndex: 'actual', key: 'actual' },
                { title: '结果', dataIndex: 'result', key: 'result', render: (text) => (
                  <span style={{ color: text === '合格' ? 'green' : 'red' }}>{text}</span>
                )}
              ]}
              dataSource={[
                { key: '1', item: '尺寸检查', standard: '50±0.5mm', actual: '50.2mm', result: '合格' },
                { key: '2', item: '外观检查', standard: '无划痕', actual: '无划痕', result: '合格' },
                { key: '3', item: '性能测试', standard: '电压3.3V±5%', actual: '3.28V', result: '合格' }
              ]}
              pagination={false}
            />

            <Form.Item name="inspector" label="检验员" rules={[{ required: true }]} style={{ marginTop: 20 }}>
              <Input placeholder="输入检验员姓名" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>提交检验报告</Button>
              <Button htmlType="reset">重置</Button>
            </Form.Item>
          </Form>
        </div>
    </Card>
  );
};

export default InProcessInspection;