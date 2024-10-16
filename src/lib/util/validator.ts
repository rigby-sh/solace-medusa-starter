import validator from 'validator'
import * as Yup from 'yup'

export type ValidationError = {
  field: string
  message: string
}

export const validatePhoneNumber = (number) => {
  const isValidPhoneNumber = validator.isMobilePhone(number)
  return isValidPhoneNumber
}

export const validatePassword = (password: string): string[] => {
  const unmetRequirements: string[] = []

  if (password.length < 8) {
    unmetRequirements.push('At least 8 characters')
  }
  if (!/[a-z]/.test(password)) {
    unmetRequirements.push('One lowercase letter')
  }
  if (!/[A-Z]/.test(password)) {
    unmetRequirements.push('One uppercase letter')
  }
  if (
    !/[0-9]/.test(password) &&
    !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  ) {
    unmetRequirements.push('One number or symbol')
  }

  return unmetRequirements
}

const billingFormValidationSchema = Yup.object({
  first_name: Yup.string().required('Please enter first name'),
  last_name: Yup.string().required('Please enter last name'),
  address_1: Yup.string().required('Please enter address'),
  city: Yup.string().required('Please enter city'),
  country_code: Yup.string().required('Please select country'),
  postal_code: Yup.string().required('Please enter postal code'),
  phone: Yup.number().required('Please enter phone number'),
})

export const checkoutFormValidationSchema = Yup.object({
  shipping_address: Yup.object({
    first_name: Yup.string().required('Please enter first name'),
    last_name: Yup.string().required('Please enter last name'),
    address_1: Yup.string().required('Please enter address'),
    city: Yup.string().required('Please enter city'),
    country_code: Yup.string().required('Please select country'),
    postal_code: Yup.string().required('Please enter postal code'),
    phone: Yup.number().required('Please enter phone number'),
  }),
  billing_address: Yup.object().when('same_as_shipping', {
    is: false,
    then: () => billingFormValidationSchema,
    otherwise: () => Yup.object().notRequired(),
  }),
  email: Yup.string()
    .email('Invalid email address')
    .required('Please enter email'),
  same_as_shipping: Yup.boolean(),
})
