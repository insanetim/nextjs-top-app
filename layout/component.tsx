import { ComponentType } from 'react'

import { LayoutProps } from './types'
import AppContextProvider, { IAppContext } from 'context/app.context'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import styles from './styles.module.scss'

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
