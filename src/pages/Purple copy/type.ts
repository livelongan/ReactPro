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
    sort: number
    coordx: number
    coordy: number
    borad: {
        x: number
        y: number
        value: number
    }
}
export type GridProps = {
    name: string
    value: number
    branch: BranchProps
    stem: StemProps
    isBody?: boolean
    purple: {
        name: string
        value: number
    }
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
export type BoradStem = {
    name: string
    value: number
    borad: {
        x: number
        y: number
        value: number
    }
}