import classNames from 'classnames'

import { DividerProps } from './types'
import styles from './styles.module.scss'

export const Divider = ({ className, ...props }: DividerProps) => {
  return (
    <hr
      className={classNames(className, styles.hr)}
      {...props}
    />
  )
}
