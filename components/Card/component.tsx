import classNames from 'classnames'

import { CardProps } from './types'
import styles from './styles.module.scss'

export const Card = ({ color = 'white', className, children, ...props }: CardProps) => {
  return (
    <div
      className={classNames(styles.card, className, {
        [styles.blue]: color === 'blue'
      })}
      {...props}
    >
      {children}
    </div>
  )
}
