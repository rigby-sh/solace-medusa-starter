import validator from 'validator'

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
