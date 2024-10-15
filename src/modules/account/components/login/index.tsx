import { useEffect, useState } from 'react'

import { login } from '@lib/data/customer'
import { ValidationError } from '@lib/util/validator'
import { LOGIN_VIEW } from '@modules/account/templates/login-template'
import { SubmitButton } from '@modules/checkout/components/submit-button'
import { Box } from '@modules/common/components/box'
import { Button } from '@modules/common/components/button'
import { Heading } from '@modules/common/components/heading'
import { Input } from '@modules/common/components/input'
import { toast } from '@modules/common/components/toast'
import { useFormState } from 'react-dom'

import RegisterPrompt from './register-prompt'

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(login, null)
  const [localMessage, setLocalMessage] = useState(null)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const errors: ValidationError[] = []

    // Check if all required fields are filled
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        errors.push({
          field,
          message: 'Please enter',
        })
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }

    setValidationErrors([])
    formAction(formData)
  }

  // Clear message
  useEffect(() => {
    if (message) {
      setLocalMessage(message)
      formAction(new FormData())
    }
  }, [message, formAction])

  // Display error toast
  useEffect(() => {
    if (localMessage) {
      if (localMessage.includes('Invalid email or password')) {
        toast('error', 'Incorrect email or password.')
      } else if (localMessage.includes('Password should be a string')) {
        return
      } else {
        toast('error', localMessage)
      }
      setLocalMessage(null)
    }
  }, [localMessage])

  return (
    <Box
      className="flex w-full flex-col items-center gap-6"
      data-testid="login-page"
    >
      <Box className="flex w-full flex-col gap-6 bg-primary p-4 small:p-5">
        <Heading as="h2" className="text-xl small:text-2xl">
          Log in
        </Heading>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={
                validationErrors.find((error) => error.field === 'email')
                  ?.message
              }
              data-testid="email-input"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              error={
                validationErrors.find((error) => error.field === 'password')
                  ?.message
              }
              data-testid="password-input"
            />
          </div>
          <Box className="flex flex-col gap-4">
            <SubmitButton data-testid="sign-in-button" className="mt-6 w-full">
              Continue with email
            </SubmitButton>
            <Button
              variant="text"
              className="w-full"
              onClick={() => setCurrentView(LOGIN_VIEW.FORGOT_PASSWORD)}
            >
              Forgot password
            </Button>
          </Box>
        </form>
      </Box>
      <RegisterPrompt setCurrentView={setCurrentView} />
    </Box>
  )
}

export default Login
