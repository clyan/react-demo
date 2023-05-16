/**
 * @description 首页
 * @author clyan
 */

import { useQuery } from '@tanstack/react-query'

export function Home() {
  const { data } = useQuery(['1'], {})

  return (
    <>
      HOME2.
    </>
  )
}
