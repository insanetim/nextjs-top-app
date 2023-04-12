import classNames from 'classnames'

import { SidebarProps } from './types'
import Menu from 'layout/Menu'
import Logo from '../logo.svg'
import styles from './Sidebar.module.scss'

const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div
      className={classNames(className, styles.sidebar)}
      {...props}
    >
      <Logo className={styles.logo} />
      <div>search</div>
      <Menu />
    </div>
  )
}

export default Sidebar
