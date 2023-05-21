/**
 * @description 登录页
 * @author clyan
 */

import { useLocation, useNavigate } from 'react-router-dom'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@pages/auth/hooks/auth-provider'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || '/'

  const { mutateAsync, isLoading } = useMutation(['login'], () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 2000)
    })
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const data = await mutateAsync()

    // eslint-disable-next-line no-console
    console.log('data', data)

    auth.signIn(username, () => {
      navigate(from, { replace: true })
    })
  }

  return (
    <div>
      <p>
        You must log in to view the page at
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input name="username" type="text" />
        </label>
        <button className="text-amber" type="submit">
          { !!isLoading && <span className="i-mdi:refresh animate-spin" /> }
          Login
        </button>
      </form>
    </div>
  )
}
