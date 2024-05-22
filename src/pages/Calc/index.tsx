import React, { useCallback, useEffect, useState } from 'react';
import { Card, Row, Col, Divider, Form, InputNumber, Layout, Statistic } from 'antd';
import { FORM_INIT } from '../../const';
import FormItem from '../../component/FormItem';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import * as mathjs from 'mathjs'
// import styles from './Calc.module.css'

type HighField = {
  D2: number
  G: number
  D1: number
};
type LowField = {
  G1: number
  G2: number
  D: number
};
type CalcResult = {
  N: string
  result: number
}
const initHigh: HighField = {
  D2: 0,
  G: 0,
  D1: 0,
}
const initLow: LowField = {
  G2: 0,
  D: 0,
  G1: 0,
}
const PRECENTS: number[] = [85, 100, 125]
const Calc: React.FC = () => {
  const [highForm] = Form.useForm()
  const [lowForm] = Form.useForm()
  const [high, setHigh] = useState<HighField>({ ...initHigh })
  const [low, setLow] = useState<LowField>({ ...initLow })
  const [calcHigh, setCalcHigh] = useState<CalcResult[]>([])
  const [calcLow, setCalcLow] = useState<CalcResult[]>([])
  const onChangeHigh = (key: string, value: number) => {
    const data: HighField = { ...high, [key]: value }
    setHigh(data)
  };
  const onChangeLow = (key: string, value: number) => {
    const data: LowField = { ...low, [key]: value }
    setLow(data)
  };
  const getHighResult = useCallback((n: number) => {
    const { D2, G, D1 } = high
    if (!D2 || !G || !D1) return 0
    const calc = mathjs.evaluate(`${D2} + ( ${G} - ${D1} ) / ${D1} * ${D2} * ${n} / 100`)
    return mathjs.format(calc, { precision: 3 })
    // return D2 + (G - D1) / D1 * D2 * n / 100
  }, [high])
  const getLowResult = useCallback((n: number) => {
    const { G2, D, G1 } = low
    if (!G2 || !G1 || !D) return 0
    const calc = mathjs.evaluate(`${G2} - ( ${G1} - ${D} ) / ${G1} * ${G2} * ${n} / 100`)
    return mathjs.format(calc, { precision: 3 })
    // return G2 - (G1 - D) / G1 * G2 * n / 100
  }, [low])
  useEffect(() => {
    const highs = PRECENTS.map((pre) => {
      return {
        N: `${pre}%`,
        result: getHighResult(pre)
      } as CalcResult
    })
    setCalcHigh(highs)
  }, [getHighResult])
  useEffect(() => {
    const lows = PRECENTS.map((pre) => {
      return {
        N: `${pre}%`,
        result: getLowResult(pre)
      } as CalcResult
    })
    setCalcLow(lows)
  }, [getLowResult])
  return (
    <Layout>
      <Form
        {...FORM_INIT}
        form={highForm}
        name="height"
        initialValues={high}
        layout='inline'
      >
        <FormItem label="D1" name="D1" required>
          <InputNumber min={0} step={high.D2} onChange={(value) => onChangeHigh('D1', Number(value))} />
        </FormItem>
        <FormItem label="G" name="G" required>
          <InputNumber min={0} step={high.D2} onChange={(value) => onChangeHigh('G', Number(value))} />
        </FormItem>
        <FormItem label="D2" name="D2" required>
          <InputNumber min={0} step={10} onChange={(value) => onChangeHigh('D2', Number(value))} />
        </FormItem>
      </Form>
      <Form
        {...FORM_INIT}
        form={lowForm}
        name="lowForm"
        initialValues={low}
        layout='inline'
      >
        <FormItem label="G1" name="G1" required>
          <InputNumber min={0} step={low.G2} onChange={(value) => onChangeLow('G1', Number(value))} />
        </FormItem>
        <FormItem label="D" name="D" required>
          <InputNumber min={0} step={low.G2} onChange={(value) => onChangeLow('D', Number(value))} />
        </FormItem>
        <FormItem label="G2" name="G2" required>
          <InputNumber min={0} step={10} onChange={(value) => onChangeLow('G2', Number(value))} />
        </FormItem>
      </Form>
      <Divider />
      <Row>
        {
          calcHigh.map((item) =>
            <Col offset={1} span={3} key={item.N} style={{ minWidth: '180px' }}>
              <Card bordered={false} >
                <Statistic
                  title={item.N}
                  value={item.result}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowUpOutlined />}
                />
              </Card>
            </Col>)
        }
      </Row>
      <Divider />
      <Row>
        {
          calcLow.map((item) =>
            <Col offset={1} span={3} key={item.N} style={{ minWidth: '180px' }}>
              <Card bordered={false} >
                <Statistic
                  title={item.N}
                  value={item.result}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowDownOutlined />}
                />
              </Card>
            </Col>)
        }
      </Row>
    </Layout>
  );
};
export default Calc;