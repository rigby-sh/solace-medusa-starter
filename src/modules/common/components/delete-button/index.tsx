import { useState } from 'react'

import { deleteLineItem } from '@lib/data/cart'
import { Spinner, Trash } from '@medusajs/icons'
import { clx } from '@medusajs/ui'
import { Button } from '@modules/common/components/button'

const DeleteButton = ({
  id,
  children,
  className,
  variant = 'tonal',
}: {
  id: string
  children?: React.ReactNode
  className?: string
  variant?: 'tonal' | 'text' | 'filled' | 'ghost' | 'destructive' | 'icon'
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <Button
      withIcon
      variant={variant}
      className={clx('bg-primary', className)}
      onClick={() => handleDelete(id)}
    >
      {isDeleting ? <Spinner className="animate-spin" /> : <Trash />}
      {children && <span>{children}</span>}
    </Button>
  )
}

export default DeleteButton
