export interface LineProp {
    angle: number
    long: {
        angle: number
        x: number
        y: number
        x1: number
        y1: number
        textx: number
        texty: number
        dx: number
        dy: number
    }
    short: {
        angle: number
        x: number
        y: number
        x1: number
        y1: number
        textx: number
        texty: number
        dx: number
        dy: number
    }
}
export interface SquareProp {
    x: number
    y: number
    coordx: number
    coordy: number
    text: number
    spacial: boolean
}
export type FieldType = {
    price: number
    step: number
    find: number
    offset: number
    level: number
    circle: number
    size: number
    block: number 
}