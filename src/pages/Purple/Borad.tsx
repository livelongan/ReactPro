import React from 'react';
import styles from './Purple.module.css'
import { GridProps } from './type';
import { BORAD_GRID } from './grids'
import { Content } from 'antd/es/layout/layout';
const OFFSET = 10
const BORAD_SIZE = 90

const init = {
  width: 300,
  height: 180,
}
interface IProp {
  fate: GridProps | undefined
}
const Borad: React.FC<IProp> = ({ fate }) => {
  return (
    fate && <Content>
      <svg width={init.width} height={init.height} className={styles.svg} viewBox={`0 0 ${init.width} ${init.height}`}>
        <g fill={'transparent'} stroke={'rgba(65,105,225,1)'} strokeWidth={1} fontSize={14} >
          {
            BORAD_GRID.map((grid) => {
              const x = grid.x * BORAD_SIZE + OFFSET
              const y = grid.y * BORAD_SIZE + OFFSET
              const width = BORAD_SIZE - OFFSET
              const height = BORAD_SIZE - OFFSET
              return <g key={`${grid.value}`}>
                <rect x={x} y={y} width={width} height={height} />
                {fate.stem.borad.value === grid.value && <rect x={x + 0} y={y + 0} width={12} height={12} fill={'rgba(24,200,24,1)'} />}
                <text key={`${grid.value}`} dx={10} dy={20} x={x} y={y + grid.y * 10} stroke='none' fill={'rgba(24,24,24,1)'}>{grid.name}</text>)
              </g>
            })
          }
        </g>
      </svg >
    </Content>
  );
};
export default Borad;