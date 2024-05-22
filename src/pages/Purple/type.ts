export type FieldType = {
    boradWidth: number
    boradHeight: number
    size: number
    // date: dayjs.Dayjs
    born: string
    gender: number
}
export type BranchProps = {
    x: number
    y: number
    name: string
    value: number
    coordx: number
    coordy: number
    borad: {
        x: number
        y: number
        value: number
    }
    sort: number
}
export type StemProps = {
    name: string
    value: number
    branch: BranchProps
    borad: {
        x: number
        y: number
        value: number
    }
    tiger: {
        name: string
        value: number
    }
}
export type GridProps = {
    name: string
    value: number
    branch: BranchProps
}
export type PurpleProps = {
    name: string
    value: number
    branch: BranchProps
}
export type BoradStem = {
    name: string
    value: number
    borad: {
        x: number
        y: number
        value: number
    }
}
export interface BranchGrid extends BranchProps {
    stem: StemProps
    grid: GridProps
    purple?: PurpleProps
    isBody?: boolean
}