import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Space, Table, Typography } from 'antd';
const { Text } = Typography;
import type { TableColumnType, TableColumnsType} from 'antd';
import { RecordRow, FundsRecord, SummaryCol } from './type';
import jswz from './JSON/jswz.json'
import styles from './Organization.module.css'

const Organization: React.FC = () => {
  const [rows, setRows] = useState<RecordRow[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [columns, setColunms] = useState<TableColumnsType<RecordRow>>([])
  const [summary, setSummary] = useState<SummaryCol[]>([])
  const renderCell = useCallback((value: FundsRecord) => {
    return (value ? <Space>
      <Text className={styles.in}>{value.in}</Text>
      <Text className={styles.out}>{value.out}</Text>
    </Space> : <Text>- -</Text>)
  }, [])
  const renderTotal = useCallback((value: number) => {
    return (<Text className={`${value > 0 ? styles.in : styles.out}`}> {value} </Text>)
  }, [])
  useEffect(() => {
    if (jswz && rows.length === 0) {
      setLoading(true)
      const rows: RecordRow[] = []
      const columns: TableColumnType<RecordRow>[] = [{
        title: 'No.',
        dataIndex: 'key',
        align: 'center',
        width: 30,
      },]
      let dateKeys: string[] = []
      jswz.forEach((item, index) => {
        const records = item.records || []
        const fundRecords: { [property: string]: FundsRecord } = {
        }
        const all: FundsRecord = {
          in: 0,
          out: 0,
          total: 0
        }
        records.forEach((record) => {
          const funds: FundsRecord = {
            in: record.in || 0,
            out: record.out || 0,
            total: 0
          }
          if (!dateKeys.includes(record.date)) {
            dateKeys.push(record.date)
          }
          funds.total = funds.in - funds.out
          all.in += funds.in
          all.out += funds.out
          all.total += funds.total
          fundRecords[record.date] = funds
        })
        const row: RecordRow = {
          key: `${index + 1}`,
          organization: item.organization,
          rate: `${item.rate}%`,
          ...fundRecords,
          in: Number(all.in.toFixed(3)),
          out: Number(all.out.toFixed(3)),
          total: Number(all.total.toFixed(3)),
        }
        rows.push(row)
        setRows(rows)
      })
      dateKeys = dateKeys.sort((after: string, before: string) => {
        const datebefore = new Date(before).getTime()
        const dateafter = new Date(after).getTime()
        return datebefore - dateafter
      })
      const summary: SummaryCol[] = []
      if (rows.length > 0) {
        const row = rows[0]
        for (const key in row) {
          if (key !== 'key') {
            if (!dateKeys.includes(key)) {
              const column: TableColumnType<RecordRow> = {
                dataIndex: key,
                title: key,
                width: 80,
                sorter: true,
              }
              if (columns.length <= 1) {
                column.width = columns.length === 1 ? 200 : 60
                column.fixed = 'left'
              }
              if (key === 'in' || key === 'out') {
                column.className = styles[key]
                column.align = 'center'
              } else if (key === 'total') {
                column.render = renderTotal
                column.align = 'center'
              }
              columns.push(column)
            } else {
              if (!columns.find((item) => dateKeys.includes(`${item.dataIndex}`))) {
                dateKeys.forEach((item) => {
                  columns.push({
                    dataIndex: item,
                    title: item,
                    width: 80,
                    align: 'center',
                    render: renderCell
                  })
                })
              }
            }
          }
        }
        const summaryData: { [property: string]: number | string | FundsRecord } = {}
        dateKeys.forEach((key) => {
          summaryData[key] = {
            in: 0,
            out: 0,
            total: 0
          }
        })
        columns.forEach((item, index) => {
          const key = `${item.dataIndex}`
          rows.forEach((item) => {
            if (!isNaN(Number(item[key]))) {
              if (!summaryData[key]) {
                summaryData[key] = item[key] as number
              } else {
                summaryData[key] = (summaryData[key] as number) + (item[key] as number)
              }
            } else if (dateKeys.includes(key)) {
              const dateNum = summaryData[key] as FundsRecord
              const itemNum = item[key] as FundsRecord
              if (itemNum) {
                dateNum['in'] += itemNum['in']
                dateNum['out'] += itemNum['out']
                dateNum['total'] += itemNum['total']
                summaryData[key] = {
                  ...dateNum
                }
              }
            } else {
              summaryData[key] = '-'
            }
          })
          let renderValue: SummaryCol['value'] = '-'
          if (item.render) {
            renderValue = item.render(summaryData[key], item as RecordRow, index) as React.ReactNode
          } else {
            renderValue = <Space className={item.className}>{summaryData[key] as string}</Space>
          }
          if (!renderValue || key === 'key') {
            renderValue = '-'
          }
          summary.push({ index: summary.length, value: renderValue, key: key, align: item.align })
        })
        setSummary(summary)
        setColunms(columns)
      }
      setLoading(false)
    }
  }, [renderCell, renderTotal, rows.length,])
  const Summary = useMemo(() => {
    return <Table.Summary fixed>
      <Table.Summary.Row>
        {
          summary.map((item) =>
            <Table.Summary.Cell align={item.align} index={item.index} key={item.index}>{item.value}</Table.Summary.Cell>)
        }
      </Table.Summary.Row>
    </Table.Summary>
  }, [summary])
  return <Table columns={columns}
    dataSource={rows}
    scroll={{ x: 1300, }}
    bordered
    showSorterTooltip={false}
    pagination={{ pageSize: 50 }}
    loading={loading}
    summary={() => (Summary)} />
}
export default Organization;