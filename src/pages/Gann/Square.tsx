import React, { useCallback, useEffect, useState } from 'react';
import * as mathjs from 'mathjs'
import { FieldType, SquareProp } from './type'
import styles from './Gann.module.css'
const INIT_SQUARE: SquareProp = {
    x: 0,
    y: 0,
    coordx: 0,
    coordy: 0,
    text: 0,
    spacial: false
}
interface IProp {
    field: FieldType
    size: number
    center: number
    color?: string
}
const Square: React.FC<IProp> = ({ field, size, center, color = 'rgba(20, 20, 120, 1)' }) => {
    const [squares, setSquares] = useState<SquareProp[]>([])
    const setSquaerProps = useCallback((props: SquareProp, squares: SquareProp[], step: number) => {
        const add = mathjs.add(squares[squares.length - 1].text, step)
        const format = mathjs.format(add, { precision: 14 })
        props.text = Number(format)
        if (props.x === 0 || props.y === 0) {
            props.spacial = true
        } else if (Math.abs(props.x) === Math.abs(props.y)) {
            props.spacial = true
        }
    }, [])
    const isFind = useCallback((digtal: number) => {
        if (field.find === 0) return false
        return digtal >= field.find - field.offset && digtal <= field.find + field.offset
    }, [field.find, field.offset])
    const getSquares = useCallback((field: FieldType) => {
        const { price, step } = field
        const squares: SquareProp[] = []
        const offset = size / 2
        const startX = center - offset
        const startY = center - offset
        squares.push({
            x: 0,
            y: 0,
            text: 1 * price,
            coordx: startX,
            coordy: startY,
            spacial: false
        })
        for (let index = 1; index < field.level; index++) {
            let last = squares[squares.length - 1]
            const times = index + 1
            for (let k = last.y; k < times; k++) {
                const props = { ...INIT_SQUARE, x: last.x - 1, y: k }
                props.coordx = startX + props.x * size
                props.coordy = startY - props.y * size
                setSquaerProps(props, squares, step)
                squares.push(props)
            }
            last = squares[squares.length - 1]
            for (let k = last.x + 1; k < times; k++) {
                const props = { ...INIT_SQUARE, x: k, y: last.y }
                props.coordx = startX - props.x * size
                props.coordy = startY + props.y * size
                setSquaerProps(props, squares, step)
                squares.push(props)
            }
            last = squares[squares.length - 1]
            for (let k = last.y - 1; k > -times; k--) {
                const props = { ...INIT_SQUARE, x: last.x, y: k }
                props.coordx = startX + props.x * size
                props.coordy = startY - props.y * size
                setSquaerProps(props, squares, step)
                squares.push(props)
            }
            last = squares[squares.length - 1]
            for (let k = last.x - 1; k > -times; k--) {
                const props = { ...INIT_SQUARE, x: k, y: last.y }
                props.coordx = startX - props.x * size
                props.coordy = startY + props.y * size
                setSquaerProps(props, squares, step)
                squares.push(props)
            }
        }
        setSquares(squares)
    }, [center, setSquaerProps, size])
    useEffect(() => {
        getSquares(field)
    }, [field, getSquares])
    return (
        <g stroke={'none'} fontWeight={600} className={styles.squares}>
            {
                squares.map((item) =>
                    <g key={item.text} className={`${isFind(item.text) ? styles.find : ''} ${item.spacial ? styles.spacial : ''}`}>
                        <rect x={item.coordx} y={item.coordy} width={size} height={size} />
                        <text dx={size / 2 - 12} dy={size / 2 + 5} x={item.coordx} y={item.coordy} fill={color} stroke='none'>{item.text}</text>
                    </g>
                )
            }
        </g>
    );
};
export default Square;