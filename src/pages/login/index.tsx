/**
 * @description 登录页
 * @author clyan
 */

import { useLocation, useNavigate } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../auth/hooks/auth-provider'

interface Props {
  key?: string | number
  enable?: boolean
  zData?: string
  onChange?: VoidFunction
}
function Hello(props: Props) {
  return <div key={props.key} onClick={props.onChange} />
}

const hello = (
  <div>
    <p>Hello</p>
  </div>
)

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || '/'

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string

    auth.signIn(username, () => {
      navigate(from, { replace: true })
    })
  }

  // eslint-disable-next-line no-console
  console.log('123')

  const onChange = () => {
    console.log('onChange')
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
        <button type="submit">
          Login
        </button>
        <Hello enable zData="1" onChange={onChange} />
        {!!from && (
          <span>
            {
              [{ id: 1 }].map((thing, index) => (
                <Hello key={index} />
              ))
            }
          </span>
        )}
      </form>
    </div>
  )
}
