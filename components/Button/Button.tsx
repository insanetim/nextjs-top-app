import classNames from 'classnames'

import { ButtonProps } from './Button.props'
import ArrowIcon from './arrow.svg'
import styles from './Button.module.scss'

export const Button = ({ appearance, arrow = 'none', children, className, ...props }: ButtonProps) => {
  return (
    <button
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
    </button>
  )
}
