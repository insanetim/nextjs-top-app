import classNames from 'classnames'

import { PtagProps } from './types'
import styles from './styles.module.scss'

export const Ptag = ({ size = 'md', className, children, ...props }: PtagProps) => {
  return (
    <p
      className={classNames(styles.p, className, {
        [styles.sm]: size === 'sm',
        [styles.md]: size === 'md',
        [styles.lg]: size === 'lg'
      })}
      {...props}
    >
      {children}
    </p>
  )
}
