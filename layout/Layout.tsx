import { FunctionComponent } from 'react'

import { LayoutProps } from './Layout.props'
import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'
import { Footer } from './Footer/Footer'
import styles from './Layout.module.scss'

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
      <Footer className={styles.footer} />
    </div>
  )
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return (props: T) => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }
}
