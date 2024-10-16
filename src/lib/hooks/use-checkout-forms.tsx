import { useCallback, useState } from 'react'

import { checkoutFormValidationSchema } from '@lib/util/validator'
import { useFormik } from 'formik'

export type FormikErrorsType = {
  shipping_address: {
    first_name?: string
    last_name?: string
    address_1?: string
    company?: string
    city?: string
    country_code?: string
    postal_code?: string
    phone?: string
  }
  billing_address: {
    first_name?: string
    last_name?: string
    address_1?: string
    city?: string
    country_code?: string
    postal_code?: string
    phone?: string
  }
  email?: string
  same_as_shipping?: boolean
}

export const useCheckoutForms = (initialValues?: any) => {
  const [formSubmitCount, setFormSubmitCount] = useState(0)

  const defaultInitialValues = {
    shipping_address: {
      first_name: '',
      last_name: '',
      address_1: '',
      city: '',
      country_code: '',
      province: '',
      company: '',
      postal_code: '',
      phone: '',
    },
    billing_address: {
      first_name: '',
      last_name: '',
      address_1: '',
      city: '',
      country_code: '',
      province: '',
      postal_code: '',
      phone: '',
    },
    email: '',
    same_as_shipping: true,
  }

  const formik = useFormik({
    initialValues: initialValues ?? defaultInitialValues,
    validationSchema: checkoutFormValidationSchema,
    onSubmit: async (values) => {
      validateForm()

      if (formik.isValid) {
        const finalValues = { ...values }

        if (finalValues.same_as_shipping) {
          finalValues.billing_address = { ...finalValues.shipping_address }
        }
      }
    },
    validateOnBlur: !!formSubmitCount,
    validateOnChange: !!formSubmitCount,
  })

  const validateForm = useCallback(() => {
    setFormSubmitCount((prev) => prev + 1)
    formik.validateForm()
  }, [formik])

  return {
    ...formik,
    formSubmitCount,
    validateForm,
  }
}
