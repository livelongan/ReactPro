import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LineProp } from './type'
interface IProp {
    size: number,
    radius: number
    color?: string
}
const Degree: React.FC<IProp> = ({ size, radius, color = 'rgba(20, 20, 120, 1)' }) => {
    const [degrees, setDegrees] = useState<LineProp[]>([])
    const center = size / 2
    const offset = (size - 2 * radius) / 2
    const hypotenuse = (distance: number, angle: number) => {
        //获得弧度
        const radian = angle * Math.PI / 180;
        const coord = {
            x: -1, y: 1
        }
        if (angle >= 0 && angle < 90) {
            coord.y = -1
        } else if (angle > 90 && angle <= 180) {
            coord.x = 1
            coord.y = -1
        } else if (angle > 180 && angle <= 270) {
            coord.x = 1
        }
        return {
            cos: Math.cos(radian) * distance, //邻边
            sin: Math.sin(radian) * distance,//对边
            tan: Math.tan(radian) * distance,
            x: coord.x,
            y: coord.y,
        };
    }
    const getDegrees = useCallback(() => {
        const radians: LineProp[] = []
        const dis = offset + radius
        for (let index = 0; index < 36; index++) {
            const angle = index * 10
            const shortAngle = angle + 5
            const longSize = hypotenuse(radius, angle)
            const long = hypotenuse(radius + 16, angle)
            const longText = hypotenuse(radius + 28, angle)

            const shortSide = hypotenuse(radius, shortAngle)
            const short = hypotenuse(radius + 6, shortAngle)
            const shortText = hypotenuse(radius + 18, shortAngle)
            radians.push({
                angle: angle,
                long: {
                    angle: angle,
                    x: dis - longSize.cos,
                    y: dis - longSize.sin,
                    x1: dis - long.cos,
                    y1: dis - long.sin,
                    textx: dis - longText.cos,
                    texty: dis - longText.sin,
                    dx: -6,
                    dy: 4,
                },
                short: {
                    angle: shortAngle,
                    x: dis - shortSide.cos,
                    y: dis - shortSide.sin,
                    x1: dis - short.cos,
                    y1: dis - short.sin,
                    textx: dis - shortText.cos,
                    texty: dis - shortText.sin,
                    dx: -5,
                    dy: 3,
                },

            })
        }
        setDegrees(radians)
    }, [offset, radius])
    const TriangleLine = useMemo(() => {
        const fillColor = 'rgba(205,98,98,0.2)'
        const offset = (size - Math.sqrt(3) * radius) / 2
        const a = { x: (size - 2 * radius) / 2 + radius, y: (size - 2 * radius) / 2 }
        const b = { x: offset, y: (size - 2 * radius) / 2 + 3 / 2 * radius }
        const c = { x: offset + Math.sqrt(3) * radius, y: b.y }
        return <g stroke='none' fill={color} transform={`rotate(30)`} >
            <line x1={center} y1={center} x2={a.x} y2={a.y} stroke={'rgba(255,98,98,0.6)'} />
            <line x1={center} y1={center} x2={c.x} y2={c.y} stroke={'rgba(255,98,98,0.6)'} />
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`} fill={fillColor} />
            <text dx={-10} dy={30} x={a.x} y={a.y} fill={color} >1/3</text>
            <text dx={-30} dy={-10} x={c.x} y={c.y} fill={color} >2/3</text>
        </g>
    }, [center, color, radius, size])
    const SquareLine = useMemo(() => {
        const fillColor = 'rgba(20, 20, 120, 0.6)'
        const a = { x: offset + radius, y: offset }
        const b = { x: offset, y: offset + radius }
        const c = { x: offset + radius, y: radius * 2 + offset }
        const d = { x: radius * 2 + offset, y: offset + radius }
        return <>
            {/* <use href="#arrow" x={a.x} y={a.y} fill={fillColor} stroke="none" />
          <use href="#arrow" x={b.x} y={b.y} fill={fillColor} stroke="none" transform={`rotate(90)`}/>
          <use href="#arrow" x={c.x} y={c.y} fill={fillColor} stroke="none" />
          <use href="#arrow" x={d.x} y={d.y} fill={fillColor} stroke="none" /> */}
            <g stroke={fillColor} strokeWidth={1} opacity={0.3} shapeRendering={'crispEdges'}>
                <polyline points={`${b.x},${b.y} ${d.x},${d.y}`} />
                <polyline points={`${a.x},${a.y} ${c.x},${c.y}`} />
            </g>
            <g stroke='none' fill={fillColor} shapeRendering={'crispEdges'}>
                {/* <use href="#arrow" x={offset} y={offset} fill={fillColor} /> */}
                <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} opacity={0.2} />
                <text dx={-10} dy={20} x={a.x} y={a.y}>1/4</text>
                <text dx={-25} dy={5} x={d.x} y={d.y}>2/4</text>
                <text dx={-10} dy={-10} x={c.x} y={c.y}>3/4</text>
            </g>
        </>
    }, [offset, radius])
    useEffect(() => {
        getDegrees()
    }, [getDegrees, offset, radius])
    return (
        <g fill={'transparent'} stroke={'rgba(255,80,80,1)'} strokeWidth={1} textAnchor='center'>
            <symbol id="arrow" width={10} height={10}>
                <path fill="green" d="M-5,-5 L10,0 -5,5 0,0 Z" />
            </symbol>
            <circle cx={center} cy={center} r={radius} strokeWidth={0.5} />
            {
                degrees.map(
                    (item) =>
                        <React.Fragment key={item.angle}>
                            <g textRendering={'inherit'}>
                                <polyline points={`${item.long.x},${item.long.y} ${item.long.x1},${item.long.y1}`} />
                                <text dx={item.long.dx} dy={item.long.dy} x={item.long.textx} y={item.long.texty} stroke='none' fill={color}>
                                    {item.long.angle}
                                </text>
                                <polyline points={`${item.short.x},${item.short.y} ${item.short.x1},${item.short.y1}`} />
                                {
                                    radius >= 280 && <text dx={item.short.dx} dy={item.short.dy} x={item.short.textx} y={item.short.texty} stroke='none' fill={color}>
                                        {item.short.angle}
                                    </text>
                                }
                            </g>
                        </React.Fragment>
                )
            }
            {SquareLine}
            {TriangleLine}
        </g>
    );
};
export default Degree;