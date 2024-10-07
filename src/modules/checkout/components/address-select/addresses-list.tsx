import React from 'react'

import { HttpTypes } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Label } from '@modules/common/components/label'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupRoot,
} from '@modules/common/components/radio'
import { Text } from '@modules/common/components/text'
import { PlusIcon } from '@modules/common/icons'

import AddressActions from '../address-actions'

type AddressListProps = {
  addresses: HttpTypes.StoreCustomerAddress[]
  choosenAddressId: string | null
  setChoosenAddressId: (id: string) => void
  selectedAddress: HttpTypes.StoreCustomerAddress | undefined
  handleEditAddress: (id: string) => void
  setEditAddress: (edit: boolean) => void
  setAddNewAddress: (add: boolean) => void
}

const AddressesList: React.FC<AddressListProps> = ({
  addresses,
  choosenAddressId,
  setChoosenAddressId,
  selectedAddress,
  handleEditAddress,
  setEditAddress,
  setAddNewAddress,
}) => (
  <Box className="flex flex-col gap-6">
    <RadioGroupRoot
      className="flex"
      defaultValue={selectedAddress?.id || 'default'}
      onValueChange={(e) => setChoosenAddressId(e)}
      value={choosenAddressId || selectedAddress?.id || 'default'}
    >
      <Box className="flex flex-col">
        {addresses.map((address) => (
          <Box key={address.id} className="flex items-center justify-between">
            <Box className="flex items-center gap-3 p-4">
              <RadioGroupItem id={address.id} value={address.id}>
                <RadioGroupIndicator />
              </RadioGroupItem>
              <Label htmlFor={address.id} className="cursor-pointer">
                <Text size="lg" className="text-basic-primary">
                  {address.first_name} {address.last_name}
                </Text>
                <Text className="text-secondary">
                  {address.company ? `${address.company}, ` : ''}
                  {address.address_1}, {address.postal_code}, {address.city},{' '}
                  {address.country_code?.toUpperCase()}
                  {address.province && `, ${address.province}`}
                </Text>
                <Text className="text-secondary">{address.phone}</Text>
              </Label>
            </Box>
            <AddressActions
              id={address.id}
              onEdit={() => handleEditAddress(address.id)}
              setOpen={setEditAddress}
            />
          </Box>
        ))}
      </Box>
    </RadioGroupRoot>
    <Button
      variant="tonal"
      size="sm"
      className="w-max"
      onClick={() => setAddNewAddress(true)}
    >
      <PlusIcon />
      Add new address
    </Button>
  </Box>
)

export default AddressesList
