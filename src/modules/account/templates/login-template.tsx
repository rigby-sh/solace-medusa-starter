'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import Login from '@modules/account/components/login'
import Register from '@modules/account/components/register'

export enum LOGIN_VIEW {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
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

  return (
    <div className="flex w-full justify-start px-8 py-8">
      {currentView === 'sign-in' ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <Register setCurrentView={setCurrentView} />
      )}
    </div>
  )
}

export default LoginTemplate
