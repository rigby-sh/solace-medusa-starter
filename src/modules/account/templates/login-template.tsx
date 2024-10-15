'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import ForgotPassword from '@modules/account/components/forgot-password'
import Login from '@modules/account/components/login'
import Register from '@modules/account/components/register'
import { Box } from '@modules/common/components/box'

export enum LOGIN_VIEW {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forgot-password',
}

const LoginTemplate = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const mode = searchParams.get('mode')

  const [currentView, setCurrentView] = useState('sign-in')

  useEffect(() => {
    if (mode) {
      const newUrl = `/account`
      setCurrentView(mode)
      router.replace(newUrl)
    }
  }, [mode, router])

  let Component = Login
  switch (currentView) {
    case 'sign-in':
      Component = Login
      break
    case 'register':
      Component = Register
      break
    case 'forgot-password':
      Component = ForgotPassword
      break
    default:
      break
  }

  return (
    <Box className="flex w-full">
      <Component setCurrentView={setCurrentView} />
    </Box>
  )
}

export default LoginTemplate
