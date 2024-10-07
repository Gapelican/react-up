import { useEffect, useState } from 'react'
import { Payment, columns } from './columns'
import { DataTable } from './data-table'

export function DemoPage() {
  const [data, setData] = useState<Payment[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [controlledPageIndex, setControlledPageIndex] = useState(0)
  const [controlledPageSize, setControlledPageSize] = useState(10)

  const fetchData = async ({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number
    pageSize: number
  }) => {
    const response = await fetch(
      `http://localhost:3001/payments?_page=${pageIndex + 1}&_limit=${pageSize}`,
    )
    const data = await response.json()

    const totalCount = response.headers.get('X-Total-Count')

    setData(data)
    setPageCount(Math.ceil(Number(totalCount) / pageSize))
  }

  useEffect(() => {
    fetchData({ pageIndex: controlledPageIndex, pageSize: controlledPageSize })
  }, [controlledPageIndex, controlledPageSize])

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        pageCount={pageCount}
        fetchData={fetchData}
        controlledPageIndex={controlledPageIndex}
        controlledPageSize={controlledPageSize}
      />
    </div>
  )
}
