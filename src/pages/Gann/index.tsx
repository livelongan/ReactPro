import React, { useState } from 'react';
import type { InputNumberProps } from 'antd';
import { Form, InputNumber, Flex, Space } from 'antd';
import styles from './Gann.module.css'
import Degree from './Degree'
import Square from './Square'
import { FieldType } from './type';
import FormItem from '../../component/FormItem';
const SIZE_OFFSET = 30
const SQUARE_OFFSET = 0
 
const init: FieldType = {
  price: 1,
  step: 0.01,
  find: 0,
  offset: 0.1,
  level: 5,
  circle: 500,
  size: 600,
  block: 32,
}
const Gann: React.FC = () => {
  const [form] = Form.useForm()
  const [field, setField] = useState<FieldType>({ ...init })
  const onChangePrice: InputNumberProps['onChange'] = (value) => {
    const data: FieldType = { ...field, price: Number(value) }
    setField(data)
  };
  const onChangeStep: InputNumberProps['onChange'] = (value) => {
    const data: FieldType = { ...field, step: Number(value) }
    setField(data)
  };
  const onChangeFind: InputNumberProps['onChange'] = (value) => {
    const data: FieldType = { ...field, find: Number(value) }
    setField(data)
  };
  const onChangeOffset: InputNumberProps['onChange'] = (value) => {
    const data: FieldType = { ...field, offset: Number(value) }
    setField(data)
  };
  const onChangeLevel: InputNumberProps['onChange'] = (value) => {
    const level = Number(value)
    const data: FieldType = { ...field, level }
    if (level) {
      const squareWidth = level * 2 * field.block
      data.circle = squareWidth * Math.sqrt(2) + SQUARE_OFFSET * 2
      data.size = data.circle + SIZE_OFFSET * 3
    }
    setField(data)
  };
  return (
    <Flex gap="large">
      <Form
        form={form}
        name="gann"
        labelAlign="right"
        colon={false}
        initialValues={field}
        layout="horizontal"
        style={{ maxWidth: '200px' }}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
      >
        <FormItem label="Value" name="price" rules={[{ required: true }]}>
          <InputNumber min={0} step={field.step} onChange={onChangePrice} />
        </FormItem>
        <FormItem label="Step" name="step" rules={[{ required: true }]}>
          <InputNumber min={0.01} step={field.step} onChange={onChangeStep} />
        </FormItem>
        <FormItem label="Find" name="find">
          <InputNumber min={0} step={field.step} onChange={onChangeFind} />
        </FormItem>
        <FormItem label="Offset" name="offset" rules={[{ required: true }]}>
          <InputNumber min={0} step={field.step} onChange={onChangeOffset} />
        </FormItem>
        <FormItem label="Level" name="level" rules={[{ required: true }]}>
          <InputNumber min={2} step={1} onChange={onChangeLevel} />
        </FormItem>
      </Form>
      <Space>
        <svg width={field.size} height={field.size} className={styles.svg} viewBox={`0 0 ${field.size} ${field.size}`}>
          <g fill={'transparent'} stroke={'rgba(255,80,80,1)'} strokeWidth={1} fontSize={11} transform-origin={field.size / 2}>
            <Degree size={field.size} radius={field.circle / 2} />
            <Square size={field.block} center={field.size / 2} field={field} />
          </g>
        </svg >
      </Space>
    </Flex>
  );
};
export default Gann;