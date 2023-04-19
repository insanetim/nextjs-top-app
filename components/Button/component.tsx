import { motion } from 'framer-motion'
import classNames from 'classnames'

import { ButtonProps } from './types'
import ArrowIcon from './arrow.svg'
import styles from './styles.module.scss'

export const Button = ({ appearance, arrow = 'none', children, className, ...props }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={classNames(styles.button, styles[appearance], className)}
      {...props}
    >
      {children}
      {arrow !== 'none' && (
        <span className={classNames(styles.arrow, styles[arrow])}>
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  )
}
