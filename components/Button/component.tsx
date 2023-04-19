import { motion } from 'framer-motion'
import classNames from 'classnames'

import { ButtonProps } from './types'
import ArrowIcon from './arrow.svg'
import styles from './styles.module.scss'

export const Button = ({ appearance, arrow = 'none', children, className, ...props }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={classNames(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost'
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && (
        <span
          className={classNames(styles.arrow, {
            [styles.down]: arrow === 'down',
            [styles.right]: arrow === 'right'
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  )
}
