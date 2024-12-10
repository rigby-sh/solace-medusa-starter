'use client'

import React, { useState } from 'react'

import { Menu, Transition } from '@headlessui/react'
import { deleteCustomerAddress } from '@lib/data/customer'
import { cn } from '@lib/util/cn'
import { Button } from '@modules/common/components/button'
import { toast } from '@modules/common/components/toast'
import { EditIcon, TrashIcon, VerticalDotsIcon } from '@modules/common/icons'

export default function AddressActions({
  id,
  onEdit,
  setOpen,
}: {
  id: string
  onEdit: () => void
  setOpen: (open: boolean) => void
}) {
  const [removing, setRemoving] = useState(false)

  const handleEdit = () => {
    onEdit()
    setOpen(true)
  }

  const handleRemoveAddress = async (addressId: string) => {
    setRemoving(true)
    await deleteCustomerAddress(addressId)
    toast('success', 'Address was deleted.')
    setRemoving(false)
  }

  const actions = [
    {
      label: 'Edit address',
      icon: <EditIcon />,
      action: () => handleEdit(),
    },
    {
      label: 'Delete address',
      icon: <TrashIcon />,
      action: () => handleRemoveAddress(id),
    },
  ]

  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              className={cn(
                'flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-md text-basic-primary transition-all duration-200 ease-in-out hover:bg-fg-secondary active:bg-fg-secondary',
                { 'bg-fg-secondary': open }
              )}
              data-testid="address-actions-button"
            >
              <VerticalDotsIcon />
            </Menu.Button>
            <Transition
              enter="transition ease-in-out duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in-out duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Menu.Items className="absolute right-0 top-[25px] z-30 mt-7 min-w-[264px] border border-action-primary !bg-primary p-2">
                {actions.map((item) => (
                  <Menu.Item key={item.label}>
                    <Button
                      variant="text"
                      isLoading={removing}
                      className="h-full w-full justify-start gap-4 rounded-none !p-4 text-lg hover:bg-fg-secondary"
                      onClick={item.action}
                    >
                      {item.icon}
                      {item.label}
                    </Button>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}
