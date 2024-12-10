import { useAddressSelect } from '@lib/hooks/use-address-select'
import { userShippingAddressFormValidationSchema } from '@lib/util/validator'
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
import { FormikProvider, useFormik } from 'formik'

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

  const defaultInitialValues = {
    first_name: '',
    last_name: '',
    address_1: '',
    city: '',
    country_code: '',
    postal_code: '',
    phone: '',
    company: '',
    is_default_shipping: false,
    province: '',
  }

  const formik = useFormik({
    initialValues: editingAddress ?? defaultInitialValues,
    validationSchema: userShippingAddressFormValidationSchema,
    enableReinitialize: true,
    onSubmit: async () => {
      await formik.validateForm()

      if (formik.isValid) {
        handleSaveClick()
      }
    },
    validateOnChange: false,
  })

  const handleSubmit = async () => await formik.handleSubmit()

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenDialogChange}>
      <DialogTrigger asChild>
        <Button variant="tonal" size="sm" data-testid="change-address-button">
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
            <FormikProvider value={formik}>
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
                  resetForm={formik.resetForm}
                />
              )}
            </FormikProvider>
          </DialogBody>
          <DialogFooter>
            <Button
              className="w-full"
              isLoading={addingSuccessState || editingSuccessState}
              onClick={handleSubmit}
              type="button"
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
