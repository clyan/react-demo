import type { PropsWithChildren } from 'react'
import { Children } from 'react'
import Heading from 'react-styleguidist/lib/client/rsg-components/Heading'
// Import default implementation from react-styleguidist using the full path
import DefaultSectionsRenderer from 'react-styleguidist/lib/client/rsg-components/Sections/SectionsRenderer'

export default function SectionsRenderer({ children }: PropsWithChildren<{}>) {
  return (
    <div>
      {Children.count(children) > 0 && (
      <div>
        <Heading level={1}>通用文档</Heading>
        <p>通用文档描述</p>
      </div>
      )}
      <DefaultSectionsRenderer>
        {children}
      </DefaultSectionsRenderer>
    </div>
  )
}
