import { ComponentType } from 'react'

import { Up } from 'components'
import AppContextProvider, { IAppContext } from 'context/app.context'
import useScrollY from 'hooks/useScrollY'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { LayoutProps } from './types'
import styles from './styles.module.scss'

const Layout = ({ children }: LayoutProps) => {
  const scrollY = useScrollY()

  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
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
