import { Spinner } from '@modules/common/icons'

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center text-ui-fg-base">
      <Spinner size={36} />
    </div>
  )
}
