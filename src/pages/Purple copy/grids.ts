
const GRIDS = [
    { name: "命宫", value: 0 },
    { name: "兄弟", value: 1 },
    { name: "夫妻", value: 2 },
    { name: "子女", value: 3 },
    { name: "财帛", value: 4 },
    { name: "疾厄", value: 5 },
    { name: "迁移", value: 6 },
    { name: "奴仆", value: 7 },
    { name: "官禄", value: 8 },
    { name: "田宅", value: 9 },
    { name: "福德", value: 10 },
    { name: "父母", value: 11 }
]
const MAIN_START = [
    { name: "紫微", value: 0 },
    { name: "天机", value: 1 },
    { name: "太阳", value: 3 },
    { name: "武曲", value: 4 },
    { name: "天同", value: 5 },
    { name: "廉贞", value: 8 }
]
const NEXT_START = [
    { name: "天府", value: 0 },
    { name: "太阴", value: 1 },
    { name: "贪狼", value: 2 },
    { name: "巨门", value: 3 },
    { name: "天相", value: 4 },
    { name: "天梁", value: 5 },
    { name: "七杀", value: 6 },
    { name: "破军", value: 10 }
]
const STEMS = [
    { name: "甲", value: 0, tiger: 2, borad: { x: 0, y: 0, value: 0 }, },
    { name: "乙", value: 1, tiger: 4, borad: { x: 0, y: 1, value: 0 }, },
    { name: "丙", value: 2, tiger: 6, borad: { x: 0, y: 0, value: 0 }, },
    { name: "丁", value: 3, tiger: 8, borad: { x: 0, y: 1, value: 0 }, },
    { name: "戊", value: 4, tiger: 0, borad: { x: 0, y: 0, value: 0 }, },
    { name: "己", value: 5, tiger: 2, borad: { x: 0, y: 1, value: 0 }, },
    { name: "庚", value: 6, tiger: 4, borad: { x: 0, y: 0, value: 0 }, },
    { name: "辛", value: 7, tiger: 6, borad: { x: 0, y: 1, value: 0 }, },
    { name: "壬", value: 8, tiger: 8, borad: { x: 0, y: 0, value: 0 }, },
    { name: "癸", value: 9, tiger: 0, borad: { x: 0, y: 1, value: 0 }, },
]
// 子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥
const BRANCHS = [
    { x: 0, y: 3, name: '寅', borad: { x: 0, y: 0, value: 4 }, value: 2, sort: 0 },
    { x: 0, y: 2, name: '卯', borad: { x: 1, y: 0, value: 4 }, value: 3, sort: 1 },
    { x: 0, y: 1, name: '辰', borad: { x: 0, y: 0, value: 0 }, value: 4, sort: 2 },
    { x: 0, y: 0, name: '巳', borad: { x: 1, y: 0, value: 0 }, value: 5, sort: 3 },
    { x: 1, y: 0, name: '午', borad: { x: 0, y: 1, value: 3 }, value: 6, sort: 4 },
    { x: 2, y: 0, name: '未', borad: { x: 1, y: 1, value: 3 }, value: 7, sort: 5 },
    { x: 3, y: 0, name: '申', borad: { x: 0, y: 1, value: 4 }, value: 8, sort: 6 },
    { x: 3, y: 1, name: '酉', borad: { x: 1, y: 1, value: 4 }, value: 9, sort: 7 },
    { x: 3, y: 2, name: '戌', borad: { x: 0, y: 1, value: 0 }, value: 10, sort: 8 },
    { x: 3, y: 3, name: '亥', borad: { x: 1, y: 1, value: 0 }, value: 11, sort: 9 },
    { x: 2, y: 3, name: '子', borad: { x: 0, y: 0, value: 3 }, value: 0, sort: 10 },
    { x: 1, y: 3, name: '丑', borad: { x: 1, y: 0, value: 3 }, value: 1, sort: 11 },
]
const BORAD_GRID = [
    { x: 0, y: 0, value: 0, name: '火六', borad: 6 },
    { x: 1, y: 0, value: 1, name: '土五', borad: 5 },
    { x: 2, y: 0, value: 2, name: '木三', borad: 3 },
    { x: 1.5, y: 1, value: 3, name: '金四', borad: 4 },
    { x: 0.5, y: 1, value: 4, name: '水二', borad: 2 },
]
export {
    BRANCHS,
    STEMS,
    GRIDS,
    BORAD_GRID,
    MAIN_START,
    NEXT_START,
}