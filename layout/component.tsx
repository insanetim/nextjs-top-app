import { ComponentType, KeyboardEvent, useRef, useState } from 'react'
import classNames from 'classnames'

import AppContextProvider, { IAppContext } from 'context/app.context'
import useScrollY from 'hooks/useScrollY'
import { Up } from 'components'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { LayoutProps } from './types'
import styles from './styles.module.scss'

const Layout = ({ children }: LayoutProps) => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const scrollY = useScrollY()

  const skipContentAction = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault()
      bodyRef.current?.focus()
    }
    setIsSkipLinkDisplayed(false)
  }

  return (
    <div className={styles.wrapper}>
      <a
        className={classNames(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed
        })}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onBlur={() => setIsSkipLinkDisplayed(false)}
        onKeyDown={skipContentAction}
        tabIndex={1}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div
        ref={bodyRef}
        className={styles.body}
        tabIndex={0}
      >
        {children}
      </div>
      <Footer className={styles.footer} />
      {scrollY > 200 && <Up />}
    </div>
  )
}

const withLayout = <P extends object>(Component: ComponentType<P>) => {
  return (props: P & IAppContext) => {
    return (
      <AppContextProvider
        menu={props.menu}
        firstCategory={props.firstCategory}
      >
        <Layout>
          <Component {...(props as P)} />
        </Layout>
      </AppContextProvider>
    )
  }
}

export default withLayout
