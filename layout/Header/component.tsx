import Link from 'next/link'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import { ButtonIcon } from 'components'
import Sidebar from 'layout/Sidebar/component'
import Logo from '../logo.svg'
import { HeaderProps } from './types'
import useContainer from './hook'
import styles from './styles.module.scss'

const Header = ({ className, ...props }: HeaderProps) => {
  const { isOpened, variants, openMenuHandler, closeMenuHandler } = useContainer()

  return (
    <header
      className={classNames(styles.header, className)}
      {...props}
    >
      <Link
        href='/'
        aria-label='Go to main page'
      >
        <Logo />
      </Link>
      <ButtonIcon
        icon='menu'
        appearance='white'
        onClick={openMenuHandler}
        aria-label='Click to open menu'
      />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial='closed'
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          icon='close'
          appearance='white'
          onClick={closeMenuHandler}
          aria-label='Click to close menu'
        />
      </motion.div>
    </header>
  )
}

export default Header
