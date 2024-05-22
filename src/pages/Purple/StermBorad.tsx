import React, { useEffect, useState } from 'react';
import styles from './Purple.module.css'
import { BoradStem, GridProps } from './type';
import { BORAD_GRID } from './grids'
import { Content } from 'antd/es/layout/layout';
const OFFSET = 10
const BORAD_SIZE = 90

const init = {
  width: 300,
  height: 180,
}
interface IProp {
  stems: BoradStem[]
  fate: GridProps | undefined
}
const StermBorad: React.FC<IProp> = ({ stems, fate }) => {
  const [stemsData, setStemsData] = useState<BoradStem[]>([])
  useEffect(() => {
    if (fate) {
      setStemsData(stems)
    }
  }, [stems, fate])
  return (
    fate && <Content>
      <svg width={init.width} height={init.height} className={styles.svg} viewBox={`0 0 ${init.width} ${init.height}`}>
        <g fill={'transparent'} stroke={'rgba(65,105,225,1)'} strokeWidth={1} fontSize={14} >
          {
            BORAD_GRID.map((grid) => {
              const bs = stemsData.filter((b) => b.borad.value === grid.value)
              const x = grid.x * BORAD_SIZE + OFFSET
              const y = grid.y * BORAD_SIZE + OFFSET
              const width = BORAD_SIZE - OFFSET
              const height = BORAD_SIZE - OFFSET
              return <g key={`${grid.value}`}>
                <rect x={x} y={y} width={width} height={height} />
                {fate.stem.borad.value === grid.value && <rect x={x + 0} y={y + 0} width={12} height={12} fill={'rgba(24,200,24,1)'} />}
                {/* {bs.map((item) => <text key={`${item.value}`} dx={width / 2 - 10} dy={20} x={x + item.borad.x * width / 2} y={y + item.borad.y * height / 2} stroke='none' fill={'rgba(24,24,24,1)'}>{item.name}</text>)} */}
                {bs.map((item) => <text key={`${item.value}`} dx={width / 2 - 8} dy={20} x={x + item.borad.x * width / 2} y={y + item.borad.y * height / 2} stroke='none' fill={'rgba(24,24,24,1)'}>{`t${item.value}`}</text>)}
              </g>
            })
          }
        </g>
      </svg >
    </Content>
  );
};
export default StermBorad;