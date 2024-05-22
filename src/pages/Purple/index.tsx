import React, { useState, useCallback, useEffect } from 'react';
import type { DatePickerProps, RadioChangeEvent } from 'antd';
import { Form, Flex, Space, DatePicker, Radio, Layout } from 'antd';
import styles from './Purple.module.css'
import { BoradStem, BranchProps, FieldType, BranchGrid, StemProps, PurpleProps } from './type';
import FormItem from '../../component/FormItem';
import { BRANCHS, STEMS, GRIDS, MAIN_START, NEXT_START, BORAD_GRID } from './grids'
import lunisolar from 'lunisolar';
import BranchBorad from './BranchBorad';
import StermBorad from './StermBorad';
import Borad from './Borad';
const GRID_WIDTH = 80
const GRID_HEIGHT = 100
const OFFSET = 10

const init: FieldType = {
  boradWidth: 300,
  boradHeight: 180,
  size: 600,
  born: '1997-01-22 21:30',
  gender: 1,
}
const Purple: React.FC = () => {
  const [form] = Form.useForm()
  const [field, setField] = useState<FieldType>(init)
  const [branchs, setBranchs] = useState<BranchProps[]>([])
  const [fortuneGrids, setFortuneGrids] = useState<BranchGrid[]>([])
  const [fortuneMap] = useState<Map<number, BranchGrid>>(new Map())
  const [fateGrid, setFateGrid] = useState<BranchGrid>()
  const [stems, setStems] = useState<BoradStem[]>([])
  const [gridStems, setGridStems] = useState<StemProps[]>([])
  // const [stemBorad, setStemBorad] = useState<StemProps>()
  const [fateBorad, setFateBorad] = useState<StemProps>()
  // const [field, setField] = useState<FieldType>(init)
  // const onChangeBorn: DatePickerProps['onChange'] = (value, dateString) => {
  //   console.log('Selected Time: ', value);
  //   console.log('Formatted Selected Time: ', dateString);
  //   const born = dateString as string
  //   const data: FieldType = { ...field, born }
  //   setField(data)
  // };
  // const onChangeGender = (event: RadioChangeEvent) => {
  //   const gender = Number(event.target.value)
  //   const data: FieldType = { ...field, gender }
  //   setField(data)
  // };
  const getPurpleGrids = useCallback(() => {
    // 取模 阴+阳-
    const purpleGrids: PurpleProps[] = []
    if (fateGrid) {
      const day = lunisolar(field.born).lunar.day
      const borad = BORAD_GRID.find((borad) => fateGrid.stem.borad.value === borad.value)
      if (borad) {
        const ceil = Math.ceil(day / borad.borad)
        const brow = ceil * borad.borad - day
        const real = ceil - brow
        const coords = branchs.slice(0, real).reverse().concat(branchs.slice(real).reverse())
        MAIN_START.forEach((start) => {
          const findBranch = coords[start.value]
          if (findBranch) {
            purpleGrids.push({ ...start, branch: { ...findBranch } })
          }
        })
        // const coords = branchs.slice(real - 1).concat(branchs.slice(0, real + 1))
      }
    }
    return purpleGrids
  }, [branchs, fateGrid, field.born])
  const getBodyGrid = useCallback((begin: number, end: number) => {
    const bodyCoords = branchs.slice(begin - 1).concat(branchs.slice(0, begin - 1))
    const bodyGrid = bodyCoords.find((item, index) => index === end - 1)
    return bodyGrid ? { ...bodyGrid } : undefined
  }, [branchs])
  const getFateGrids = useCallback((begin: number, end: number) => {
    const fateCoords = branchs.slice(0, begin).reverse().concat(branchs.slice(begin).reverse())
    const fateGrids = fateCoords.slice(0, end).reverse().concat(fateCoords.slice(end).reverse())
    const grids = [...GRIDS].reverse()
    grids.unshift({ ...GRIDS[0] })
    return fateGrids.map((item, index) => {
      const grid = grids[index]
      return { ...grid, branch: { ...item } }
    })
  }, [branchs])
  const getGridStems = useCallback(() => {
    const stems: StemProps[] = []
    const yearStem = lunisolar(field.born).char8.year.stem
    const stem = STEMS.find((item) => item.value === yearStem.value)
    if (stem) {
      const yearStems = STEMS.slice(stem.tiger).concat(STEMS.slice(0, stem.tiger))
      branchs.forEach((item, index) => {
        const stemsIndex = index <= yearStems.length - 1 ? index : Math.abs(index - yearStems.length)
        const bit = yearStems[stemsIndex]
        const tiger = yearStems[bit.tiger]
        stems.push({
          ...bit,
          branch: { ...item },
          tiger: {
            name: tiger.name,
            value: tiger.value
          }
        })
      })
      setGridStems(stems)
    }
  }, [branchs, field.born])
  const getFortuneGrids = useCallback(() => {
    // 命宫:找到寅宫为1顺数月为子时，再逆数生时天干
    // 身宫:找到寅宫为1顺数月为子时，再顺数生时天干
    // 排宫位,天干
    if (gridStems.length === 0) return
    const fortuneGrids: BranchGrid[] = []
    const hourBrach = lunisolar(field.born).char8.hour.branch
    const month = lunisolar(field.born).lunar.month
    const end = hourBrach.value + 1
    const fateGrids = getFateGrids(month, end)
    const bodyGrid = getBodyGrid(month, end)
    branchs.forEach((branch) => {
      const grid = fateGrids.find((item) => item.branch.value === branch.value)
      const stem = gridStems.find((item) => item.branch.value === branch.value)
      if (stem && grid) {
        const fortune = {
          ...branch,
          stem,
          grid,
          isBody: bodyGrid && bodyGrid.value === branch.value || false,
        }
        fortuneGrids.push(fortune)
        fortuneMap.set(fortune.value, fortune)
      }
    })
    setFortuneGrids(fortuneGrids)
    if (fortuneGrids.length > 0) {
      setFateGrid(fortuneGrids[0])
    }
  }, [branchs, field.born, fortuneMap, getBodyGrid, getFateGrids, gridStems])
  useEffect(() => {
    if (fateGrid) {
      const purpleGrids = getPurpleGrids()
      console.log(purpleGrids)
      console.log(fortuneMap)
      purpleGrids.forEach((item) => {
        const fortune = fortuneMap.get(item.branch.value)
        console.log(item)
        console.log(fortune)
        if (fortune) {
          fortune.purple = {...item}
        }
      })
    }
  }, [fateGrid, fortuneMap, getPurpleGrids])
  const getBranchs = useCallback(() => {
    if (branchs.length === 0) {
      const data: BranchProps[] = []
      BRANCHS.forEach((item) => {
        data.push({
          ...item,
          coordx: item.x * GRID_WIDTH + OFFSET,
          coordy: item.y * GRID_HEIGHT + OFFSET
        },)
      })
      setBranchs(data)
    }
  }, [branchs.length])
  useEffect(() => {
    if (branchs.length > 0) {
      if (gridStems.length === 0) {
        getGridStems()
      }
      if (fortuneGrids.length === 0) {
        getFortuneGrids()
      }
    } else {
      getBranchs()
    }
  }, [branchs, getFortuneGrids, getGridStems, fortuneGrids.length, gridStems.length, getBranchs])
  useEffect(() => {
    if (fateGrid) {
      const stems: BoradStem[] = STEMS
      const start = fateGrid.borad.value
      const boradGrids = BORAD_GRID.slice(start).concat(BORAD_GRID.slice(0, start))
      boradGrids.forEach((item, index) => {
        const one = stems.find((item) => item.value === index * 2)
        const two = stems.find((item) => item.value === index * 2 + 1)
        if (one) {
          one.borad.value = item.value
        }
        if (two) {
          two.borad.value = item.value
        }
      })
      setStems(stems)
    }
  }, [fateGrid, field.born, fortuneGrids])
  return (
    <Flex gap="large">
      {/* <Form
        form={form}
        name="purple"
        labelAlign="right"
        colon={false}
        initialValues={field}
        layout="horizontal"
        style={{ width: '240px' }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
      >
        <FormItem label="Time" name={'dss'} rules={[{ required: true }]}>
          <DatePicker
            showTime
            // value={field.date}
            onChange={onChangeBorn}
            format={'YYYY-MM-DD HH:mm'}
          />
        </FormItem>
        <FormItem label="Radio" name="gender" rules={[{ required: true }]}>
          <Radio.Group onChange={onChangeGender} value={field.gender}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
          </Radio.Group>
        </FormItem>
      </Form> */}
      <Layout>
        <svg width={field.size} height={field.size} className={styles.svg} viewBox={`0 0 ${field.size} ${field.size}`}>
          <g fill={'transparent'} stroke={'rgba(65,105,225,1)'} strokeWidth={1} fontSize={12} transform-origin={field.size / 2}>
            {
              branchs.map((item) => {
                const x = item.coordx
                const y = item.coordy
                return <g key={`${item.value}`} >
                  <rect x={x} y={y} width={GRID_WIDTH} height={GRID_HEIGHT} />
                </g>
              })
            }
            {
              fortuneGrids.map((item) => {
                const x = item.coordx
                const y = item.coordy
                const offset_stem = 22
                const offset_branch = 8
                return <g key={`${item.value}`} stroke='none' >
                  <text dx={GRID_WIDTH - offset_branch} dy={GRID_HEIGHT - 16} x={x} y={y} fill={'rgba(200,102,1,1)'} stroke='none'>{item.name}</text>
                  <text dx={GRID_WIDTH - offset_stem} dy={GRID_HEIGHT - 16} x={x} y={y} fill={'rgba(100,102,1,1)'}>{item.stem.name}</text>
                  <text dx={8} dy={4} x={x} y={y} fill={'rgba(200,24,200,1)'}>{item.grid.name}</text>
                  {item.isBody && <rect x={x + 1} y={y + 35} width={14} height={14} fill={'rgba(255,24,24,1)'} />}
                  {item.isBody && <text fontSize={12} dx={8} dy={36} x={x} y={y} fill={'rgba(255,255,255,1)'}>{'身'}</text>}
                  {item.purple && <text dx={22} dy={4} x={x} y={y} fill={'rgba(100,20,200,1)'} stroke='none'>{item.purple.name}</text>}
                </g>
              })
            }
          </g>
        </svg >
      </Layout>
      <Layout>
        {/* <BranchBorad fate={fateGrid} branchs={branchs} />
        <StermBorad fate={fateGrid} stems={stems} />
        <Borad fate={fateGrid} /> */}
      </Layout>
    </Flex >
  );
};
export default Purple;