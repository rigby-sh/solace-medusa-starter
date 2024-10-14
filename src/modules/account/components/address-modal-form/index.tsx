'use client'

import React, { useEffect, useState } from 'react'

import { addCustomerAddress, updateCustomerAddress } from '@lib/data/customer'
import { HttpTypes } from '@medusajs/types'
import { SubmitButton } from '@modules/checkout/components/submit-button'
import { Box } from '@modules/common/components/box'
import { Checkbox } from '@modules/common/components/checkbox'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@modules/common/components/dialog'
import { Label } from '@modules/common/components/label'
import { toast } from '@modules/common/components/toast'
import { useFormState } from 'react-dom'

import AddressFormFields from './address-form-fields'

type AddressModalFormProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress | null
  closeDialog: () => void
  isOpenDialog: boolean
  isAddingNewAddress: boolean
}

const AddressModalForm: React.FC<AddressModalFormProps> = ({
  region,
  address,
  closeDialog,
  isOpenDialog,
  isAddingNewAddress,
}) => {
  const [successState, setSuccessState] = useState(false)

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

  useEffect(() => {
    if (editFormState.success || addFormState.success) {
      setSuccessState(true)
    }
  }, [editFormState, addFormState])

  useEffect(() => {
    if (isAddingNewAddress && addFormState.success) {
      toast('success', 'Address was added.')
    } else if (!isAddingNewAddress && editFormState.success) {
      toast('success', 'Address was updated.')
    }
  }, [editFormState, addFormState, isAddingNewAddress])

  return (
    <Dialog open={isOpenDialog} onOpenChange={closeDialog}>
      <DialogPortal>
        <DialogOverlay />
        <form action={isAddingNewAddress ? addFormAction : editFormAction}>
          <DialogContent
            className="max-h-full max-w-[654px] !rounded-none border border-action-primary small:max-h-[724px]"
            aria-describedby={undefined}
          >
            <DialogTitle>
              <DialogHeader className="flex items-center text-xl text-basic-primary small:text-2xl">
                {isAddingNewAddress
                  ? 'Add new address'
                  : 'Edit shipping address'}
                <DialogClose className="right-4" />
              </DialogHeader>
            </DialogTitle>

            <DialogBody className="overflow-y-auto p-4 small:p-5">
              <AddressFormFields
                address={address}
                isAddingNewAddress={isAddingNewAddress}
                region={region}
              />
              {editFormState.error && (
                <div className="py-2 text-sm text-negative">
                  {editFormState.error}
                </div>
              )}

              <Box className="my-6 flex items-center gap-x-2">
                <Checkbox
                  id="is_default_shipping"
                  name="is_default_shipping"
                  defaultChecked={address?.is_default_shipping}
                />
                <Label
                  htmlFor="is_default_shipping"
                  className="cursor-pointer !text-md"
                >
                  Default shipping address
                </Label>
              </Box>
            </DialogBody>
            <DialogFooter>
              <SubmitButton className="w-full">Save</SubmitButton>
            </DialogFooter>
          </DialogContent>
        </form>
      </DialogPortal>
    </Dialog>
  )
}

export default AddressModalForm
