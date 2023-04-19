import classNames from 'classnames'

import { PtagProps } from './types'
import styles from './styles.module.scss'

export const Ptag = ({ size = 'md', className, children, ...props }: PtagProps) => {
  return (
    <p
      className={classNames(styles.p, styles[size], className)}
      {...props}
    >
      {children}
    </p>
  )
}
