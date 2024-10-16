'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { passwordRequirements } from '@lib/constants'
import { resetPassword } from '@lib/data/customer'
import { cn } from '@lib/util/cn'
import { validatePassword, ValidationError } from '@lib/util/validator'
import { SubmitButton } from '@modules/checkout/components/submit-button'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Heading } from '@modules/common/components/heading'
import { Input } from '@modules/common/components/input'
import { Label } from '@modules/common/components/label'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { Text } from '@modules/common/components/text'
import { toast } from '@modules/common/components/toast'
import { CheckCircleIcon, XCircleIcon } from '@modules/common/icons'
import { useFormState } from 'react-dom'

export function ResetPassword() {
  const searchParams = useSearchParams()
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [message, formAction] = useFormState(resetPassword, null)
  const [localMessage, setLocalMessage] = useState(null)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  )

  const token = useMemo(() => {
    return searchParams?.get('token')
  }, [searchParams])
  const email = useMemo(() => {
    return searchParams?.get('email')
  }, [searchParams])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const errors: ValidationError[] = []
    const requiredFields = ['new_password', 'confirmed_password']
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        errors.push({
          field,
          message: 'Please enter new password',
        })
      }
    }
    const newPassword = formData.get('new_password') as string
    const isPasswordValid = validatePassword(newPassword)
    const confirmedPassword = formData.get('confirmed_password') as string

    if (isPasswordValid.length > 0) {
      isPasswordValid.forEach((requirement) => {
        errors.push({
          field: 'new_password',
          message: requirement,
        })
      })
    }

    if (newPassword !== confirmedPassword) {
      errors.push({
        field: 'confirmed_password',
        message: 'Passwords don’t match. Please enter correct password.',
      })
    }

    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }
    formData.append('email', email)
    formData.append('token', token)
    formAction(formData)
    setPasswordChanged(true)
  }

  useEffect(() => {
    if (message) {
      setLocalMessage(message)
      formAction(new FormData())
    }
  }, [message, formAction])

  useEffect(() => {
    if (localMessage) {
      toast(
        'error',
        'An error occurred while resetting the password. Please try again later.'
      )
      setLocalMessage(null)
    }
  }, [localMessage])

  return (
    <Box
      className={cn('flex w-full flex-col gap-6', {
        'max-w-[438px]': passwordChanged,
        'bg-primary p-5 small:p-4': !passwordChanged,
      })}
    >
      {passwordChanged && !message ? (
        <>
          <CheckCircleIcon className="mx-auto h-14 w-14" />
          <Box className="text-center">
            <Heading className="mb-2 text-xl small:text-2xl">
              Password changed
            </Heading>
            <Text className="text-secondary" size="md">
              Your are ready to log in with your new password
            </Text>
          </Box>
          <Button size="sm" asChild>
            <LocalizedClientLink href="/account?mode=sign-in">
              Log in
            </LocalizedClientLink>
          </Button>
        </>
      ) : (
        <>
          <Box>
            <Heading className="mb-2 text-xl small:text-2xl">
              Set new password
            </Heading>
            <Text className="text-secondary" size="md">
              Almost done. Enter your new password, and you&apos;re good to go.
            </Text>
          </Box>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              label="New Password"
              name="new_password"
              required
              type="password"
              autoComplete="new-password"
              error={
                validationErrors.find((error) => error.field === 'new_password')
                  ?.message
              }
            />
            <Box className="flex flex-col gap-y-2 border border-basic-primary p-4">
              {passwordRequirements.map((item, id) => {
                const isValid = !validationErrors.some(
                  (error) => error.message === item
                )

                return (
                  <Box
                    key={id}
                    className={cn('flex items-center gap-2 text-secondary', {
                      'border-negative': !isValid,
                    })}
                  >
                    {isValid ? (
                      <CheckCircleIcon />
                    ) : (
                      <XCircleIcon className="text-negative" />
                    )}
                    <Label
                      size="sm"
                      className={cn({ 'text-negative': !isValid })}
                    >
                      {item}
                    </Label>
                  </Box>
                )
              })}
            </Box>
            <Input
              label="Confirm new password"
              name="confirmed_password"
              required
              type="password"
              autoComplete="confirmed-password"
              error={
                validationErrors.find(
                  (error) => error.field === 'confirmed_password'
                )?.message
              }
            />
            <SubmitButton className="mt-6 w-full" data-testid="register-button">
              Set new password
            </SubmitButton>
          </form>
        </>
      )}
    </Box>
  )
}
