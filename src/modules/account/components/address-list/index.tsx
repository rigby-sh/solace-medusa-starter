'use client'

import { HttpTypes } from '@medusajs/types'
import AddressActions from '@modules/checkout/components/address-actions'
import { Badge } from '@modules/common/components/badge'

type AddressListProps = {
  address: HttpTypes.StoreCustomerAddress
  openDialog: (open: boolean) => void
  setAddressToEdit: (address: HttpTypes.StoreCustomerAddress) => void
}

const AddressList: React.FC<AddressListProps> = ({
  address,
  openDialog,
  setAddressToEdit,
}) => {
  return (
    <>
      <div className="bg-primary p-2">
        <div className="flex gap-4 p-4">
          <div className="flex-grow">
            <div className="mb-4">
              <p className="text-basic-primary">
                {address.first_name} {address.last_name}
              </p>
              <p className="text-md text-secondary">
                {address.company && `${address.company}, `}
                {address.address_1}, {address.postal_code}
              </p>
              <p className="text-md text-secondary">
                {address.city}, {address.country_code}
              </p>
              <p className="text-md text-secondary">{address.phone}</p>
            </div>
            {address.is_default_shipping && (
              <Badge variant="outline" label="Default address" />
            )}
          </div>
          <div>
            <AddressActions
              id={address.id}
              setOpen={openDialog}
              onEdit={() => setAddressToEdit(address)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AddressList
