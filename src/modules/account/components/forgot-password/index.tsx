'use client'

import { useActionState, useState } from 'react'

import { emailRegex } from '@lib/constants'
import { forgotPassword } from '@lib/data/customer'
import { cn } from '@lib/util/cn'
import { LOGIN_VIEW } from '@modules/account/templates/login-template'
import { SubmitButton } from '@modules/checkout/components/submit-button'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Heading } from '@modules/common/components/heading'
import { Input } from '@modules/common/components/input'
import { Text } from '@modules/common/components/text'
import { SearchResultsIcon } from '@modules/common/icons'

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const ForgotPassword = ({ setCurrentView }: Props) => {
  const [, formAction] = useActionState(forgotPassword, null)
  const [emailInputError, setEmailInputError] = useState(null)
  const [email, setEmail] = useState(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    if (!formData.get('email')) {
      setEmailInputError('Please enter')
      return
    }

    if (!emailRegex.test(formData.get('email').toString())) {
      setEmailInputError('Please enter a valid email')
      return
    }
    formAction(formData)
    setEmailInputError('')
    setEmail(formData.get('email').toString())
  }

  return (
    <Box
      className={cn('flex w-full flex-col gap-6 p-4 small:p-5', {
        'bg-primary': !email,
        'mx-auto max-w-[438px] items-center': !!email,
      })}
    >
      {email ? (
        <>
          <SearchResultsIcon />
          <Box className="text-center">
            <Heading className="mb-2 text-xl small:text-2xl">
              Check your inbox
            </Heading>
            <Text className="text-secondary" size="md">
              A password reset has been requested for {email}. If this email is
              associated with any existing account, reset instructions will be
              sent shortly. Check your inbox and spam folder. Remember, the link
              is only active for one hour.
            </Text>
          </Box>
        </>
      ) : (
        <>
          <Box className="flex flex-col gap-2">
            <Heading className="text-xl small:text-2xl">
              Forgot your password?
            </Heading>
            <Text className="text-secondary" size="md">
              Enter the email you used to sign up and we’ll send you a password
              reset email.
            </Text>
          </Box>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={emailInputError}
              data-testid="email-input"
            />
            <Box className="flex flex-col gap-4">
              <SubmitButton
                data-testid="sign-in-button"
                className="mt-6 w-full"
              >
                Reset password
              </SubmitButton>
              <Button
                variant="text"
                className="w-full"
                onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              >
                Back to log in
              </Button>
            </Box>
          </form>
        </>
      )}
    </Box>
  )
}

export default ForgotPassword
