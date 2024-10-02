import validator from 'validator'

export const validatePhoneNumber = (number) => {
  const isValidPhoneNumber = validator.isMobilePhone(number)
  return isValidPhoneNumber
}

export const validateField = (
  name: string,
  value: string,
  addressType: 'billing' | 'shipping',
  touchedFields: Record<string, boolean>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
  const addressPrefix = `${addressType}_address.`
  if (
    touchedFields[name] &&
    !value &&
    name !== `${addressPrefix}company` &&
    name !== `${addressPrefix}province`
  ) {
    setErrors((prev) => ({ ...prev, [name]: 'Please enter' }))
  } else if (name === `${addressPrefix}phone` && value) {
    if (!validatePhoneNumber(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: 'Invalid value. Please enter correct',
      }))
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  } else {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[name]
      return newErrors
    })
  }
}
