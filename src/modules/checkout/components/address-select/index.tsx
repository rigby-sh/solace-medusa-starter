import React from 'react'

import { useAddressSelect } from '@lib/hooks/usa-address-select'
import { HttpTypes } from '@medusajs/types'
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
  DialogTitle,
  DialogTrigger,
} from '@modules/common/components/dialog'
import { ArrowLeftIcon } from '@modules/common/icons'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import EditAddressForm from '../edit-address-form'
import NewAddressForm from '../new-address-form'
import AddressesList from './addresses-list'

type AddressSelectProps = {
  addresses: HttpTypes.StoreCustomerAddress[]
  addressInput: HttpTypes.StoreCartAddress | null
  cart: HttpTypes.StoreCart | null
  onSelect: (
    address: HttpTypes.StoreCartAddress | undefined,
    email?: string
  ) => void
}

const AddressSelect: React.FC<AddressSelectProps> = ({
  addresses,
  addressInput,
  cart,
  onSelect,
}) => {
  const {
    formRef,
    editFormRef,
    isOpen,
    choosenAddressId,
    setChoosenAddressId,
    editAddress,
    setEditAddress,
    editingSuccessState,
    editingAddress,
    addNewAddress,
    setAddNewAddress,
    addingSuccessState,
    addFormState,
    updateFormState,
    handleOpenDialogChange,
    handleSaveClick,
    handleEditAddress,
    selectedAddress,
  } = useAddressSelect(addresses, addressInput, cart, onSelect)

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenDialogChange}>
      <DialogTrigger asChild>
        <Button variant="tonal" size="sm">
          Change
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className="max-h-full max-w-[600px] !rounded-none small:max-h-[654px]"
          aria-describedby={undefined}
        >
          <DialogHeader className="flex items-center gap-4 text-xl text-basic-primary small:text-2xl">
            {addNewAddress && (
              <Button
                variant="icon"
                size="sm"
                className="w-max"
                withIcon
                onClick={() => setAddNewAddress(false)}
              >
                <ArrowLeftIcon />
              </Button>
            )}
            {addNewAddress
              ? 'Add new shipping address'
              : editAddress
                ? 'Edit shipping address'
                : 'Select shipping address'}
            <DialogClose className="right-4" />
          </DialogHeader>
          <VisuallyHidden.Root>
            <DialogTitle>Select address modal</DialogTitle>
          </VisuallyHidden.Root>
          <DialogBody className="flex flex-col gap-6 overflow-y-auto p-4 small:p-5">
            {addNewAddress ? (
              <NewAddressForm
                ref={formRef}
                region={cart?.region}
                formState={addFormState}
              />
            ) : editAddress ? (
              <EditAddressForm
                ref={editFormRef}
                address={editingAddress}
                region={cart?.region}
                formState={updateFormState}
              />
            ) : (
              <AddressesList
                addresses={addresses}
                choosenAddressId={choosenAddressId}
                setChoosenAddressId={setChoosenAddressId}
                selectedAddress={selectedAddress}
                handleEditAddress={handleEditAddress}
                setEditAddress={setEditAddress}
                setAddNewAddress={setAddNewAddress}
              />
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              className="w-full"
              isLoading={addingSuccessState || editingSuccessState}
              onClick={handleSaveClick}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default AddressSelect
