/**
 * @description 首页
 * @author clyan
 */

import { useQuery } from '@tanstack/react-query'

export function Home() {
  const { data } = useQuery(['1'], {})
  // eslint-disable-next-line no-console
  console.log('data', data)

  return (
    <>
      HOME2.
    </>
  )
}
