'use client'

import React, { useEffect, useState } from 'react'

import { addCustomerAddress, updateCustomerAddress } from '@lib/data/customer'
import { HttpTypes } from '@medusajs/types'
import EditAddressForm from '@modules/checkout/components/edit-address-form'
import NewAddressForm from '@modules/checkout/components/new-address-form'
import { Button } from '@modules/common/components/button'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from '@modules/common/components/dialog'
import { useFormState } from 'react-dom'

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress | null
  closeDialog: () => void
  isOpenDialog: boolean
  isAddingNewAddress: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  closeDialog,
  isOpenDialog,
  isAddingNewAddress,
}) => {
  const [successState, setSuccessState] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const formRef = React.useRef<HTMLFormElement>(null)
  const [editFormState, editFormAction] = useFormState(updateCustomerAddress, {
    success: false,
    error: null,
    addressId: address?.id,
  })

  const [addFormState, addFormAction] = useFormState(addCustomerAddress, {
    addressName: 'shipping_address',
    success: false,
    error: null,
  })

  const close = () => {
    setSuccessState(false)
    closeDialog()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  const handleSubmit = () => {
    if (formRef.current) {
      setIsPending(true)

      if (!formRef.current.checkValidity()) {
        formRef.current.requestSubmit()
        setIsPending(false)
        return
      }

      const formData = new FormData(formRef.current)
      if (isAddingNewAddress) {
        addFormAction(formData)
      } else {
        editFormAction(formData)
      }
    }
  }

  useEffect(() => {
    if (
      editFormState.success ||
      editFormState.error ||
      addFormState.success ||
      addFormState.error
    ) {
      setIsPending(false)
    }
  }, [editFormState, addFormState])

  useEffect(() => {
    if (editFormState.success || addFormState.success) {
      setSuccessState(true)
    }
  }, [editFormState, addFormState])

  return (
    <Dialog open={isOpenDialog} onOpenChange={closeDialog}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className="max-h-full max-w-[654px] !rounded-none border border-action-primary small:max-h-[724px]"
          aria-describedby={undefined}
        >
          <DialogHeader className="flex items-center text-xl text-basic-primary small:text-2xl">
            {isAddingNewAddress ? 'Add new address' : 'Edit shipping address'}
            <DialogClose className="right-4" />
          </DialogHeader>

          <DialogBody className="flex flex-col gap-6 overflow-y-auto p-4 small:p-5">
            {isAddingNewAddress ? (
              <NewAddressForm
                ref={formRef}
                region={region}
                formState={addFormState}
              />
            ) : (
              <EditAddressForm
                ref={formRef}
                address={address}
                region={region}
                formState={editFormState}
              />
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              className="w-full"
              isLoading={isPending}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default EditAddress
