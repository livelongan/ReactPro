
import type { AlignType } from 'rc-table/lib/interface';
export interface FundsRecord {
    in: number
    out: number
    total: number
}
export type FieldType = FundsRecord | string | number | React.Key
export interface RecordRow {
    [proprty: string]: FieldType
    organization: React.Key
    rate: string
    in: number
    out: number
    total: number
}
export interface SummaryCol {
    index: number,
    value: React.ReactNode | string | number,
    key: string
    align?: AlignType
}
