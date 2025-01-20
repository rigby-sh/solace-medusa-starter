'use client'

import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from 'react'

import { addCustomerAddress, updateCustomerAddress } from '@lib/data/customer'
import { userShippingAddressFormValidationSchema } from '@lib/util/validator'
import { HttpTypes } from '@medusajs/types'
import { SubmitButton } from '@modules/checkout/components/submit-button'
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
import { toast } from '@modules/common/components/toast'
import { Form, Formik } from 'formik'

import AddressFormFields from './address-form-fields'
import {
  defaultInitialValues,
  UserShippingAddressInputProps,
} from './address-form.consts'

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
  const [isLoading, setIsLoading] = useState(false)

  const [editFormState, editFormAction] = useActionState(
    updateCustomerAddress,
    {
      success: false,
      error: null,
      addressId: address?.id,
    }
  )

  const [addFormState, addFormAction] = useActionState(addCustomerAddress, {
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
      setIsLoading(false)
    }
  }, [editFormState, addFormState])

  useEffect(() => {
    if (isAddingNewAddress && addFormState.success) {
      toast('success', 'Address was added.')
    } else if (!isAddingNewAddress && editFormState.success) {
      toast('success', 'Address was updated.')
    }
  }, [editFormState, addFormState, isAddingNewAddress])

  const handleSubmit = (values: UserShippingAddressInputProps) => {
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value != null ? value.toString() : '')
    })

    setIsLoading(true)

    if (isAddingNewAddress) {
      startTransition(() => {
        addFormAction(formData)
      })
    } else {
      startTransition(() => {
        editFormAction(formData)
      })
    }
  }

  return (
    <Dialog open={isOpenDialog} onOpenChange={closeDialog}>
      <DialogPortal>
        <DialogOverlay />
        <Formik
          initialValues={address ?? defaultInitialValues}
          validationSchema={userShippingAddressFormValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={true}
        >
          <Form>
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
              </DialogBody>
              <DialogFooter>
                <SubmitButton
                  isLoading={isLoading}
                  className="w-full"
                  data-testid="save-address-button"
                >
                  Save
                </SubmitButton>
              </DialogFooter>
            </DialogContent>
          </Form>
        </Formik>
      </DialogPortal>
    </Dialog>
  )
}

export default AddressModalForm
