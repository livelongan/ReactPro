import React from 'react';
import styles from './Purple.module.css'
import { BranchProps, GridProps } from './type';
import { BORAD_GRID } from './grids'
import { Content } from 'antd/es/layout/layout';
const OFFSET = 10
const BORAD_SIZE = 90

const init = {
  width: 300,
  height: 180,
}
interface IProp {
  branchs: BranchProps[]
  fate: GridProps | undefined
}
const BranchBorad: React.FC<IProp> = ({ branchs, fate }) => {
  return (
    fate && <Content>
      <svg width={init.width} height={init.height} className={styles.svg} viewBox={`0 0 ${init.width} ${init.height}`}>
        <g fill={'transparent'} stroke={'rgba(65,105,225,1)'} strokeWidth={1} fontSize={14} >
          {
            BORAD_GRID.map((grid) => {
              const bs = branchs.filter((b) => b.borad.value === grid.value)
              const x = grid.x * BORAD_SIZE + OFFSET
              const y = grid.y * BORAD_SIZE + OFFSET
              return <g key={`${grid.value}`}>
                {fate.branch.borad.value === grid.value && <rect x={x + 0} y={y + 0} width={12} height={12} fill={'rgba(24,200,24,1)'} />}
                <rect x={x} y={y} width={BORAD_SIZE - OFFSET} height={BORAD_SIZE - OFFSET} />
                {/* {bs.map((item) => <text key={`${item.x},${item.y}`} dx={10} dy={22} x={x + item.borad.x * 35} y={y + item.borad.y * 35} stroke='none' fill={'rgba(255,24,24,1)'}>{item.name}</text>)} */}
                {bs.map((item) => <text key={`${item.value}`} dx={10} dy={22} x={x + item.borad.x * 35} y={y + item.borad.y * 35} stroke='none' fill={'rgba(255,24,24,1)'}>{`d${item.value}`}</text>)}
              </g>
            })
          }
        </g>
      </svg >
    </Content>
  );
};
export default BranchBorad;