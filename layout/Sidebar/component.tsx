import classNames from 'classnames'

import { SidebarProps } from './types'
import Menu from 'layout/Menu'
import Logo from '../logo.svg'
import styles from './styles.module.scss'
import { Search } from 'components'
import Link from 'next/link'

const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div
      className={classNames(className, styles.sidebar)}
      {...props}
    >
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <Search />
      <Menu />
    </div>
  )
}

export default Sidebar
