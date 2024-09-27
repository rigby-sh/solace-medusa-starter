import React from 'react'

import { HttpTypes } from '@medusajs/types'

import AddAddress from '../address-card/add-address'
import EditAddress from '../address-card/edit-address-modal'

type AddressBookProps = {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
}

const AddressBook: React.FC<AddressBookProps> = ({ customer, region }) => {
  return (
    <div className="w-full">
      <div className="lg:grid-cols-2 mt-4 grid flex-1 grid-cols-1 gap-4">
        <AddAddress region={region} />
        {customer.addresses.map((address) => {
          return (
            <EditAddress region={region} address={address} key={address.id} />
          )
        })}
      </div>
    </div>
  )
}

export default AddressBook
