'use client'

import { useState } from 'react'

import useToggleState from '@lib/hooks/use-toggle-state'
import { cn } from '@lib/util/cn'
import { HttpTypes } from '@medusajs/types'
import { Button } from '@modules/common/components/button'
import { PlusIcon } from '@modules/common/icons'

import AddressList from '../address-list'
import AddressModalForm from '../address-modal-form'

type AddressBookProps = {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
}

const AddressBook: React.FC<AddressBookProps> = ({ customer, region }) => {
  const [addressToEdit, setAddressToEdit] =
    useState<HttpTypes.StoreCustomerAddress | null>(null)
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false)

  const {
    state: isDialogOpen,
    open: openDialog,
    close: closeDialog,
  } = useToggleState(false)

  const handleAddNewAddress = () => {
    setIsAddingNewAddress(true)
    setAddressToEdit(null)
    openDialog()
  }

  const handleEditAddress = (address: HttpTypes.StoreCustomerAddress) => {
    setIsAddingNewAddress(false)
    setAddressToEdit(address)
    openDialog()
  }

  const hasNoAddresses = customer.addresses.length === 0

  return (
    <>
      <AddressModalForm
        region={region}
        closeDialog={closeDialog}
        isOpenDialog={isDialogOpen}
        address={addressToEdit}
        isAddingNewAddress={isAddingNewAddress}
      />

      <div className="grid w-full grid-cols-1 gap-4 medium:gap-6 xl:ml-auto xl:max-w-[900px]">
        <div className="items-center justify-between medium:flex">
          <h1 className="text-xl medium:text-2xl">Shipping Addresses</h1>
          <Button
            variant="tonal"
            className={cn(
              'hidden medium:flex',
              hasNoAddresses && 'medium:hidden'
            )}
            size="sm"
            leftIcon={<PlusIcon />}
            onClick={handleAddNewAddress}
            data-testid="add-new-address-button"
          >
            Add new address
          </Button>
        </div>
        {hasNoAddresses ? (
          <div className="mx-auto py-6 text-center medium:max-w-[450px]">
            <p className="text-xl text-basic-primary">
              No saved shipping addresses
            </p>
            <p className="mt-2 text-md text-secondary">
              You currently have no saved shipping addresses. Add an address to
              make your checkout process quicker and easier.
            </p>
            <Button
              variant="tonal"
              size="sm"
              className="mt-6 w-full"
              onClick={handleAddNewAddress}
            >
              Add address
            </Button>
          </div>
        ) : (
          customer.addresses.map((address) => {
            return (
              <AddressList
                address={address}
                openDialog={() => handleEditAddress(address)}
                key={address.id}
                setAddressToEdit={setAddressToEdit}
                region={region}
              />
            )
          })
        )}

        <Button
          variant="tonal"
          className={cn('w-fit medium:hidden', hasNoAddresses && 'hidden')}
          size="sm"
          leftIcon={<PlusIcon />}
          onClick={handleAddNewAddress}
          data-testid="add-new-address-button"
        >
          Add new address
        </Button>
      </div>
    </>
  )
}

export default AddressBook
