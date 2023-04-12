import classNames from 'classnames'

import { TagProps } from './types'
import styles from './styles.module.scss'

export const Tag = ({ size = 'sm', color = 'ghost', className, href, children, ...props }: TagProps) => {
  return (
    <div
      className={classNames(styles.tag, className, {
        [styles.sm]: size === 'sm',
        [styles.md]: size === 'md',
        [styles.ghost]: color === 'ghost',
        [styles.red]: color === 'red',
        [styles.gray]: color === 'gray',
        [styles.green]: color === 'green',
        [styles.primary]: color === 'primary'
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  )
}
