import classNames from 'classnames'

import { PtagProps } from './Ptag.props'
import styles from './Ptag.module.scss'

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
