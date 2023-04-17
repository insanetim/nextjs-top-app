import classNames from 'classnames'

import { CardProps } from './types'
import styles from './styles.module.scss'
import { ForwardedRef, forwardRef } from 'react'

export const Card = forwardRef(
  ({ color = 'white', className, children, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className={classNames(styles.card, className, {
          [styles.blue]: color === 'blue'
        })}
        {...props}
      >
        {children}
      </div>
    )
  }
)
