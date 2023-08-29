import type { PropsWithChildren } from 'react'
import Logo from 'react-styleguidist/lib/client/rsg-components/Logo'
import Markdown from 'react-styleguidist/lib/client/rsg-components/Markdown'
import classNames from 'classnames'

import styles from './index.scss'

interface StyleGuideRendererProps {
  title: string
  version?: string
  homepageUrl: string
  children: React.ReactNode
  toc?: React.ReactNode
  hasSidebar?: boolean
}

export default function StyleGuideRendererInner({ title, homepageUrl, children, hasSidebar, toc }: PropsWithChildren<StyleGuideRendererProps>) {
  return (
    <div className={classNames(styles.styleGuide)}>
      {!!hasSidebar && (
      <div data-testid="sidebar">
        <header>
          <Logo>
            {title}
          </Logo>
        </header>
        {toc}
      </div>
      )}
      <main>
        {children}
        <footer>
          <Markdown text={`Created with [React Styleguidist](${homepageUrl}) ❤️`} />
        </footer>
      </main>
    </div>
  )
}
