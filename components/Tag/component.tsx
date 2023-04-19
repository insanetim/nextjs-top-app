import classNames from 'classnames'

import { TagProps } from './types'
import styles from './styles.module.scss'

export const Tag = ({ size = 'sm', color = 'ghost', className, href, children, ...props }: TagProps) => {
  return (
    <div
      className={classNames(styles.tag, styles[size], styles[color], className)}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  )
}
