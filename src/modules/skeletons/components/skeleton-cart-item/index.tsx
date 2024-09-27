import { Table } from '@medusajs/ui'

const SkeletonCartItem = () => {
  return (
    <Table.Row className="m-4 w-full">
      <Table.Cell className="w-24 p-4 !pl-0">
        <div className="rounded-large flex h-24 w-24 animate-pulse bg-gray-200 p-4" />
      </Table.Cell>
      <Table.Cell className="text-left">
        <div className="flex flex-col gap-y-2">
          <div className="h-4 w-32 animate-pulse bg-gray-200" />
          <div className="h-4 w-24 animate-pulse bg-gray-200" />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-2">
          <div className="h-8 w-6 animate-pulse bg-gray-200" />
          <div className="h-10 w-14 animate-pulse bg-gray-200" />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex gap-2">
          <div className="h-6 w-12 animate-pulse bg-gray-200" />
        </div>
      </Table.Cell>
      <Table.Cell className="!pr-0 text-right">
        <div className="flex justify-end gap-2">
          <div className="h-6 w-12 animate-pulse bg-gray-200" />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export default SkeletonCartItem
