import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { addCustomerAddress, updateCustomerAddress } from '@lib/data/customer'
import compareAddresses from '@lib/util/addresses'
import { HttpTypes } from '@medusajs/types'

export const useAddressSelect = (
  addresses: HttpTypes.StoreCustomerAddress[],
  addressInput: HttpTypes.StoreCartAddress | null,
  cart: HttpTypes.StoreCart | null,
  onSelect: (
    address: HttpTypes.StoreCartAddress | undefined,
    email?: string
  ) => void
) => {
  const formRef = useRef<HTMLFormElement>(null)
  const editFormRef = useRef<HTMLFormElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [choosenAddressId, setChoosenAddressId] = useState<string | null>(null)

  const [editAddress, setEditAddress] = useState(false)
  const [editingSuccessState, setEditingSuccessState] = useState(false)
  const [editingAddress, setEditingAddress] =
    useState<HttpTypes.StoreCustomerAddress | null>(null)

  const [addNewAddress, setAddNewAddress] = useState(false)
  const [addingSuccessState, setAddingSuccessState] = useState(false)

  const [addFormState, addFormAction] = useActionState(addCustomerAddress, {
    success: false,
    error: null,
  })

  const [updateFormState, updateFormAction] = useActionState(
    updateCustomerAddress,
    {
      success: false,
      error: null,
    }
  )

  const close = () => {
    setAddingSuccessState(false)
    setAddNewAddress(false)
    setEditingSuccessState(false)
    setEditAddress(false)
    setEditingAddress(null)
  }

  const handleOpenDialogChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setAddNewAddress(false)
      setEditAddress(false)
      setEditingAddress(null)
    }
  }

  const handleSaveAddress = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id)
    if (savedAddress) {
      onSelect(savedAddress as HttpTypes.StoreCartAddress)
    }
    setIsOpen(false)
  }

  const handleSaveNewAddress = () => {
    setAddingSuccessState(true)
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      formData.append('address_name', 'shipping_address')
      startTransition(() => {
        addFormAction(formData)
      })
    }
  }

  const handleEditAddress = (addressId: string) => {
    const addressToEdit = addresses.find((a) => a.id === addressId)
    if (addressToEdit) {
      setEditingAddress(addressToEdit)
      setEditAddress(true)
    }
  }

  const handleSaveEditedAddress = () => {
    setEditingSuccessState(true)

    if (editFormRef.current) {
      const formData = new FormData(editFormRef.current)
      updateFormAction(formData)
    }
  }

  const handleSaveClick = () => {
    if (addNewAddress) {
      handleSaveNewAddress()
    } else if (editAddress) {
      handleSaveEditedAddress()
    } else {
      handleSaveAddress(choosenAddressId)
    }
  }

  // Curently selected address
  const selectedAddress = useMemo(() => {
    return addresses.find((a) =>
      compareAddresses(
        { ...a, company: a.company || '' },
        addressInput
          ? { ...addressInput, company: addressInput.company || '' }
          : null
      )
    )
  }, [addresses, addressInput])

  useEffect(() => {
    const defaultShippingAddress = addresses.find(
      (a) => a.is_default_shipping === true
    )

    if (
      defaultShippingAddress &&
      !choosenAddressId &&
      !cart?.shipping_address?.id
    ) {
      setChoosenAddressId(defaultShippingAddress.id)
    }
  }, [addresses, cart?.shipping_address?.id, choosenAddressId])

  // Close dialog after new address adding / editing success
  useEffect(() => {
    if (addingSuccessState || editingSuccessState) {
      const timer = setTimeout(() => {
        close()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [addingSuccessState, editingSuccessState])

  return {
    formRef,
    editFormRef,
    isOpen,
    setIsOpen,
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
    addFormAction,
    updateFormState,
    updateFormAction,
    handleOpenDialogChange,
    handleSaveClick,
    handleEditAddress,
    selectedAddress,
  }
}
